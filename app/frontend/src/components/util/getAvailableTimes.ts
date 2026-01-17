import type { WeeklyAvailability } from "../util/types";

export function getAvailableTimes(availability: WeeklyAvailability[]) {
    if (availability.length === 0) return [];

    const slots = Array.from({ length: 24 * 2 }, (_, i) => {
        const hour = Math.floor(i / 2);
        const min = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2,"0")}:${min}`;
    });


    const users = Array.from(new Set(availability.map(a => a.name)));

    // For each slot, check if all users are available
    const intersection: string[] = slots.filter(slot =>
        users.every(user => 
            availability.some(a => a.name === user && a.start <= slot && a.end > slot)
        )
    );

    // Group consecutive slots into ranges
    const ranges: { start: string; end: string }[] = [];
    let rangeStart: string | null = null;

    intersection.forEach((slot, i) => {
        const nextSlot = intersection[i + 1];
        if (!rangeStart) rangeStart = slot;

        const [h1,m1] = slot.split(":").map(Number);
        const [h2,m2] = nextSlot?.split(":").map(Number) ?? [];
        const slotTime = h1*60 + m1;
        const nextTime = h2*60 + m2;

        if (nextTime !== slotTime + 30) {
            ranges.push({ start: rangeStart, end: slot });
            rangeStart = null;
        }
    });

    return ranges;
}
