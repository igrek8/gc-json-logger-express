export function clone<T>(o: unknown): T {
  return JSON.parse(JSON.stringify(o));
}
