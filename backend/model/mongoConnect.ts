import { MongoClient } from "mongodb";
const client = new MongoClient("mongodb://localhost:27017");

async function connect() {
  try {
    await client.connect();
    console.log("Connect successfully");
    const db = client.db("chatapp");
  } catch (error) {
    console.log(error);
  }
}

async function disconnect() {
  await client.close();
}

module.exports = {
  client,
  connect,
  disconnect,
};

export { connect, disconnect, client };
