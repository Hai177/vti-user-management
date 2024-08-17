import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import { DateSelectArg } from '@fullcalendar/core/index.js';

import { Event } from '../types';
import { ICalendar } from '~/redux/calendar';

export default function useAddEditEvent(
  isEditable: boolean,
  onUpdateEvent: (value: Event) => void,
  onAddEvent: (value: Event) => void,
  calendar?: ICalendar,
  dateInfo?: DateSelectArg | null
) {
  const values = isEditable
    ? {
        title: calendar?.title ?? '',
        isAllDay: calendar?.isAllDay,
        description: calendar?.description,
        category: (calendar?.category as string) ?? '',
        start: moment(calendar?.startDate ?? new Date()).toDate(),
        end: moment(calendar?.endDate ?? new Date()).toDate(),
      }
    : {
        title: '',
        description: '',
        category: '',
        isAllDay: dateInfo?.allDay,
        start: moment(dateInfo?.start ?? new Date()).toDate(),
        end: moment(dateInfo?.end ?? new Date()).toDate(),
      };

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      title: yup.string().required('Please enter event name'),
      description: yup.string().optional(),
      category: yup.string().required('Please select category'),
      isAllDay: yup.boolean().optional(),
      start: yup.date().default(() => new Date()),
      end: yup
        .date()
        .required('End time is required')
        .when(
          'start',
          (start, schema) => start && schema.min(start, 'End date must be greater than or equal to start date')
        ),
    })
  );

  /*
   * form methods
   */
  const methods = useForm({ defaultValues: values, values: isEditable ? values : undefined, resolver: schemaResolver });
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors, isDirty },
  } = methods;

  /*
   * handle form submission
   */
  const onSubmitEvent = (data: Event) => {
    isEditable ? onUpdateEvent(data) : onAddEvent(data);
  };

  return {
    handleSubmit,
    register,
    control,
    errors,
    onSubmitEvent,
    isDirty,
    watch,
  };
}
