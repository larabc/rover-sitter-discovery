export const timeStringToDate = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));
    date.setSeconds(0);
    return date;
}
export const toTimeString = (input: number | Date): string => {
    if (input instanceof Date) {
        const hours = input.getHours().toString().padStart(2, '0')
        const minutes = input.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}:00`
    }
    return input.toString().padStart(2, '0') + ':00:00'
}