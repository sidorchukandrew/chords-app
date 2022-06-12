import EventsApi from '../api/eventsApi';
import {combineDateAndTime, subtractHours} from '../utils/date';

export function getAllEvents() {
  return EventsApi.getAll();
}

export function deleteEventById(eventId) {
  return EventsApi.deleteOne(eventId);
}

export function createEvent(eventParams) {
  let createRequest = toCreateRequest(eventParams);
  return EventsApi.createOne(createRequest);
}

function toCreateRequest(event) {
  let request = {...event};

  delete request.members;
  if (event?.members) {
    request.membership_ids = event.members.map(member => member.id);
  }

  delete request.date;
  delete request.startTime;
  delete request.endTime;

  request.start_time = combineDateAndTime(event.date, event.startTime);

  if (event?.endTime) {
    request.end_time = combineDateAndTime(event.date, event.endTime);
  }

  delete request.reminderDate;
  delete request.remindersEnabled;
  if (event?.remindersEnabled) {
    request.reminders_enabled = true;
    request.reminder_date = subtractHours(
      event.reminderDate,
      request.start_time,
    );
  }

  return request;
}
