import Head from 'next/head'
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm'

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredmeetupData: any) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredmeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json();

    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta name="description" content="Add your own meetups"></meta>
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  )
}

export default NewMeetupPage
