import app from "../index";
import supertest from "supertest";

// Test the get request in index.js

describe("TEST /", () => {
  it("should return list of places according to the input", async () => {
    const response = await supertest(app).get("/?placeName=abc");
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: expect.any(String),
        }),
      ])
    );
  });

  it("should send a message if the query string length is less than 3", async () => {
    const res = await supertest(app).get("/?placeName=ab");
    expect(res.body.msg).toMatch(/No matches Found, type atleast 3 character/);
  });
});

// test for /weather route
describe("test /weather route", () => {
  it("should return error msg if the query string does not find any matching location", async () => {
    const res = await supertest(app).get("/weather/?weatherPlace=bd");
    expect(res.body.errMsg).toMatch(/No matching location found/);
  });

  it("should return the error msg if the query string is empty", async () => {
    const res = await supertest(app).get("/weather/?weatherPlace=");
    expect(res.body.errMsg).toMatch(
      /please type in a location to see the weather data/
    );
  });

  it("should return the weather data of the searched place", async () => {
    const res = await supertest(app).get("/weather/?weatherPlace=chennai");
    expect(res.body).toHaveProperty("location");
  });
});
