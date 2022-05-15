import { readdirSync, statSync } from 'fs';

// This is a simple script to return an ITreeNode[] based on a directory on the
// local filesystem. This is very useful to generate mock data to work with.
const basePath = '../../Pictures/__Desktops';

const files = readdirSync(basePath);
const fileData = files.map((file) => {
  const metadata = statSync(`${basePath}/${file}`);

  return {
    type: metadata.isDirectory() ? 'folder' : 'file',
    name: file.replace(basePath, ''),
    modified: metadata.ctime.getTime(),
    size: metadata.size,
  };
});

console.log(fileData);
