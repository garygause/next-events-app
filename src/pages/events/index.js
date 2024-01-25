import { useRouter } from 'next/router';

import EventList from '@/components/EventList/EventList';
import EventSearch from '@/components/EventSearch/EventSearch';

import { getAllEvents } from '../../../events';

export default function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function searchHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventSearch onSearch={searchHandler} />
      <EventList events={events} />
    </>
  );
}
