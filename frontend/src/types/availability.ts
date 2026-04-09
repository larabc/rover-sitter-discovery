export enum DayOfWeek {
    Monday = 0,
    Tuesday = 1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday = 5,
    Sunday = 6
}
export interface AvailabilitySlot {
    start_time: string,
    end_time: string,
    day_of_week: DayOfWeek,
    id: number
}

export interface DateOverride {
    id: number,
    start_time: string | null,
    end_time: string | null,
    date: string,
    is_available: boolean,
}