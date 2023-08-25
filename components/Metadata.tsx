import { IDatasetCoverage } from "../lib/types"
import { Badge } from "./wrapped";



type FrequencyBadgeProps = {
  coverage?: IDatasetCoverage
}

export function FrequencyBadge({ coverage }: FrequencyBadgeProps) {
  if (!coverage || !coverage.frequency || coverage.frequency == 'unknown') {
    return null;
  }
  if (coverage.frequency == 'never') {
    return <Badge bg="warning">not updated</Badge>
  }
  return <Badge bg="light">updated {coverage.frequency}</Badge>
}
