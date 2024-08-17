import { Card } from 'react-bootstrap';

import { useCalendar } from './hooks';
import { AddEditEvent, FullCalendarWidget } from './components';
import { usePageTitle } from '~/hooks';
import { LoadingOverlay } from '~/components';

const Calendar = () => {
  const {
    isOpen,
    onOpenModal,
    onCloseModal,
    isEditable,
    events,
    dateInfo,
    calendar,
    isLoading,
    isDeleting,
    onSelect,
    onEventClick,
    onEventDrop,
    onUpdateEvent,
    onRemoveEvent,
    onAddEvent,
    onDateSet,
  } = useCalendar();

  usePageTitle('Calendar');

  return (
    <div className='py-3 h-100'>
      <LoadingOverlay open={isLoading} fullScreen />
      <Card className='h-100'>
        <Card.Body className='h-100'>
          <FullCalendarWidget
            onSelect={onSelect}
            onEventClick={onEventClick}
            onEventDrop={onEventDrop}
            onOpenModal={onOpenModal}
            onDateSet={onDateSet}
            events={events}
          />
        </Card.Body>
      </Card>
      {isOpen ? (
        <AddEditEvent
          isOpen={isOpen}
          onClose={onCloseModal}
          isEditable={isEditable}
          onUpdateEvent={onUpdateEvent}
          onRemoveEvent={onRemoveEvent}
          onAddEvent={onAddEvent}
          dateInfo={dateInfo}
          calendar={calendar}
          isDeleting={isDeleting}
        />
      ) : null}
    </div>
  );
};

export default Calendar;
