import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/deals/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/deals/${id}`)
    .send({ title: "test", price: 20 })
    .expect(401);
});

it("returns a 401 if the user dose not own the ticket", async () => {
  const response = await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 });

  await request(app)
    .put(`/api/deals/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "new title", price: 100 })
    .expect(401);
});

it("returns a 400 if the user provided an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/deals")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 });

  await request(app)
    .put(`/api/deals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/deals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title", price: -20 })
    .expect(400);
});

it("updates the deals provided inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/deals")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 });

  await request(app)
    .put(`/api/deals/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title", price: 200 })
    .expect(200);

  const dealResponse = await request(app)
    .get(`/api/deals/${response.body.id}`)
    .send()
    .expect(200);

  expect(dealResponse.body.title).toEqual("new title");
  expect(dealResponse.body.price).toEqual(200);
});
