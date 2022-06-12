import { Marker } from "../../../graphs"
import { ProcessedLogV1 } from "../../../types"

export const getPower = (log: ProcessedLogV1, firstMarker: Marker) => {
  const weight = log.weight || 0
  if (weight === 0) {
    return undefined
  }

  const peak = firstMarker ? firstMarker.y || 0 : 0
  const power = peak / weight

  if (!power) {
    return undefined
  }

  return Number(power).toFixed(2)
}
