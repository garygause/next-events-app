import EventList from '@/components/EventList/EventList';

import { getAllEvents } from '../../../events';

export default function EventsPage() {
  const events = getAllEvents();
  //console.log(events);
  return (
    <div>
      <EventList events={events} />
    </div>
  );
}
