import request from "supertest";
import { app } from "../../app";
import { describe, it, expect, beforeAll } from "vitest";
import { connectDB } from "../../config/database";

beforeAll(async () => {
await connectDB();
});



describe('GET /cars', () => {

    it('returns all cars', async () => {

        const response = await request(app)
            .get('/api/v1/cars');

        expect(response.status).toBe(200);

    });

});
