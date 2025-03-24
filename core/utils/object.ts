export const merge = <T>(...objects: Record<string, unknown>[]): T => {
  return objects.reduce((result, source) => {
    for (const key of Object.keys(source)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      result[key] =
        sourceValue &&
        targetValue &&
        typeof sourceValue === 'object' &&
        typeof targetValue === 'object' &&
        !Array.isArray(sourceValue) &&
        !Array.isArray(targetValue)
          ? merge(
              { ...(targetValue as Record<string, unknown>) },
              sourceValue as Record<string, unknown>,
            )
          : sourceValue;
    }
    return result;
  }, {}) as T;
};

export const isDeepEqual = (
  // biome-ignore lint: we should expect a type different from object
  obj1: Record<string, unknown> | any,
  // biome-ignore lint: we should expect a type different from object
  obj2: Record<string, unknown> | any,
): boolean => {
  if (obj1 === obj2) return true;

  if (
    obj1 == null ||
    obj2 == null ||
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object'
  )
    return obj1 === obj2;

  if (obj1 instanceof Date && obj2 instanceof Date)
    return obj1.getTime() === obj2.getTime();

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    return obj1.every((item, index) => isDeepEqual(item, obj2[index]));
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(
    (key) => keys2.includes(key) && isDeepEqual(obj1[key], obj2[key]),
  );
};
