import { type CalendarEntry } from "../util/types";
import EventBlock from "./EventBlock";

const START_HOUR = 9;
const END_HOUR = 21;
// const SLOT_HEIGHT = 40;

function generateSlots() {
    const slots = [];
    for (let h = START_HOUR; h < END_HOUR; h++) {
        slots.push(`${h.toString().padStart(2, "0")}:00`);
        slots.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return slots;
}

export default function CalendarGrid({
    entries,
    onEmptySlotClick,
    onDelete,
}: {
    entries: CalendarEntry[];
    onEmptySlotClick: (time: string) => void;
    onDelete: (id: string) => void;
}) {
    const slots = generateSlots();

    return (
    <div className="flex border-t">
        <div className="w-16 text-sm text-gray-500">
        {slots.map(time => (
            <div
            key={time}
            className="h-8 flex items-start justify-end pr-2"
            >
            {time.endsWith(":00") ? time : ""}
            </div>
        ))}
        </div>

        {/* Grid */}
        <div className="relative flex-1 border-l">
        {slots.map(time => (
            <div
            key={time}
            className="h-8 border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => onEmptySlotClick(time)}
            />
        ))}

        {entries.map(entry => (
            <EventBlock
            key={entry.id}
            entry={entry}
            onDelete={onDelete}
            />
        ))}
        </div>
    </div>
    );
}
