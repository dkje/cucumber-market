import request from "supertest";
import { app } from "../../app";
import { Deal } from "../../models/deal";

it("has a route handler listening to /api/deals for post requests", async () => {
  const response = await request(app).post("/api/deals").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/deals").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if an invalid title is provided", async () => {
  let response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ price: 400, title: "" });

  expect(response.status).toEqual(400);

  response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ price: 400 });

  expect(response.status).toEqual(400);
});

it("returns an error if an invalid price is provided", async () => {
  let response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ price: -10, title: "test" });

  expect(response.status).toEqual(400);

  response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ title: "test" });

  expect(response.status).toEqual(400);
});

it("creates a deal with valid inputs", async () => {
  //get every deals from Deal schema
  let deals = await Deal.find({});
  expect(deals.length).toEqual(0);

  //TODO: add in a check to make sure a ticket was saved
  const response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({
      title: "test",
      price: 20,
    });

  deals = await Deal.find({});
  expect(deals.length).toEqual(1);
  expect(deals[0].price).toEqual(20);
  expect(deals[0].title).toEqual("test");
});
