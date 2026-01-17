import { useState } from "react";
import type { WeeklyAvailability } from "../util/types";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AddAvailabilityModal({
    onClose,
    onAdd,
}: {
    onClose: () => void;
    onAdd: (entry: WeeklyAvailability) => void;
}) {
    const [name, setName] = useState("");
    const [selectedDays, setSelectedDays] = useState<number[]>([]); // multiple days
    const [start, setStart] = useState("09:00");
    const [end, setEnd] = useState("17:00");
    const [error, setError] = useState("");

    // Toggle day selection
    const toggleDay = (dayIndex: number) => {
        setSelectedDays(prev =>
        prev.includes(dayIndex)
            ? prev.filter(d => d !== dayIndex)
            : [...prev, dayIndex]
        );
    };

    const handleAdd = () => {
        if (!name.trim()) { setError("Name required"); return; }
        if (selectedDays.length === 0) { setError("Select at least one day"); return; }
        if (end <= start) { setError("End must be after start"); return; }

        // Add entry for each selected day
        selectedDays.forEach(day => {
        onAdd({ id: crypto.randomUUID(), name, dayOfWeek: day, start, end });
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded p-4 w-80">
                <h2 className="font-semibold mb-2">Add Weekly Availability</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                placeholder="Your name"
                className="border w-full mb-2 px-2 py-1"
                value={name}
                onChange={e => setName(e.target.value)}
                />

                <div className="flex flex-wrap gap-1 mb-2">
                {days.map((d, i) => (
                    <button
                    key={i}
                    type="button"
                    onClick={() => toggleDay(i)}
                    className={`px-2 py-1 border rounded text-sm ${
                        selectedDays.includes(i) ? "bg-green-500 text-white" : "bg-white text-black"}`}>
                            {d}
                    </button>
                ))}
                </div>

                <div className="flex gap-2 mb-2">
                    <input
                    type="time"
                    value={start}
                    onChange={e => setStart(e.target.value)}
                    className="border px-2 py-1 w-1/2"
                    />

                    <input
                    type="time"
                    value={end}
                    onChange={e => setEnd(e.target.value)}
                    className="border px-2 py-1 w-1/2"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
                    <button onClick={handleAdd} className="bg-green-500 text-white px-3 py-1 rounded">Add</button>
                </div>
            </div>
        </div>
    );
}
