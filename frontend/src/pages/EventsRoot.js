import { Outlet } from "react-router";
import EventsNavigation from "../components/EventsNavigation";

const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
};

export default EventsRootLayout;
