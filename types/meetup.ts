import { MongoClient, WithId, Document } from 'mongodb'

export type Meetup = WithId<{
  title: string,
  image: string,
  address:  string,
  description: string
}>