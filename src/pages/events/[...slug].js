import { useRouter } from 'next/router';

import Button from '@ui/Button';
import EventList from '@/components/EventList/EventList';
import ResultsTitle from '@/components/EventDetails/results-title';
import ErrorAlert from '../../components/EventDetails/error-alert';

import { getFilteredEvents } from '../../../events';

export default function FilteredEvents(props) {
  const router = useRouter();
  const data = router.query.slug;
  if (!data) {
    return <p className="center">Loading...</p>;
  }

  const year = +data[0];
  const month = +data[1];
  if (isNaN(year) || isNaN(month)) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid search parameters. Please try again.</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const events = getFilteredEvents({ year: year, month: month });
  if (!events || events.length == 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No Matches Found.</p>
        </ErrorAlert>
        <div className="center">
          <Button href="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const searchDate = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={searchDate} />
      <EventList events={events} />
    </>
  );
}
