export default function aggregateToAisles(list) {
  const aggregated = {};

  for (const item of list) {
    const location = item.location;

    if (aggregated[location]) {
      aggregated[location].push(item);
    } else {
      aggregated[location] = [item];
    }
  }

  // Sort the locations with custom sorting function
  const sortedLocations = Object.keys(aggregated).sort((a, b) => {
    // Extract the numeric part of the location
    const aNumeric = parseInt(a, 10);
    const bNumeric = parseInt(b, 10);

    // If both locations are numeric, compare them directly
    if (!isNaN(aNumeric) && !isNaN(bNumeric)) {
      return aNumeric - bNumeric;
    }

    // If one location is numeric and the other is not, the numeric one comes first
    if (!isNaN(aNumeric)) {
      return -1;
    }
    if (!isNaN(bNumeric)) {
      return 1;
    }

    // If both locations are non-numeric, compare them as strings
    return a.localeCompare(b);
  });

  // Create a new object with sorted locations
  const sortedAggregated = {};
  for (const location of sortedLocations) {
    sortedAggregated[location] = aggregated[location];
  }

  return sortedAggregated;
}