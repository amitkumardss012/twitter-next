export function extractMonthAndYearFromDate(dateString: string): { month: string; year: string } {
    const date = new Date(dateString); // Parse the date string
    const month = date.toLocaleString('default', { month: 'long' }); // Extract the full month name
    const year = String(date.getFullYear()); // Extract the year and convert it to string

    return { month, year };
}
