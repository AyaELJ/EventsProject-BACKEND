import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Event } from './event.interface';


export class EventDto {
  @IsString()
  @IsNotEmpty()
  id: string = '22834925';

  @IsString()
  @IsNotEmpty()
  title: string = 'Soirée Guinguette';

  @IsString()
  @IsNotEmpty()
  description: string = "Le Tout P'tit Bal : 18h-23h / Place Edouard Moreau Cie Fais pas çi Fais pas ça. Venez guincher avec nos trois compères Lola la Rousse, Arthur Larigot et Ornicar ! Ils viendront même avec u...";

  @IsString()
  @IsNotEmpty()
  longdescription: string = "<ul>\n<li><em><strong>Le Tout P'tit Bal</strong></em> : 18h-23h / Place Edouard Moreau </li>\n</ul>\n<p></p>\n<p>Cie Fais pas çi Fais pas ça.<br />Venez guincher avec nos trois compères Lola la Rousse, Arthur Larigot et Ornicar ! Ils viendront même avec une valise, avec dedans, de quoi prendre un air d'antan. Un spectacle interactif, avec une pincée d'humour, un peu de poésie et quelques trous de mémoire !! <br />A partir de 3 ans.</p>\n<p></p>\n<ul>\n<li><em><strong>Jeux en bois</strong></em> : 18h-21h / Quai Saint-Pierre </li>\n</ul>\n<p></p>\n<p>Retrouvez vous en famille autour de jeux en bois pour des parties endiablées !</p>\n<p></p>\n<ul>\n<li><em><strong>Bal Swing It Mummy</strong></em> : 20h / Place Edouard Moreau </li>\n</ul>\n<p></p>\n<p>Cie du Gramophone.</p>\n<p></p>\n<ul>\n<li>Initiation danse Jazz Roots à 20h</li>\n<li>Concert Yellow Bounce à 21h</li>\n</ul>\n<p></p>\n<p>Une ambiance rétro festive et bon enfant, légère et sautillante. Sortez vos plus beaux soulier et robes à pois, ça va claquer de la bretelle !</p>";

  @IsString()
  @IsNotEmpty()
  eventurl: string = "https://openagenda.com/ingenie/events/soiree-guinguette-le-tout-ptit-bal";

  @IsString()
  @IsNotEmpty()
  imageurl: string = "https://cibul.s3.amazonaws.com/e86f1c79893e48cea39d1b3c8ddf986d.base.image.jpg";

  @IsString()
  @IsOptional()
  keywords: string[] | null = [
    "SPECTACLESTEMPSFORTS",
    "Y|MAIRIELATURBALLE|SOIREEGUINGUETTE"
];

  @IsString()
  @IsNotEmpty()
  timings: string = "[{\"begin\": \"2023-08-09T18:30:00+02:00\", \"end\": \"2023-08-09T23:00:00+02:00\"}]";

  @IsNumber()
  @IsNotEmpty()
  latitude: number = -2.5105;

  @IsNumber()
  @IsNotEmpty()
  longitude: number = 47.34704;

  @IsString()
  @IsNotEmpty()
  address: string =  "Place Edouard Moreau 44420 La turballe";

  @IsString()
  @IsNotEmpty()
  city: string = "La turballe";

  @IsString()
  @IsNotEmpty()
  department: string = "Loire-Atlantique";

  @IsString()
  @IsNotEmpty()
  region: string = "Pays de la Loire";

  @IsString()
  @IsNotEmpty()
  country: string | null | undefined= null;

  @IsString()
  @IsNotEmpty()
  attendancemode: string = "{\"id\": 1, \"label\": {\"fr\": \"Sur place\", \"en\": \"In situ\", \"it\": \"In situ\", \"es\": \"Desconnectad\", \"de\": \"Offline\", \"br\": \"War al lec\\u2019h\", \"io\": \"crwdns14266:0crwdne14266:0\"}}";

  @IsString()
  @IsOptional()
  phoneNumber?: string | null = null;

  @IsString()
  @IsOptional()
  email?: string | null = null;

  @IsString()
  @IsOptional()
  website?: string | null = null;

  @IsBoolean()
  @IsNotEmpty()
  favorite: boolean = false;

  constructor(event?: Event) {
    this.id = event?.id ?? this.id;
    this.title = event?.title ?? this.title;
    this.description = event?.description ?? this.description;
    this.longdescription = event?.longdescription ?? this.longdescription;
    this.eventurl = event?.eventurl ?? this.eventurl;
    this.imageurl = event?.imageurl ?? this.imageurl;
    this.keywords = event?.keywords ?? this.keywords;
    this.timings = event?.timings ?? this.timings;
    this.latitude = event?.latitude ?? this.latitude;
    this.longitude = event?.longitude ?? this.longitude;
    this.address = event?.address ?? this.address;
    this.city = event?.city ?? this.city;
    this.department = event?.department ?? this.department;
    this.region = event?.region ?? this.region;
    this.country = event?.country ?? this.country;
    this.attendancemode = event?.attendancemode ?? this.attendancemode;
    this.phoneNumber = event?.phoneNumber;
    this.email = event?.email;
    this.website = event?.website;
    this.favorite = event?.favorite ?? false;
  }
}
