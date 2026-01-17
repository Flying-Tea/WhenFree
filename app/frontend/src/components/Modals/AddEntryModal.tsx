import { useState } from "react";
import type { CalendarEntry, EntryType } from "../util/types";

export default function AddEntryModal({
    start,
    onClose,
    onAdd,
    selectedDate,
}: {
    start: string;
    selectedDate: string;
    onClose: () => void;
    onAdd: (e: CalendarEntry) => void;
}) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [end, setEnd] = useState(start);
    const [type, setType] = useState<EntryType>("availability");
    const [error, setError] = useState("");

    function handleAdd() {
        if (!name.trim()) { // Input validation
            setError("Name is required");
            return;
        }
        if (type === "event" && !title.trim()) {
            setError("Event title is required");
            return;
        }
        // Check time
        if (end <= start) {
            setError("End time must be after start time");
            return;
        }

        // Clear error and add entry
        setError("");
        onAdd({ id: crypto.randomUUID(), name, title: type === "event" ? title : "undefined", startTime: start, endTime: end, type, date: selectedDate});
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded p-4 w-80">
                <h2 className="font-semibold mb-2">Add Entry</h2>

                {error && ( <p className="text-red-500 text-sm mb-2">{error}</p> )}

                <input
                placeholder="Your name"
                className="border w-full mb-2 px-2 py-1"
                value={name}
                onChange={e => setName(e.target.value)} />

                {type === "event" && (
                    <input
                    placeholder="Event title"
                    className="border w-full mb-2 px-2 py-1"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                )}

                <div className="flex gap-2 mb-2">
                    <input
                    type="time"
                    value={start}
                    disabled
                    className="border px-2 py-1 w-1/2"/>
                    <input
                    type="time"
                    value={end}
                    onChange={e => setEnd(e.target.value)}
                    className="border px-2 py-1 w-1/2"/>
                </div>

                <select
                className="border w-full mb-3 px-2 py-1"
                value={type}
                onChange={e => setType(e.target.value as EntryType)}>

                    <option value="availability">Availability</option>
                    <option value="event">Event</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 rounded border">
                        Cancel
                    </button>
                    <button className="bg-black text-white px-3 py-1 rounded" onClick={handleAdd}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
