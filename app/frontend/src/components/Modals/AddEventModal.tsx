import { useState } from "react";
import type { CalendarEntry } from "../util/types";

export default function AddEventModal({
    start,
    selectedDate,
    onClose,
    onAdd,
}: {
    start: string;
    selectedDate: string;
    onClose: () => void;
    onAdd: (e: CalendarEntry) => void;
}) {
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [end, setEnd] = useState(start);
    const [error, setError] = useState("");

    const handleAdd = () => {
        if (!name.trim()) { setError("Name required"); return; }
        if (!title.trim()) { setError("Title required"); return; }
        if (end <= start) { setError("End must be after start"); return; }

        onAdd({ id: crypto.randomUUID(), name, title, startTime: start, endTime: end, type: "event", date: selectedDate });
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded p-4 w-80">

                <h2 className="font-semibold mb-2">Add Event</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input placeholder="Your name" className="border w-full mb-2 px-2 py-1" value={name} onChange={e => setName(e.target.value)} />
                <input placeholder="Event title" className="border w-full mb-2 px-2 py-1" value={title} onChange={e => setTitle(e.target.value)} />

                <div className="flex gap-2 mb-2">
                    <input type="time" value={start} disabled className="border px-2 py-1 w-1/2" />
                    <input type="time" value={end} onChange={e => setEnd(e.target.value)} className="border px-2 py-1 w-1/2" />
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
                    <button onClick={handleAdd} className="bg-black text-white px-3 py-1 rounded">Add</button>
                </div>
            </div>
        </div>
    );
}
