import Head from 'next/head'
import { MongoClient, WithId, Document } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import { InferGetStaticPropsType } from 'next'

function HomePage(props: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta name="description" content="Brose a huge list of highly active React meetups!"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

export async function getStaticProps() {

  let meetups: WithId<Document>[] = []

  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfxvt.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    meetups = await meetupsCollection.find().toArray();

    client.close();

  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      meetups: meetups.map(meetup => ({
        tittle: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 1
  }
}

export default HomePage
