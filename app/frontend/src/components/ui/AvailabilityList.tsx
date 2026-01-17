import type { WeeklyAvailability } from "../util/types";
import { getAvailableTimes } from "../util/getAvailableTimes";

export default function AvailabilityList({ availability }: { availability: WeeklyAvailability[] }) {
    const intersection = getAvailableTimes(availability);

    return (
        <div className="bg-gray-50 p-2 rounded">
            <h2 className="font-semibold mb-2">Today's availability:</h2>

            {/* List each user's availability */}
            {availability.length === 0 ? (
                <p className="text-sm text-gray-400">No availability added yet</p>
            ) : (
                <ul className="text-sm mb-2">
                {availability.map(a => (
                    <li key={a.id}>
                    {a.name}: {a.start}-{a.end}
                    </li>
                ))}
                </ul>
            )}

            {/* Intersection */}
            <h3 className="font-semibold mt-2 mb-1">Times everyone is available:</h3>
            {intersection.length === 0 ? (
                <p className="text-sm text-gray-500">No common times</p>
            ) : (
                <ul className="text-sm">
                {intersection.map((range,i) => (
                    <li key={i}>{range.start}-{range.end}</li>
                ))}
                </ul>
            )}
        </div>
    );
}
