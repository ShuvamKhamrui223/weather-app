export const formatTime = (time: number): string => {
    return new Date(time * 1000).toLocaleTimeString(
        navigator.language ?? "en-us",
        { hour: "2-digit", minute: "2-digit" }
    )
}

export const formatNumber = (formatableNumber: number | bigint, formatStyle: "decimal" | "currency" | "percent" | "unit", formatedUnit: string): string => {
    const numberFormatOptions: Intl.NumberFormatOptions = {
        style: formatStyle
    }

    if (formatStyle == "unit" && formatedUnit) {
        numberFormatOptions.unit = formatedUnit;
        numberFormatOptions.unitDisplay = "short"
    }
    return new Intl.NumberFormat(navigator.language ?? 'en-us', numberFormatOptions).format(formatableNumber)
}

export const displayTimeWithOffset = (offsetInSeconds: number): string => {

    // Get the current UTC time
    const now = new Date();
    const utcTime = now.getTime();
    // Adjust for the timezone offset in seconds
    const targetTime = new Date(utcTime + offsetInSeconds * 1000);

    // Manually format the target time
    const hours = targetTime.getUTCHours();
    const minutes = targetTime.getUTCMinutes();

    // Return time in HH:mm:ss format
    return `${hours.toString()}:${minutes
        .toString()
        } ${targetTime.getUTCHours() > 12 ? "pm" : "am"}`;
};