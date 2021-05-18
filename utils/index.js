module.exports = {
  isWithinTimeWindow: (windowStart, windowEnd, eventStart, eventEnd) => {
    return windowStart <= eventStart && windowEnd >= eventEnd;
  }
}