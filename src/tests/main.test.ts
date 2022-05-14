import { onReady } from '../main';

test('onStart', async () => {
  const result = await onReady();

  expect(result).toBeCalled();
});
