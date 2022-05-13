import { onStart } from './main';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).test = test; // instead of casting window to any, you can extend the Window interface: https://stackoverflow.com/a/43513740/5433572

document.addEventListener('DOMContentLoaded', function () {
  onStart();
});
