import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { map, tap, lastValueFrom} from 'rxjs';
import { Event, EventAPI, EventDto, ListOfEvents} from './dto'; // Import the Event class


@Injectable()
export class EventService {
  private listEvent: ListOfEvents = new ListOfEvents();;
  private favEvent: string[] = [];

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    await this.getEventData();
  }

  //Create Event
  createEvent(event: Event): EventDto | BadRequestException {
    if (
      !this.listEvent.experience.find((element) => element.id === event.id) &&
      !this.listEvent.experience.find((element) => element === event)
    ) {
      this.listEvent.experience.push(event);
    } else {
      throw new BadRequestException(
        'Error: This Event already exists!',
      );
    }
    return this.findOneById(event.id);
  }

  //Get Event Data
  async getEventData(): Promise<ListOfEvents> {
    let dataAPI = new ListOfEvents();
    this.listEvent = new ListOfEvents();

    try {
      await lastValueFrom(
        this.httpService
          .get<EventAPI>(
            'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?limit=100',
         )
         .pipe(
            map((response) => response.data.results),
            tap((element) => {
              element.forEach((element) => {
                const address = element.location_address;
                const phoneNumber = element.location_phone || '';
                const email = element.contributor_email || '';

                dataAPI.experience.push({
                  id: element.uid,
                  title: element.title_fr,
                  description: element.description_fr,
                  longdescription: element.longdescription_fr,
                  eventurl: element.canonicalurl,
                  imageurl: element.image,
                  keywords: element.keywords_fr,
                  timings: element.timings,
                  latitude: element.location_coordinates.lat,
                  longitude: element.location_coordinates.lon,
                  address: address,
                  city: element.location_city,
                  department: element.location_department,
                  region: element.location_region,
                  country: element.country_fr,
                  attendancemode: element.attendanceMode || '',
                  phoneNumber: phoneNumber,
                  email: email,
                  website: element.location_website || '',
                  favorite: false,
                });
              });
            }),
          ),
     );

      this.listEvent.experience = this.sortEventsByTitle(dataAPI.experience);

      this.favEvent.forEach((element) => {
        const index = this.getIndexOf(element);
      if (index !== -1) {
        this.listEvent.experience[index].favorite = true;
      }
     });
     return this.listEvent;
    } catch (error) {
      throw new BadRequestException('Failed to fetch event data');
    }
  }


  //FindOneById
  findOneById(id: string): EventDto | NotFoundException {
    const event = this.listEvent.experience.find(
      (element) => element.id === id,
    );

    if (!event) {
      throw new NotFoundException('Event Not Found!');
    }
    return event;
  }


  //Search by Title
  searchByTitle(title: string): EventDto[] | NotFoundException {
    const events = this.listEvent.experience.filter((element) =>
      element.title.toLowerCase().includes(title.toLowerCase()),
    );
    if (events.length === 0) {
      throw new NotFoundException('EVENT NOT FOUND!');
    }
    return events;
  }

  //findAll
  async findAll( page: number, rows: number, offset: number, sortBy: string, favorites: number, geoloc: number, refresh: number) {
    let start: number, end: number, current: number, next: number, last: number, first: number;
    let list: ListOfEvents = new ListOfEvents();

    if (refresh === 1) { await this.getEventData();}
    if (favorites === 1) {
      list.experience = this.listEvent.experience.filter((element) =>
        this.favEvent.includes(element.id),
      );
      if (list.experience.length == 0)
        return {current: 0, next: 0, last: 0, first: 0, rows: 0, returnData: []};
    } else list.experience = this.listEvent.experience.slice();

    if (sortBy === 'title')
      list.experience = this.sortEventsByTitle(list.experience).slice();
    else if (sortBy === 'address')
      list.experience = this.sortEventsByAddress(list.experience).slice();

    [start, end, current, next, last, first, rows] =
      this.getPaginationArgs(page, rows, offset, list.experience.length);

    let requestedData: EventDto[] = list.experience.slice(start, end);

    if (geoloc === 1) {
      let geoloc: { latitude: number; longitude: number; title: string }[] = [];
      requestedData.slice().forEach((element) => {
        let { latitude, longitude, title } = element;
        geoloc.push({ latitude, longitude, title });
      });
      return geoloc;
    }

    let returnData: EventDto[] = requestedData;

    return { current, next, last, first, rows, returnData };
  }

  // get Pagination Arguments
  private getPaginationArgs( page: number, rows: number, offset: number, length: number): 
  [number, number, number, number, number, number, number] {
    page = page < 0 ? 0 : page;
    rows = rows <= 0 ? 10 : rows > length ? length : rows;
    offset = offset < 0 ? 0 : offset;

    let totalNbPages = rows == 0 ? 0 : Math.ceil(length / rows);
    let start = page * rows + offset > length ? 0 : page * rows + offset;
    let end = page * rows + offset + rows;
    let current = page;
    let next = page++ >= totalNbPages - 1 ? 0 : page++;
    let last = totalNbPages - 1 < 0 ? 0 : totalNbPages - 1;
    let first = 0;

    return [start, end, current, next, last, first, rows];
  }


  // Toggle Favorite // PUT /events/:eventId/favorite
  toggleFavorite(id: string): { id: string } {
    let index: number = this.favEvent.indexOf(id, 0);
    if (index === -1) {
      index = this.getIndexOf(id);
      this.favEvent.push(id);
      this.listEvent.experience[index].favorite = true;
    } else {
      this.favEvent.splice(index, 1);
      index = this.getIndexOf(id);
      this.listEvent.experience[index].favorite = false;
    }

    return { id: id };
  }

  //Get index of
  private getIndexOf(id: string): number {
    let i: number = -1;
    this.listEvent.experience.forEach((element, index) => {
      if (element.id === id) i = index;});
    return i;
  }


  // remove Event
  removeEvent(id: string): string {
    let index: number = this.getIndexOf(id);
    if (index !== -1) this.listEvent.experience.splice(index, 1);
    else throw new NotFoundException('Event Not Found!!');
    return id;
  }


  // update Event
  updateEvent(id: string, updatedEvent: Event): EventDto | BadRequestException {
    let index: number = this.getIndexOf(id);
    let newIdCheck: number = this.getIndexOf(updatedEvent.id);

    if (index !== -1 && newIdCheck === -1) {
      this.listEvent.experience[index].id =
        updatedEvent?.id ?? this.listEvent.experience[index].id;

      this.listEvent.experience[index].title =
        updatedEvent?.title ?? this.listEvent.experience[index].title;

      this.listEvent.experience[index].description =
        updatedEvent?.description ?? this.listEvent.experience[index].description;

      this.listEvent.experience[index].longdescription =
        updatedEvent?.longdescription ?? this.listEvent.experience[index].longdescription;

      this.listEvent.experience[index].eventurl =
        updatedEvent?.eventurl ?? this.listEvent.experience[index].eventurl;

      this.listEvent.experience[index].imageurl =
        updatedEvent?.imageurl ?? this.listEvent.experience[index].imageurl;

      this.listEvent.experience[index].keywords =
        updatedEvent?.keywords ?? this.listEvent.experience[index].keywords;

      this.listEvent.experience[index].timings =
        updatedEvent?.timings ?? this.listEvent.experience[index].timings;

      this.listEvent.experience[index].latitude =
        updatedEvent?.latitude ?? this.listEvent.experience[index].latitude;

      this.listEvent.experience[index].longitude =
        updatedEvent?.longitude ?? this.listEvent.experience[index].longitude;

      this.listEvent.experience[index].address =
        updatedEvent?.address ?? this.listEvent.experience[index].address;

      this.listEvent.experience[index].city =
        updatedEvent?.city ?? this.listEvent.experience[index].city;

      this.listEvent.experience[index].department =
        updatedEvent?.department ?? this.listEvent.experience[index].department;

      this.listEvent.experience[index].region =
        updatedEvent?.region ?? this.listEvent.experience[index].region;

      this.listEvent.experience[index].country =
        updatedEvent?.country ?? this.listEvent.experience[index].country;

      this.listEvent.experience[index].attendancemode =
        updatedEvent?.attendancemode ?? this.listEvent.experience[index].attendancemode;

      this.listEvent.experience[index].phoneNumber =
        updatedEvent?.phoneNumber ?? this.listEvent.experience[index].phoneNumber;
        
      this.listEvent.experience[index].email =
        updatedEvent?.email ?? this.listEvent.experience[index].email;

      this.listEvent.experience[index].website =
        updatedEvent?.website ?? this.listEvent.experience[index].website;

    } else throw new BadRequestException('ID ALREADY USED');
    
    return this.listEvent.experience[index]; 
  }

  private sortEventsByTitle(eventList: EventDto[]): EventDto[] {
    return eventList.sort((firstEvent: EventDto, secondEvent: EventDto) =>
      firstEvent.title.localeCompare(secondEvent.title),
    );
  }

  private sortEventsByAddress(eventList: EventDto[]): EventDto[] {
    return eventList.sort((firstEvent: EventDto, secondEvent: EventDto) =>
      firstEvent.address.localeCompare(secondEvent.address),
    );
  }

  private sortEventsByCity(eventList: EventDto[]): EventDto[] {
    return eventList.sort((firstEvent: EventDto, secondEvent: EventDto) =>
      firstEvent.city.localeCompare(secondEvent.city),
    );
  }

  private sortEventsByDepartment(eventList: EventDto[]): EventDto[] {
    return eventList.sort((firstEvent: EventDto, secondEvent: EventDto) =>
      firstEvent.department.localeCompare(secondEvent.department),
    );
  }

  private sortEventsByRegion(eventList: EventDto[]): EventDto[] {
    return eventList.sort((firstEvent: EventDto, secondEvent: EventDto) =>
      firstEvent.region.localeCompare(secondEvent.region),
    );
  }

  private sortEventsByCountry(eventList: EventDto[]): EventDto[] {
    return eventList.sort((firstEvent: EventDto, secondEvent: EventDto) => {
      const countryA = firstEvent.country || ''; 
      const countryB = secondEvent.country || ''; 
  
      return countryA.localeCompare(countryB);
    });
  }

}
