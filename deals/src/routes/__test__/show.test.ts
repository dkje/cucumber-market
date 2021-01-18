import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const response = await request(app).get("/api/deal/sdfjalksdjasd").send();
  expect(response.status).toEqual(404);
});

it("returns the ticket if the ticket is found", async () => {
  const title = "test";
  const price = 20;

  const response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const dealResponse = await request(app).get(`/api/deals/${response.body.id}`);

  expect(dealResponse.status).toEqual(200);
  expect(dealResponse.body.title).toEqual(title);
  expect(dealResponse.body.price).toEqual(price);
});
