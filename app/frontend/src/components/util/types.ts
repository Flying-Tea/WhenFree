export type EntryType = "availability" | "event";

export interface CalendarEntry {
    id: string;
    name: string;
    title: string;
    type: EntryType;
    startTime: string; // ISO string
    endTime: string;   // ISO string
    date: string;      // ISO string
}

export interface Lobby {
    name: string;
    code: string;
}