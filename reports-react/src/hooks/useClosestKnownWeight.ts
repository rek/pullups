export const useClosestKnownWeight = ({
  user,
  logId,
}: {
  user: string;
  logId: string;
}) => {
  // @TODO:

  if (user === "adam") {
    return 97; // make dynamic
  }
  if (user === "anette") {
    return 67; // make dynamic
  }
  if (user === "j") {
    return 61; // make dynamic
  }

  return -1;
};
