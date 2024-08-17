import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import BootstrapTheme from '@fullcalendar/bootstrap5';
import { DateSelectArg, DatesSetArg, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';

type FullCalendarWidgetProps = {
  onSelect: (value: DateSelectArg) => void;
  onEventClick: (value: EventClickArg) => void;
  onEventDrop: (value: EventDropArg) => void;
  onOpenModal: () => void;
  onDateSet: (e: DatesSetArg) => void;
  events: Array<EventInput>;
};

const FullCalendarWidget = ({
  onSelect,
  onEventClick,
  onEventDrop,
  onOpenModal,
  onDateSet,
  events,
}: FullCalendarWidgetProps) => {
  return (
    <div id='calendar'>
      <FullCalendar
        initialView='dayGridMonth'
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, BootstrapTheme]}
        handleWindowResize={true}
        themeSystem='bootstrap5'
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          list: 'List',
          prev: 'Prev',
          next: 'Next',
        }}
        headerToolbar={{
          left: 'prev,next today create',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
        }}
        customButtons={{
          create: {
            text: 'Create new event',
            click: onOpenModal,
          },
        }}
        editable={true}
        selectable={true}
        droppable={true}
        events={events}
        eventClick={(arg: EventClickArg) => onEventClick(arg)}
        eventDrop={(arg: EventDropArg) => onEventDrop(arg)}
        select={onSelect}
        datesSet={onDateSet}
      />
    </div>
  );
};

export { FullCalendarWidget };
