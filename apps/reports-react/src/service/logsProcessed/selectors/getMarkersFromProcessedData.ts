import type { LogReport, Marker } from "detect-pullups"

export const getMarkersFromProcessedData = (processedLogData: LogReport) => {
  let processedMarkers: Marker[] = []

  if (processedLogData && processedLogData.items.length > 0) {
    processedMarkers =
      processedLogData.items.flatMap((pullup) => {
        // console.log("pullup", pullup);
        return pullup.markers || []
      }) || []
    // console.log("processedMarkers", processedMarkers);
  }

  return processedMarkers
}
