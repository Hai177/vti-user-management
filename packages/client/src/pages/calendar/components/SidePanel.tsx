import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';

const externalEvents = [
  {
    id: uuidv4(),
    textClass: 'text-success',
    className: 'bg-success',
    title: 'New Theme Release',
  },
  {
    id: uuidv4(),
    textClass: 'text-info',
    className: 'bg-info',
    title: 'My Event',
  },
  {
    id: uuidv4(),
    textClass: 'text-warning',
    className: 'bg-warning',
    title: 'Meet manager',
  },
  {
    id: uuidv4(),
    textClass: 'text-danger',
    className: 'bg-danger',
    title: 'Create New theme',
  },
];

const SidePanel = () => {
  return (
    <>
      <div id='external-events' className='m-t-20'>
        <br />
        <p className='text-muted'>Drag and drop your event or click in the calendar</p>
        {externalEvents.map((event) => {
          return (
            <div
              key={event.id}
              className={clsx('external-event', event.className + '-lighten', event.textClass)}
              title={event.title}
              data-class={event.className}>
              <i className='mdi mdi-checkbox-blank-circle me-2 vertical-middle'></i>
              {event.title}
            </div>
          );
        })}
      </div>

      <div className='mt-5 d-none d-xl-block'>
        <h5 className='text-center'>How It Works ?</h5>

        <ul className='ps-3'>
          <li className='text-muted mb-3'>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged.
          </li>
          <li className='text-muted mb-3'>
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage.
          </li>
          <li className='text-muted mb-3'>
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged.
          </li>
        </ul>
      </div>
    </>
  );
};

export { SidePanel };
