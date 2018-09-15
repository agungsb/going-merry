export function secondsToHms(d) {
  d = Number(d);
  const days = Math.floor(d / (3600 * 24));
  const hours = Math.floor(d / 3600);
  const minutes = Math.floor(d % 3600 / 60);
  const seconds = Math.floor(d % 3600 % 60);
  return {
    days,
    hours,
    minutes,
    seconds,
  }
}