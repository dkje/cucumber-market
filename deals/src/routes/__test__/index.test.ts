import { mongo } from "mongoose";
import request from "supertest";
import { app } from "../../app";

const createDeal = async () => {
  await request(app)
    .post("/api/deals")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 });
};

it("can fetch a list of deals", async () => {
  await createDeal();
  await createDeal();
  await createDeal();

  const response = await request(app).get("/api/deals").send().expect(200);
  expect(response.body.length).toEqual(3);
});
