import { useState } from "react";
import type { CalendarEntry, Lobby, WeeklyAvailability } from "../util/types";
import CalendarGrid from "../ui/CalendarGrid";
import AddAvailabilityModal from "../Modals/AddAvaliabilityModal";
import AvailabilityChart from "../ui/AvaliabilityChart";
import EventList from "../ui/EventList";
import AvailabilityList from "../ui/AvailabilityList";
import AddEventModal from "../Modals/AddEventModal";


export default function CalendarPage({
    lobby,
    onLeave,
}: {
    lobby: Lobby;
    onLeave: () => void;
}) {
    const [entries, setEntries] = useState<CalendarEntry[]>([]);
    const [weeklyAvailability, setWeeklyAvailability] = useState<WeeklyAvailability[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0]; // YYYY-MM-DD
    });

    // Show Add Availability modal
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

    function addEntry(entry: CalendarEntry) {
        setEntries(prev => [...prev, entry]);
        setSelectedSlot(null);
    }

    function deleteEntry(id: string) {
        setEntries(prev => prev.filter(e => e.id !== id));
    }

    // Delete availability (ADD THIS FUTURE ME)


    const entriesForSelectedDate = entries.filter(e => e.date === selectedDate);
    const dayOfWeek = new Date(selectedDate).getDay();
    const availabilityForDay = weeklyAvailability.filter(a => a.dayOfWeek === dayOfWeek);

    return (
        <div className="bg-white rounded-xl ml-auto shadow p-4">
            {/* Top bar */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-xl font-semibold">{lobby.name}</h1>
                    <p className="text-sm text-gray-500">Invite: {lobby.code}</p>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="date"
                        className="border rounded px-2 py-1"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                    />
                    <button
                        onClick={onLeave}
                        className="text-sm text-red-500"
                    >
                        Leave
                    </button>
                    <button
                        className="bg-green-500 text-white px-3 py-1 rounded"
                        onClick={() => setShowAvailabilityModal(true)}
                    >
                        Add Availability
                    </button>
                </div>
            </div>


            <div className="flex gap-4">
                <div className="w-1/4 flex flex-col gap-4">
                    <AvailabilityChart availability={availabilityForDay}
                    />
                    <EventList events={entries} />
                </div>
                <div className="w-1/4 flex flex-col gap-4">
                    <AvailabilityList availability={availabilityForDay} />
                </div>
                <div className="w-2/4">
                    <CalendarGrid
                        entries={entriesForSelectedDate}
                        onEmptySlotClick={setSelectedSlot}
                        onDelete={deleteEntry}
                    />
                </div>
            </div>

            {selectedSlot && (
                <AddEventModal
                    start={selectedSlot}
                    selectedDate={selectedDate}
                    onClose={() => setSelectedSlot(null)}
                    onAdd={addEntry}
                />
            )}

            {showAvailabilityModal && (
                <AddAvailabilityModal
                    onClose={() => setShowAvailabilityModal(false)}
                    onAdd={(entry) =>
                        setWeeklyAvailability(prev => [...prev, entry])
                    }
                />
            )}
        </div>
    );
}
