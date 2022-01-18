import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import { GetStaticPropsContext } from 'next'
import { MongoClient, ObjectId, WithId, Document } from 'mongodb'
// type
import { Meetup } from '../../types/meetup'

function MeetupDetails(props: { meetupData: Meetup }) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        descriptiton={props.meetupData.description}
      />
    </>
  )
}

export async function getStaticPaths() {

  let meetups: WithId<Document>[] = []

  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfxvt.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    // find all , give back id as defualt
    meetups = await meetupsCollection.find({}, { projection: { _id: 1 } }).toArray();

    client.close();

  } catch (err) {
    console.log(err);
  }

  return {
    fallback: false,
    paths: meetups.map(meetup => ({
      params: { meetupId: meetup._id.toString() }
    }))
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {

  const meetupId = context.params?.meetupId as string

  let selectedMeetup: WithId<Document> | null = null

  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfxvt.mongodb.net/meetups?retryWrites=true&w=majority`
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    // find ㄅ , give back id as defualt
    selectedMeetup = await meetupsCollection.findOne({
      _id: new ObjectId(meetupId)
    })
    
    client.close();

  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      meetupData: {
        id: selectedMeetup?._id.toString(),
        title: selectedMeetup?.title,
        address: selectedMeetup?.address,
        image: selectedMeetup?.image,
        description: selectedMeetup?.description,
      }
    },
    revalidate: 1
  }
}

export default MeetupDetails
