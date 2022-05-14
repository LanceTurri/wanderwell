import { readdirSync, statSync } from 'fs';

const basePath = '../../Pictures/__Desktops';

const files = readdirSync(basePath);
const fileData = files.map((file) => {
  const metadata = statSync(`${basePath}/${file}`);

  return {
    type: metadata.isDirectory() ? 'folder' : 'file',
    name: file.replace(basePath, ''),
    modified: metadata.ctime.toJSON(),
    size: metadata.size,
  };
});

console.log(fileData);
