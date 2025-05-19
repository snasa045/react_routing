import { useLoaderData, Await } from "react-router";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();
  // const { events, isError, message } = data;

  // if (isError) {
  //   return <p>{message}</p>;
  // }

  // return <EventsList events={events} />;
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

const loadEvenets = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return json({ message: "Could not fetch events!" }, { status: 500 });
    throw new Response(JSON.stringify({ message: "Could not fetch events!" }), {
      status: 500,
    });
    // throw {message: 'Could not fetch events!'};
    // return {isError: true, message: 'Could not fetch events!'};
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

export const eventsLoader = () => {
  return {
    events: loadEvenets(),
  };
};
