import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import type { Snowflake } from 'discord.js';

import type { CountAggregateDocument, RazaoEntry } from './db.types';

enum Collection {
  Registry = 'registry',
}

export default class Database {
  #uri: string;
  #dbName: string;

  cachedClient!: MongoClient;
  cachedDb!: Db;

  constructor() {
    this.#uri = process.env.MONGODB_URI as string;
    this.#dbName = process.env.MONGODB_DB as string;
  }

  async connectToDatabase() {
    const client = new MongoClient(this.#uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();

    console.log('✅ Connected to database');

    const db = client.db(this.#dbName);

    this.cachedClient = client;
    this.cachedDb = db;
  }

  async registerPoint(recipient: Snowflake, loggedBy: Snowflake) {
    const collection = this.cachedDb.collection(Collection.Registry);
    const entry: RazaoEntry = {
      date: new Date(),
      recipient,
      loggedBy,
    };

    try {
      const result = await collection.insertOne(entry);

      // Print the result
      console.log('Document inserted with _id: ', result.insertedId);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPoints(user: Snowflake) {
    const collection = this.cachedDb.collection(Collection.Registry);
    const query = { recipient: user };

    try {
      const count = await collection.countDocuments(query);
      return count;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPointsByUser() {
    const collection = this.cachedDb.collection(Collection.Registry);

    try {
      const result = await collection
        .aggregate<CountAggregateDocument>([
          {
            $group: {
              _id: '$recipient',
              count: { $sum: 1 },
            },
          },
        ])
        .toArray();
      return result.map(({ _id, count }) => ({ user: _id, count }));
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
