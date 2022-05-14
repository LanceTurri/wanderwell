import { readableFileSize } from '../utils/readableFileSize';

test('properly handles 0 as an input', () => {
  expect(readableFileSize(0)).toBe('--');
});

test('properly outputs value in bytes', () => {
  expect(readableFileSize(1023)).toBe('1023 B');
});

test('properly outputs value in kilobytes', () => {
  expect(readableFileSize(1024)).toBe('1 kB');
  expect(readableFileSize(10240)).toBe('10 kB');
  expect(readableFileSize(102400)).toBe('100 kB');
  expect(readableFileSize(1024000)).toBe('1000 kB');
});

test('properly outputs value in megabytes', () => {
  expect(readableFileSize(12345678)).toBe('11.77 MB');
});

test('properly outputs value in gigabytes', () => {
  expect(readableFileSize(1234567890)).toBe('1.15 GB');
});

test('properly outputs value in terabytes', () => {
  expect(readableFileSize(1234567891230)).toBe('1.12 TB');
});
