import { Await, redirect, useRouteLoaderData } from "react-router";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={event}>
        {loadedEvent => <EventItem event={loadedEvent} />}
      </Await>
    </Suspense>
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async (eventId) => {
  // const { eventId } = params;
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event!" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

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

export const eventDetailsLoader = async ({ params }) => {
  const { eventId } = params;
  return {
    event: await loadEvent(eventId),
    events: loadEvenets(),
  };
};

export const deleteEventAction = async ({ request, params }) => {
  const { eventId } = params;
  const { method } = request;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: method,
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not delete the event!" }),
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
};
