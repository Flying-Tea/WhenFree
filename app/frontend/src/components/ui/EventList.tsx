import type { CalendarEntry } from "../util/types";

export default function EventList({ events }: { events: CalendarEntry[] }) {
    if (events.length === 0) {
        return (
        <div className="bg-gray-50 p-2 rounded">
            <h2 className="font-semibold mb-2">Planned Events</h2>
            <p className="text-sm text-gray-400">No events planned</p>
        </div>
        );
    }

    // Sort events by date first, then by start time
    const sortedEvents = [...events].sort((a, b) => {
        if (a.date && b.date) {
            return a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime);
        }
        return 0;
    });

    return (
        <div className="bg-gray-50 p-2 rounded max-h-75 overflow-y-auto">
            <h2 className="font-semibold mb-2">Planned Events</h2>
            <ul className="text-sm space-y-1">
                {sortedEvents.map((e) => (
                <li key={e.id}>
                    {e.date} {e.startTime}-{e.endTime} {e.title || "Event"} ({e.name})
                </li>
                ))}
            </ul>
        </div>
  );
}