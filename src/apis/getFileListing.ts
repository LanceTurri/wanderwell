import { fileListing } from '../mocks/fileListing';

const getFileListing = async (): Promise<ITreeNode[]> => {
  const fileJson: ITreeNode[] = JSON.parse(fileListing, (key, value) => {
    // If this is the modified date, parse the string into a Date object
    if (key === 'modified') {
      return new Date(value);
    }

    return value;
  });

  return Promise.resolve(fileJson);
};

export default getFileListing;
