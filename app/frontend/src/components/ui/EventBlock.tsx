import { type CalendarEntry } from "../util/types";

const SLOT_HEIGHT = 40;
const START_HOUR = 9;

function timeToMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
}

export default function EventBlock({
    entry,
    onDelete,
}: {
    entry: CalendarEntry;
    onDelete: (id: string) => void;
}) {
    const startMinutes = timeToMinutes(entry.startTime);
    const endMinutes = timeToMinutes(entry.endTime);
    const top = ((startMinutes - START_HOUR * 60) / 30) * SLOT_HEIGHT;
    const height = ((endMinutes - startMinutes) / 30) * SLOT_HEIGHT;

    const color = entry.type === "event" ? "bg-blue-400" : "bg-green-400";

    return (
        <div
        className={`absolute left-1 right-1 ${color} text-white text-sm rounded p-1`}
        style={{ top, height }}
        onClick={() => onDelete(entry.id)}>

            <div className="font-semibold">
                {entry.title || "Available"}
            </div>
            <div className="text-xs">{entry.name}</div>
        </div>
    );
}
