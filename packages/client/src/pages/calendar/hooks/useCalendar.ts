import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DateSelectArg, DatesSetArg, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core/index.js';

import { Event } from '../types';
import { useToast, useToggle } from '~/hooks';
import {
  GetCalendarByTimeRequest,
  useCreateCalendarMutation,
  useDeleteCalendarMutation,
  useGetCalendarsByTimeQuery,
  useUpdateCalendarMutation,
} from '~/redux/calendar';

export default function useCalendar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [dateInfo, setDateSelect] = useState<DateSelectArg | null>(null);
  const [rangeTime, setRangeTime] = useState<GetCalendarByTimeRequest>({});
  const [isOpen, , show, hide] = useToggle();
  const { id } = useParams();

  const { data, calendar, isLoading, refetch } = useGetCalendarsByTimeQuery(rangeTime, {
    refetchOnMountOrArgChange: true,
    skip: !rangeTime.startDate,
    selectFromResult: (res) => ({ ...res, calendar: res.data?.find((p) => p.id === id) }),
  });

  const events: EventInput[] = (data ?? []).map((d) => ({
    ...d,
    start: d.startDate,
    end: d.endDate,
    className: d.category,
    allDay: d.isAllDay,
  }));

  const onCloseModal = () => {
    hide();
    setDateSelect(null);
    setIsEditable(false);
  };
  const onOpenModal = () => show();

  const [createCalendar, { isLoading: isCreating, isSuccess: isCreatedSuccess }] = useCreateCalendarMutation();
  const [updateCalendar, { isLoading: isUpdating, isSuccess: isEditedSuccess }] = useUpdateCalendarMutation();
  const [deleteCalendar, { isLoading: isDeleting, isSuccess: isDeletedSuccess }] = useDeleteCalendarMutation();
  /*
    calendar events
    */

  const onSelect = (e: DateSelectArg) => {
    setDateSelect(e);
    onOpenModal();
    setIsEditable(false);
  };

  const onDateSet = (e: DatesSetArg) => {
    setRangeTime({
      startDate: e.start,
      endDate: e.end,
    });
  };

  // on event click
  const onEventClick = (arg: EventClickArg) => {
    navigate(`/calendar/${arg.event.id}`, { replace: false });
    onOpenModal();
    setIsEditable(true);
  };

  // on add event
  const onAddEvent = (data: Event) => {
    createCalendar({
      ...data,
      startDate: data.start,
      endDate: data.end,
    });
  };

  //  on update event
  const onUpdateEvent = (data: Event) => {
    updateCalendar({
      ...calendar,
      ...data,
      startDate: data.start,
      endDate: data.end,
    });
  };

  // on remove event
  const onRemoveEvent = () => {
    if (calendar?.id) {
      deleteCalendar(calendar?.id);
    }
  };

  // on event drop
  const onEventDrop = (arg: EventDropArg) => {
    updateCalendar({
      id: arg.event.id,
      title: arg.event.title,
      category: arg.event.classNames[0],
      startDate: arg.event.start ?? undefined,
      endDate: arg.event.end ?? undefined,
    });
  };

  useEffect(() => {
    if (isCreatedSuccess && !isEditable) {
      onCloseModal();
      toast('Create calendar successfully');
    }
  }, [isCreatedSuccess, isEditable]);

  useEffect(() => {
    if (isEditedSuccess && isEditable) {
      onCloseModal();
      toast('Update calendar successfully');
    }
  }, [isEditedSuccess, isEditable]);

  useEffect(() => {
    if (isDeletedSuccess && isEditable) {
      refetch();
      onCloseModal();
      toast('Delete calendar successfully');
    }
  }, [isDeletedSuccess, isEditable]);

  return {
    isOpen,
    onOpenModal,
    onCloseModal,
    isEditable,
    events,
    dateInfo,
    calendar,
    isLoading,
    isEditingOrCreating: isCreating || isUpdating,
    isDeleting,
    onSelect,
    onEventClick,
    onEventDrop,
    onUpdateEvent,
    onRemoveEvent,
    onAddEvent,
    onDateSet,
  };
}
