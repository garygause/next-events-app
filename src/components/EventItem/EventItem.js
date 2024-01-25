import Image from 'next/image';

import Button from '../ui/Button';
import DateIcon from '@/components/icons/date-icon';
import AddressIcon from '@/components/icons/address-icon';
import ArrowRightIcon from '@/components/icons/arrow-right-icon';

import styles from './EventItem.module.css';

export default function EventItem(props) {
  const { title, image, date, location, id } = props;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(', ', '\n');

  return (
    <li className={styles.item}>
      <img src={'/' + image} alt={title} />
      <div className={styles.content}>
        <div>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button
            href={`/events/${id}`}
            variant="contained"
            disabled={false}
            color="primary"
            endIcon={<ArrowRightIcon />}
          >
            Explore Event
          </Button>
        </div>
      </div>
    </li>
  );
}
