import { onSelectFolderHandler } from '../../handlers/onSelectFolderHandler';
import { readableFileSize } from '../../utils/readableFileSize';
import { underscorize } from '../../utils/underscorize';

const buildExplorerItem = (item: ITreeNode): HTMLDivElement => {
  const wrappingElement = document.createElement('div');
  wrappingElement.classList.add(
    'explorer__filelist-item',
    `explorer__filelist-item--${item.type}`
  );
  wrappingElement.setAttribute(`data-${item.type}`, underscorize(item.name));
  wrappingElement.setAttribute('data-name', item.name);
  wrappingElement.setAttribute('role', 'button');

  // Right now only folders need the click event to select that folder
  // If a file details page is ever added, update this click handler to support it.
  if (item.type === 'folder') {
    wrappingElement.addEventListener('click', onSelectFolderHandler);
  }

  // Content Elements
  const titleElement = document.createElement('div');
  titleElement.classList.add(
    'explorer__filelist-title',
    'explorer__item--primary'
  );
  titleElement.innerText = item.name;

  const lastModifiedElement = document.createElement('div');
  lastModifiedElement.classList.add(
    'explorer__filelist-subtitle',
    'explorer__item--secondary'
  );
  lastModifiedElement.innerText = item.modified.toLocaleDateString();

  const fileSizeElement = document.createElement('div');
  fileSizeElement.classList.add(
    'explorer__filelist-subtitle',
    'explorer__item--secondary'
  );
  fileSizeElement.innerText = readableFileSize(item.size);

  wrappingElement.appendChild(titleElement);
  wrappingElement.appendChild(lastModifiedElement);
  wrappingElement.appendChild(fileSizeElement);

  return wrappingElement;
};

export default buildExplorerItem;
