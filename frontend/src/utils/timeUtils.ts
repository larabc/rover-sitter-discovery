export const timeStringToDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    return date;
}

export const hoursToTimeString = (hours: number): string => {
    return hours.toString().padStart(2, '0') + ':00:00'
}

export const dateToTimeString = (date: Date): string => {
    return date.getHours().toString().padStart(2, '0') + ':00:00'
}

//TODO: unify this similar functions