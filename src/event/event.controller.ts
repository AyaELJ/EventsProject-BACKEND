import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { Event, EventDto } from './dto';

@Controller('events') 
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() createEventDto: EventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('rows', ParseIntPipe) rows: number,
    @Query('offset', ParseIntPipe) offset: number,
    @Query('sortBy') sortBy: string,
    @Query('fav') favorites: number,
    @Query('geoloc') geoloc: number,
    @Query('refresh') refresh: number,
  ) {
    return this.eventService.findAll(page, rows, offset, sortBy, +favorites, +geoloc, +refresh);
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.eventService.findOneById(id);
  }

  @Post('/search/title')
  searchByTitle(@Body('title') title: string) {
    return this.eventService.searchByTitle(title);
  }

  @Put('/:id')
  toggleFavorite(@Param('id') id: string) {
    return this.eventService.toggleFavorite(id);
  }

  @Patch('/:id')
  updateEvent(@Param('id') id: string, @Body() updateEventDto: Event) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete('/:id')
  removeEvent(@Param('id') id: string) {
    return this.eventService.removeEvent(id);
  }
}
