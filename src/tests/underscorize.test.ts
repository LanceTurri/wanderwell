import { underscorize } from '../utils/underscorize';

test('properly returns underscore in string with spaces', () => {
  const output = underscorize('string with spaces');

  expect(output).toBe('string_with_spaces');
});

test('properly lowercases string', () => {
  const output = underscorize('string With CAPITALS');

  expect(output).toBe('string_with_capitals');
});

test('properly handles string with underscores', () => {
  const output = underscorize('string_with_underscores');

  expect(output).toBe('string_with_underscores');
});

test('properly handles empty string', () => {
  const output = underscorize('');

  expect(output).toBe('');
});
