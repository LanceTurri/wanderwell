// Returns a human readable filesize from an input of bytes
// Example: 1024 => 1kB
export const readableFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '--';
  }

  const suffixes = ['B', 'kB', 'MB', 'GB', 'TB'];
  const bytesConverted = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${Number((bytes / Math.pow(1024, bytesConverted)).toFixed(2)) * 1} ${
    suffixes[bytesConverted]
  }`;
};
