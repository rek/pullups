export const useClosestKnownWeight = ({
  user,
  logId
}) => {
  if (user === "adam") {
    return 95;
  }
  if (user === "anette") {
    return 67;
  }
  if (user === "j") {
    return 72;
  }
  return -1;
};
