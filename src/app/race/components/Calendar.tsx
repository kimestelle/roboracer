'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
  description?: string;
}

const CalendarWithEventList: React.FC = () => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    //dynamic loading
    setEvents([
      { id: '1', title: 'Race 1', start: '2025-02-10T00:00:00Z', description: 'desc 1' },
      { id: '2', title: 'Race 2', start: '2025-02-15T14:00:00Z', description: 'desc 2' },
      { id: '3', title: 'Race 3', start: '2025-02-22T10:00:00Z', description: 'desc 3' },
      { id: '4', title: 'Race 4', start: '2025-02-27T18:30:00Z', description: 'desc 4' },
    ]);
  }, []);

  const handleEventClick = (info: { event: { id: string } }) => {
    setExpandedEventId(expandedEventId === info.event.id ? null : info.event.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* calendar grid */}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek' }}
        height="auto"
      />

      {/* all events */}
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">All Events</h2>
        <ul className="mt-2">
          {events.length > 0 ? (
            events
              .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
              .map(event => (
                <li key={event.id} className="mb-2 p-3 border-b border-gray-300 cursor-pointer hover:bg-gray-200 rounded">
                  <div className="flex justify-between items-center" onClick={() => handleEventClick({ event: { id: event.id } })}>
                    <span className="font-medium">{event.title}</span>
                    <span className="text-sm text-gray-600">{new Date(event.start).toLocaleDateString()}</span>
                  </div>
                  {expandedEventId === event.id && event.description && (
                    <p className="mt-2 text-gray-700">{event.description}</p>
                  )}
                </li>
              ))
          ) : (
            <p className="text-gray-500">No events available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CalendarWithEventList), { ssr: false });
