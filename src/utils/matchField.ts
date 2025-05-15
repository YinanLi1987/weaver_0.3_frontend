export function matchField<T extends Record<string, any>>(
  target: string,
  object: T
): string | undefined {
  return Object.keys(object).find(
    (key) => key.toLowerCase() === target.toLowerCase()
  );
}
