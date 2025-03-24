/**
Returns a list of keys from an object, correctly typed.
@param obj - The object from which to get the keys.
@returns A list of keys from the object. */

export const keys = <T extends object>(obj: T): (keyof T)[] => {
  return Object.keys(obj) as (keyof T)[];
};
