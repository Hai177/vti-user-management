import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UpcomingEventCard from '~/pages/home/components/main/CalendarCard';

const HomeCalendar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/calendar/`, { replace: false });
  };
  return (
    <div className='upcoming-events '>
      <div className='d-flex justify-content-between'>
        <div className='d-flex align-items-center fs-4 gap-3 fw-bold'>
          <div>UPCOMING EVENTS</div>
        </div>
        <Button variant='light' className='d-flex align-items-center gap-2 bg-body-secondary' onClick={handleClick}>
          <i className='fa-light fa-right-to-bracket'></i>
          <div className='h-auto'>Go to calendar</div>
        </Button>
      </div>
      <div className='event-card-list d-flex gap-1  flex-wrap'>
        <UpcomingEventCard></UpcomingEventCard>
        <UpcomingEventCard></UpcomingEventCard>
        <UpcomingEventCard></UpcomingEventCard>
        <UpcomingEventCard></UpcomingEventCard>
        <UpcomingEventCard></UpcomingEventCard>
        <UpcomingEventCard></UpcomingEventCard>
        <UpcomingEventCard></UpcomingEventCard>
      </div>
    </div>
  );
};
export default HomeCalendar;
