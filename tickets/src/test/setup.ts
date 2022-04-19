import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasd';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  const payload = {
    id: '12asdf2a12sdf',
    email: 'test@testc.com',
  };
  //create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object
  const session = { jwt: token };
  //turn session into json
  const sessionJSON = JSON.stringify(session);
  // encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  return [`session=${base64}`];
};
