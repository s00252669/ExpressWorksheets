import request from "supertest";
import { app } from "../../app";
import { describe, it, expect } from "vitest";
describe("GET /ping", () => {
    it("should return hello from Ben ", async () => {
        const response = await request(app)
            .get("/ping");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "hello from Ben "
        });
    });
});
