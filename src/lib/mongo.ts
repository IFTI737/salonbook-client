import { MongoClient, type Db } from "mongodb";

// On Vercel the server can freeze a function while the first MongoDB connection is
// still opening. The driver then gives up and closes the client for good, and every
// later request shows "Topology is closed". So we do not keep one client forever:
// when the current client is closed we quietly open a new one on the next use.

const globalForMongo = globalThis as unknown as { __salonMongo?: { client: MongoClient; dead: boolean } };

function createState() {
  const client = new MongoClient(process.env.DB_URI as string, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 5,
    maxIdleTimeMS: 30000,
  });
  const state = { client, dead: false };
  const markDead = () => {
    state.dead = true;
  };
  client.on("topologyClosed", markDead);
  client.on("close", markDead);
  return state;
}

function liveState() {
  let state = globalForMongo.__salonMongo;
  if (!state || state.dead) {
    state = createState();
    globalForMongo.__salonMongo = state;
  }
  return state;
}

// A Db that always points to a working client. Better Auth and our hooks call
// db.collection(...) on every operation, so the swap happens on the next call.
export const db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = liveState().client.db("salonbook");
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
