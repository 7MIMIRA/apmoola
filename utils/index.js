module.exports = {
  // arguments must be in milliseconds, returns true if event falls within window start and end times inclusive
  isWithinTimeWindow: (windowStart, windowEnd, eventStart, eventEnd) => {
    return windowStart <= eventStart && windowEnd >= eventEnd;
  }
}