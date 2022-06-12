export const useClosestKnownWeight = ({
  user,
  logId,
}: {
  user: string;
  logId: string;
}) => {
  // @TODO: use hook to get last from weight report

  if (user === "adam") {
    return 95 // make dynamic
  }
  if (user === "anette") {
    return 67 // make dynamic
  }
  if (user === "j") {
    return 72 // make dynamic
  }

  return -1
}
