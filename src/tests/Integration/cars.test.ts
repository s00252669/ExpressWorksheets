import request from "supertest";
import { app } from "../../app";
import { describe, it, expect, beforeAll } from "vitest";
import { connectDB } from "../../config/database";

beforeAll(async () => {
await connectDB();
});



describe('Cars API', () => {
  it('creates a car, finds it, and deletes it', async () => {
    const car = {
      make: 'Toyota',
      model: 'Corolla',
      year: 2024
    };

    const created = await request(app)
      .post('/api/v1/cars')
      .set('x-api-key', 'test-key')
      .send(car);

    expect(created.status).toBe(201);
    expect(created.body.make).toBe('Toyota');
    expect(created.body.model).toBe('Corolla');

    const list = await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', 'test-key');

    const cars = list.body as Array<{ _id?: string }>;

    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBe(true);
    expect(cars.some((c: { _id?: string }) => c._id === created.body._id)).toBe(true);

    const deleted = await request(app)
      .delete(`/api/v1/cars/${created.body._id}`)
      .set('x-api-key', 'test-key');

    expect(deleted.status).toBe(200);

    const gone = await request(app)
      .get(`/api/v1/cars/${created.body._id}`)
      .set('x-api-key', 'test-key');

    expect(gone.status).toBe(404);
  });

  it('returns all cars', async () => {
    const response = await request(app)
      .get('/api/v1/cars')
      .set('x-api-key', 'test-key');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('updates an existing car', async () => {
    const created = await request(app)
      .post('/api/v1/cars')
      .set('x-api-key', 'test-key')
      .send({
        make: 'Ford',
        model: 'Focus',
        year: 2020
      });

    const updated = await request(app)
      .put(`/api/v1/cars/${created.body._id}`)
      .set('x-api-key', 'test-key')
      .send({
        make: 'Ford',
        model: 'Mustang',
        year: 2023
      });

    expect(updated.status).toBe(200);
    expect(updated.body.model).toBe('Mustang');
    expect(updated.body.year).toBe(2023);
  });

  it('rejects invalid car data', async () => {
    const response = await request(app)
      .post('/api/v1/cars')
      .set('x-api-key', 'test-key')
      .send({
        model: 'Civic'
      });

    expect(response.status).toBe(400);
  });
});