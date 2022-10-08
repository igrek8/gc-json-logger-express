export function clone<T>(o: unknown): T {
  return o === undefined ? undefined : JSON.parse(JSON.stringify(o));
}
