import type { WeeklyAvailability } from "../util/types";

export default function AvailabilityChart({ availability }: { availability: WeeklyAvailability[] }) {
    // Counts users available at each 1/2 hour slot
    const slots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2,"0")}:00`);
    const slotCounts = slots.map(time => availability.filter(a => a.start <= time && a.end > time).length);

    return (
        <div className="bg-gray-50 p-2 rounded">
            <h2 className="font-semibold mb-2">User Availability</h2>

            {slots.map((time, idx) => (
                <div key={time} className="flex items-center mb-0.5">
                    <span className="w-12 text-xs">{time}</span>
                    <div className="flex-1 bg-gray-200 h-4 relative">
                        <div className="bg-green-400 h-4" style={{ width: `${Math.min(slotCounts[idx]*20,100)}%` }} />
                    </div>
                </div>
            ))}
        </div>
  );
}
