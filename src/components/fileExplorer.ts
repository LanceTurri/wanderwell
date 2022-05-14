import { onExplorerItemClickHandler } from '../handlers/onExplorerItemClickHandler';
import { readableFileSize } from '../utils/readableFileSize';
import { underscorize } from '../utils/underscorize';

// Generates a <ul> element for every group of children from the file listing
//
// Example HTML output:
// <div class="explorer__listing-item explorer__listing-item--file">
//  <div class="explorer__listing-title explorer__item--primary">Videos</div>
//  <div class="explorer__listing-subtitle explorer__item--secondary">Today</div>
//  <div class="explorer__listing-subtitle explorer__item--secondary">48KB</div>
// </div>
export const generateFileExplorer = (
  fileListing: ITreeNode[]
): HTMLDivElement[] => {
  return fileListing.map((file) => _createExplorerItem(file));
};

const _createExplorerItem = (item: ITreeNode): HTMLDivElement => {
  const wrappingElement = document.createElement('div');
  wrappingElement.classList.add(
    'explorer__listing-item',
    `explorer__listing-item--${item.type}`
  );
  wrappingElement.setAttribute(`data-${item.type}`, underscorize(item.name));
  wrappingElement.setAttribute('data-name', item.name);
  wrappingElement.setAttribute('role', 'button');

  // Right now only folders need the click event to select that folder
  // If a file details page is ever added, update this click handler to support it.
  if (item.type === 'folder') {
    wrappingElement.addEventListener('click', onExplorerItemClickHandler);
  }

  // Content Elements
  const titleElement = document.createElement('div');
  titleElement.classList.add(
    'explorer__listing-title',
    'explorer__item--primary'
  );
  titleElement.innerText = item.name;

  const lastModifiedElement = document.createElement('div');
  lastModifiedElement.classList.add(
    'explorer__listing-subtitle',
    'explorer__item--secondary'
  );
  lastModifiedElement.innerText = item.modified.toLocaleDateString();

  const fileSizeElement = document.createElement('div');
  fileSizeElement.classList.add(
    'explorer__listing-subtitle',
    'explorer__item--secondary'
  );
  fileSizeElement.innerText = readableFileSize(item.size);

  wrappingElement.appendChild(titleElement);
  wrappingElement.appendChild(lastModifiedElement);
  wrappingElement.appendChild(fileSizeElement);

  return wrappingElement;
};

export default generateFileExplorer;
