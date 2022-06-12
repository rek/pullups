import { ProcessedLogV1 } from "../../../types"

export const getPullups = (log: ProcessedLogV1) => {
  return log.report.pullupCount
}
