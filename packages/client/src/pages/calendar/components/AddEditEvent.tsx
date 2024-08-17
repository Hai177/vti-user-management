import { Modal, Row, Col, Button, Form } from 'react-bootstrap';
import { DateSelectArg } from '@fullcalendar/core/index.js';
import moment from 'moment';
import { Controller } from 'react-hook-form';

import { useAddEditEvent } from '../hooks';
import { Event } from '../types';
import { ICalendar } from '~/redux/calendar';
import { ButtonLoading } from '~/components';
import { useToggle } from '~/hooks';
import DeleteCalendarModal from './DeleteCalendarModal';

type AddEditEventProps = {
  isOpen: boolean;
  onClose: () => void;
  isEditable: boolean;
  onRemoveEvent: () => void;
  onUpdateEvent: (value: Event) => void;
  onAddEvent: (value: Event) => void;
  calendar?: ICalendar;
  dateInfo?: DateSelectArg | null;
  isLoading?: boolean;
  isDeleting?: boolean;
};

const AddEditEvent = ({
  isOpen,
  onClose,
  isEditable,
  calendar,
  dateInfo,
  isLoading,
  isDeleting,
  onRemoveEvent,
  onUpdateEvent,
  onAddEvent,
}: AddEditEventProps) => {
  const [isOpenDeleteModal, , show, hide] = useToggle();
  const { handleSubmit, register, errors, onSubmitEvent, control, isDirty, watch } = useAddEditEvent(
    isEditable,
    onUpdateEvent,
    onAddEvent,
    calendar,
    dateInfo
  );

  const isAllDay = watch('isAllDay');

  const inputDateType = isAllDay ? 'date' : 'datetime-local';

  const format = isAllDay ? 'YYYY-MM-DD' : 'YYYY-MM-DDTHH:mm';

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header className='pb-2 px-4 border-bottom-0' closeButton>
          <Modal.Title id='modal-title'>
            <h5> {isEditable ? 'Edit Event' : 'Add New Event'} </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='px-4 pb-4 pt-0'>
          <form noValidate name='chat-form' id='chat-form' onSubmit={handleSubmit(onSubmitEvent)}>
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control type='text' {...register('title')} />
                {errors.title?.message && (
                  <Form.Control.Feedback type='invalid' className='d-block'>
                    {errors.title?.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control as='textarea' rows={3} {...register('description')} />
                {errors.description?.message && (
                  <Form.Control.Feedback type='invalid' className='d-block'>
                    {errors.description?.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Category</Form.Label>
                <Form.Select {...register('category')}>
                  <option value='bg-danger'>Danger</option>
                  <option value='bg-success'>Success</option>
                  <option value='bg-primary'>Primary</option>
                  <option value='bg-info'>Info</option>
                  <option value='bg-dark'>Dark</option>
                  <option value='bg-warning'>Warning</option>
                </Form.Select>
                {errors.category?.message && (
                  <Form.Control.Feedback type='invalid' className='d-block'>
                    {errors.category?.message}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Check type='checkbox' label='All day' {...register('isAllDay')} />
              </Form.Group>
              <Form.Group as={Row} className='mb-3'>
                <Col sm={6}>
                  <Form.Label>Start time</Form.Label>
                  <Controller
                    control={control}
                    name='start'
                    render={({ field: { value, ...rest } }) => (
                      <Form.Control type={inputDateType} value={moment(value).format(format)} {...rest} />
                    )}
                  />
                  {errors.start?.message && (
                    <Form.Control.Feedback type='invalid' className='d-block'>
                      {errors.start?.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
                <Col sm={6}>
                  <Form.Label>End time</Form.Label>
                  <Controller
                    control={control}
                    name='end'
                    render={({ field: { value, ...rest } }) => (
                      <Form.Control type={inputDateType} value={moment(value).format(format)} {...rest} />
                    )}
                  />
                  {errors.end?.message && (
                    <Form.Control.Feedback type='invalid' className='d-block'>
                      {errors.end?.message}
                    </Form.Control.Feedback>
                  )}
                </Col>
              </Form.Group>
            </Row>
            <Row>
              <Col xs={4}>
                {isEditable ? (
                  <Button variant='danger' onClick={show}>
                    Delete
                  </Button>
                ) : null}
              </Col>
              <Col xs={8} className='text-end'>
                <Button className='btn btn-light me-1' onClick={onClose}>
                  Close
                </Button>
                <ButtonLoading
                  isLoading={isLoading}
                  variant='success'
                  type='submit'
                  className='btn btn-success'
                  disabled={!isDirty}>
                  Save
                </ButtonLoading>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
      <DeleteCalendarModal
        show={isOpenDeleteModal}
        onHide={hide}
        calendar={calendar}
        isLoading={isDeleting}
        onDelete={onRemoveEvent}
      />
    </>
  );
};

export { AddEditEvent };
