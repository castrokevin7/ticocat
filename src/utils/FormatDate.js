const displayNumber = (number) => {
    if (number < 10) return `0${number}`;
    return number;
  }

export default function getFormattedDate(date) {
    const asDate = new Date(date);
    return `${displayNumber(asDate.getDate())}/${displayNumber(asDate.getMonth() + 1)}/${asDate.getFullYear()}`;
}