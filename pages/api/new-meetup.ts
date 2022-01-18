import { MongoClient } from "mongodb";
// type
import { NextApiRequest, NextApiResponse } from "next";

// /api/newmeetup
// POST /api/new-meetup
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data = req.body;
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://besnon123:benson123@cluster0.tfxvt.mongodb.net/meetups?retryWrites=true&w=majority"
      );
      const db = client.db();

      const meetupsCollection = db.collection("meetups");

      const result = data && (await meetupsCollection.insertOne(data));

      console.log(result);

      client.close();

      res.status(201).json({ message: "Meet inserted!" });
    } catch (err) {
      console.log(err);
    }
  }
}

export default handler;
