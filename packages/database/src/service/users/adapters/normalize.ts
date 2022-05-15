import { User } from "../types";

export const normalizeUser = (id: string, result: User): User => {
  return {
    id: result.id,
    name: id,
    displayName: result.displayName,
    active: result.active,
    weight: result.weight,
    displayWeight: result.weight
      ? Number(result.weight.toFixed(1))
      : result.weight,
    weightLastUpdated: result.weightLastUpdated,
  };
};
