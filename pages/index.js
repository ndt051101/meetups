import Head from 'next/head';
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetup!"/>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export const getServiceSideProps = async (context) => {
//   const res = context.res;
//   const req = context.req;

//   return {
//     props: {
//       meetups: DUMY_MEETUPS,
//     },
//   };
// };

export async function getStaticProps() {
  //fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://tiendn1:OmYU5nAM5aWULOTJ@cluster0.pqlla.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
