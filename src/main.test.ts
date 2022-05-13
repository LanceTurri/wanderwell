import { onStart } from './main';

test('onStart', async () => {
  const result = await onStart();
  expect(result).toBe(true);
});
