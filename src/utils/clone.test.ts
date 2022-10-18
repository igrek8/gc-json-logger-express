import { clone } from './clone';

describe('clone', () => {
  it('deep clone object', () => {
    expect(clone(undefined)).toBe(undefined);
    expect(clone({ a: { b: 1 } })).toMatchObject({ a: { b: 1 } });
  });
});
