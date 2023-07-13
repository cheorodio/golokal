import { expect, test } from '@jest/globals';
import { capitaliseName } from '../../app/[username]/capitalisedName';

const capitalise = 'michelle';

test('capitalize the first letter', () => {
  const result = capitaliseName(capitalise);
  expect(result).toBe('Michelle');
});
