import { useState } from "react";
import type { CalendarEntry, Lobby } from "../util/types";
import CalendarGrid from "../ui/CalendarGrid";
import AddEntryModal from "../Modals/AddEntryModal";

export default function CalendarPage({
    lobby,
    onLeave,
}: {
    lobby: Lobby;
    onLeave: () => void;
}) {
    const [entries, setEntries] = useState<CalendarEntry[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // YYYY-MM-DD
    });

    function addEntry(entry: CalendarEntry) {
        setEntries(prev => [...prev, entry]);
        setSelectedSlot(null);
    }

    function deleteEntry(id: string) {
        setEntries(prev => prev.filter(e => e.id !== id));
    }

    const entriesForSelectedDate = entries.filter(
        e => e.date === selectedDate
    );

    return (
        <div className="bg-white rounded-xl w-3xl ml-auto shadow p-4">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-xl font-semibold">{lobby.name}</h1>
                    <p className="text-sm text-gray-500">
                        Invite: {lobby.code}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                    type="date"
                    className="border rounded px-2 py-1"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    />
                    <button onClick={onLeave} className="text-sm text-red-500">
                        Leave
                    </button>
                </div>
            </div>

            <CalendarGrid
            entries={entriesForSelectedDate}
            onEmptySlotClick={setSelectedSlot}
            onDelete={deleteEntry}
            />

            {/* Add entry modal */}
            {selectedSlot && (
                <AddEntryModal
                start={selectedSlot}
                selectedDate={selectedDate} // Pass the currently selected date
                onClose={() => setSelectedSlot(null)}
                onAdd={addEntry}
                />
            )}
        </div>
    );
}