import { ProcessedLogV1 } from "../../../types"

export const getWeight = (log: ProcessedLogV1) => {
  if (log.weight) {
    return log.weight.toFixed(2)
  }

  return undefined
}
