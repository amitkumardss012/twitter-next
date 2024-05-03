import moment from "moment";

export function formatDate(date: string){
    return moment(date).fromNow()
}


export function extractTime(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    return timeString;
}


export function extractDateWithMonthName(dateTimeString: string) {
   // Parse the date-time string into a Date object
    const date = new Date(dateTimeString);
    
    // Create an array with the three-letter abbreviations of the months
    const monthAbbreviations = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Extract the year, month, and day
    const fullYear = date.getUTCFullYear();
    const lastTwoDigitsOfYear = fullYear % 100; // Get last two digits of the year
    const monthIndex = date.getUTCMonth();
    const monthName = monthAbbreviations[monthIndex];
    const day = date.getUTCDate();
    
    // Format the date as a string in the format "MonthAbbr DD, YY"
    const dateString = ` ${String(day).padStart(2, '0')} ${monthName} ${String(lastTwoDigitsOfYear).padStart(2, '0')}`;
    
    // Return the formatted date string
    return dateString;
}