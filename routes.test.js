process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
let db = require('./fakeDb');

describe('GET /items', () => {
  test('Get All Items', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      db: [
        { name: 'popsicle', price: 1.45 },
        { name: 'cheerios', price: 3.4 },
      ],
    });
  });
});

describe('POST /items', () => {
  test('Creating A New Item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'chicken', price: 5.69 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: 'chicken', price: 5.69 } });
  });
});

describe('/PATCH /items/:name', () => {
  test('Updating a Item Price Name/Price', async () => {
    const res = await request(app)
      .patch('/items/popsicle')
      .send({ name: 'chicken', price: 5.69 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: 'chicken', price: 5.69 } });
  });
});

describe('/DELETE /items/:name', () => {
  test('Delete An Item', async () => {
    const res = await request(app).delete('/items/chicken');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' });
  });
});
