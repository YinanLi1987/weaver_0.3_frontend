export function matchField(
  target: string,
  data: Record<string, any>
): string | null {
  const normalizedTarget = target.trim().toLowerCase();
  const keys = Object.keys(data);

  return (
    keys.find((key) => key.trim().toLowerCase() === normalizedTarget) ?? null
  );
}
