const displayNumber = (number: number): string => {
    if (number < 10) return `0${number}`;
    return String(number);
  }

export default function getFormattedDate(date: string | Date): string {
    const asDate = new Date(date);
    return `${displayNumber(asDate.getDate())}/${displayNumber(asDate.getMonth() + 1)}/${asDate.getFullYear()}`;
}
