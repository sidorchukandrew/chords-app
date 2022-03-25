import EventsApi from '../api/eventsApi';

export function getAllEvents() {
  return EventsApi.getAll();
}
