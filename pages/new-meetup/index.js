import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router';
import Head from "next/head";

const NewMeetupPage = () => {
  
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');

  }
  
  return (
    <>
      <Head>
        <title>Add a New Meetups</title>
        <meta
          name="description"
          content="Add your own meetups and create amizing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
  
};

export default NewMeetupPage;
