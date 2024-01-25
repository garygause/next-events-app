import EventList from '@/components/EventList/EventList';

import { getFeaturedEvents } from '../../events';

export default function HomePage() {
  const events = getFeaturedEvents();
  return (
    <div>
      <EventList events={events} />
    </div>
  );
}
