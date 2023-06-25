export const getDateFromTimeStamp = (timestamp) => {
    const dateFormat = new Date(timestamp * 1000);
    const dateValue = dateFormat.getDate() +
        "/" + (dateFormat.getMonth() + 1) +
        "/" + dateFormat.getFullYear()
    return dateValue;
}