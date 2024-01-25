import EventItem from '../EventItem/EventItem';

import styles from './EventList.module.css';

export default function EventList({ events }) {
  //console.log(events);
  return (
    <>
      <ul className={styles.list}>
        {events.map((e) => (
          //console.log(e);
          <EventItem
            key={e.id}
            id={e.id}
            title={e.title}
            location={e.location}
            date={e.date}
            image={e.image}
          />
        ))}
      </ul>
    </>
  );
}
