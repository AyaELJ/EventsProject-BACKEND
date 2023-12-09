import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest, * as request from 'supertest';
import { EventModule } from './event.module';

describe('Event Controller', () => {
  let app: INestApplication;
  let httpRequester: supertest.SuperTest<supertest.Test>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EventModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpRequester = request(app.getHttpServer());
  });

  it('/GET all events sort by title', async () => {
    const response = await httpRequester
      .get('/events')
      .query({ page: 0, rows: 10000, offset: 0, sortBy: 'title' })
      .expect(200);

    expect(response.body.returnData.length).toBeGreaterThanOrEqual(100);
    expect(response.body.returnData[0].title).toEqual("\"1, 2, 3. Raconte-moi !\"");
  });

  it('/GET all events sort by address', async () => {
    const response = await httpRequester
      .get('/events')
      .query({ page: 0, rows: 10000, offset: 0, sortBy: 'address' })
      .expect(200);

    expect(response.body.returnData.length).toBeGreaterThanOrEqual(100);
    expect(response.body.returnData[0].address).toEqual(
      ', 40190 PERQUIE',
    );
  });

  it('/GET events pagination', async () => {
    const response = await httpRequester
      .get('/events')
      .query({ page: 0, rows: 10, offset: 0 })
      .expect(200);

    expect(response.body.returnData.length).toEqual(10);
    expect(response.body.current).toEqual(0);
    expect(response.body.next).toEqual(1);
    expect(response.body.last).toEqual(9);
    expect(response.body.first).toEqual(0);
  });

  it('/GET events pagination with rows < 0', async () => {
    const response = await httpRequester
      .get('/events')
      .query({ page: 0, rows: -1, offset: 0 })
      .expect(200);

    expect(response.body.returnData.length).toEqual(10);
    expect(response.body.current).toEqual(0);
    expect(response.body.next).toEqual(1);
    expect(response.body.last).toEqual(9);
    expect(response.body.first).toEqual(0);
  });

  it('/GET events pagination with rows > length', async () => {
    const response = await httpRequester
      .get('/events')
      .query({ page: 0, rows: 10000, offset: 0 })
      .expect(200);

    expect(response.body.returnData.length).toEqual(100);
    expect(response.body.current).toEqual(0);
    expect(response.body.next).toEqual(0);
    expect(response.body.last).toEqual(0);
    expect(response.body.first).toEqual(0);
  });

  it('/GET events pagination with page = lastPage', async () => {
    const response = await httpRequester
      .get('/events')
      .query({ page: 87, rows: 10, offset: 0 })
      .expect(200);

    expect(response.body.returnData.length).toEqual(100);
    expect(response.body.current).toEqual(87);
    expect(response.body.next).toEqual(0);
    expect(response.body.last).toEqual(9);
    expect(response.body.first).toEqual(0);
  });

  it('/GET events by title', async () => {
    const response = await httpRequester
      .post('/events/search/title')
      .send({ title: 'Visite pédagogique' })
      .expect(201);

    expect(response.status).toEqual(201); 
    expect(response.body).toBeDefined(); 
  });

  it('/GET events by part of the title', async () => {
    const response = await httpRequester
      .post('/events/search/title')
      .send({ title: 'Visite p' })
      .expect(201);

    expect(response.body.length).toEqual(1);
  });

  it('/GET events by id', async () => {
    const response = await httpRequester.get('/events/33400215').expect(200);

    expect(response.body.id).toEqual('33400215');
  });

  it('/PUT /GET favorite events', async () => {
    const response = await httpRequester.put('/events/33400215').expect(200);
    expect(response.body.id).toEqual('33400215');

    const response2 = await httpRequester
      .get('/events')
      .query({ page: 0, rows: -1, offset: 0, fav: 1 })
      .expect(200);

    expect(response2.body.returnData[0].id).toEqual('33400215');
    expect(response2.body.returnData.length).toEqual(1);
  });

  it('/POST create event', async () => {
    const response = await httpRequester
      .post('/events')
      .send({
        id: 'XXX',
        title: 'XXX',
        description: 'XXX',
        longdescription: 'XXX',
        eventurl: 'XXX',
        imageurl: 'XXX',
        timings: 'XXX',
        latitude: 49.37992,
        longitude: 3.358151,
        address: 'XXX',
        city: 'XXX',
        department: 'XXX',
        region: 'XXX',
        country: 'XXX',
        attendancemode: 'XXX',
        phoneNumber: 'XXX',
        email: 'XXX',
        website: 'XXX',
      })
      .expect(201);

    expect(response.body).toEqual({
        id: 'XXX',
        title: 'XXX',
        description: 'XXX',
        longdescription: 'XXX',
        eventurl: 'XXX',
        imageurl: 'XXX',
        timings: 'XXX',
        latitude: 49.37992,
        longitude: 3.358151,
        address: 'XXX',
        city: 'XXX',
        department: 'XXX',
        region: 'XXX',
        country: 'XXX',
        attendancemode: 'XXX',
        phoneNumber: 'XXX',
        email: 'XXX',
        website: 'XXX',
    });
  });

  it('/DELETE delete event', async () => {
    await httpRequester
      .post('/events')
      .send({
        id: 'XXX',
        title: 'XXX',
        description: 'XXX',
        longdescription: 'XXX',
        eventurl: 'XXX',
        imageurl: 'XXX',
        timings: 'XXX',
        latitude: 49.37992,
        longitude: 3.358151,
        address: 'XXX',
        city: 'XXX',
        department: 'XXX',
        region: 'XXX',
        country: 'XXX',
        attendancemode: 'XXX',
        phoneNumber: 'XXX',
        email: 'XXX',
        website: 'XXX',
      })
      .expect(201);

    const response1 = await httpRequester
      .get('/events')
      .query({ page: 0, rows: 10000, offset: 0, sortBy: 'title' })
      .expect(200);

    expect(response1.body.returnData.length).toEqual(101);

    await httpRequester.delete('/events/XXX').expect(200);

    const response2 = await httpRequester
      .get('/events')
      .query({ page: 0, rows: 10000, offset: 0, sortBy: 'title' })
      .expect(200);

    expect(response2.body.returnData.length).toEqual(100);
  });

  it('/PATCH update event', async () => {
    await httpRequester
      .post('/events')
      .send({
        id: 'id-old',
        title: 'title-old',
        description: 'description-old',
        longdescription: 'longdescription-old',
        eventurl: 'eventurl-old',
        imageurl: 'imageurl-old',
        timings: 'timings-old',
        latitude: 49.37992,
        longitude: 3.358151,
        address: 'address-old',
        city: 'city-old',
        department: 'department-old',
        region: 'region-old',
        country: 'country-old',
        attendancemode: 'attendancemode-old',
        phoneNumber: 'phoneNumber-old',
        email: 'email-old',
        website: 'website-old',
      })
      .expect(201);

    await httpRequester
      .patch('/events/id-old')
      .send({
        description: 'uuu',
        address: 'uuu',
        phoneNumber: 'uuu',
      })
      .expect(200);

    const response = await httpRequester.get('/events/id-old').expect(200);

    expect(response.body).toEqual({
      id: 'id-old',
      title: 'title-old',
      description: 'uuu',
      longdescription: 'longdescription-old',
      eventurl: 'eventurl-old',
      imageurl: 'imageurl-old',
      timings: 'timings-old',
      latitude: 49.37992,
      longitude: 3.358151,
      address: 'uuu',
      city: 'city-old',
      department: 'department-old',
      region: 'region-old',
      country: 'country-old',
      attendancemode: 'attendancemode-old',
      phoneNumber: 'uuu',
      email: 'email-old',
      website: 'website-old',
    });
  });
});
