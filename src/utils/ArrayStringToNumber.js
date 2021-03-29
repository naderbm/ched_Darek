export function StringToNumber(date) {
  return date.map(el => {
    return parseInt(el, 10);
  });
}
