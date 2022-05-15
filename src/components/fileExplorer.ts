import { onSelectFolderHandler } from '../handlers/onSelectFolderHandler';
import { readableFileSize } from '../utils/readableFileSize';
import { underscorize } from '../utils/underscorize';

// Generates a <ul> element for every group of children from the file listing
// Also generates the header with column titles
//
// Example HTML output:
// <div class="explorer__filelist-item explorer__filelist-item--file">
//  <div class="explorer__filelist-title explorer__item--primary">Videos</div>
//  <div class="explorer__filelist-subtitle explorer__item--secondary">Today</div>
//  <div class="explorer__filelist-subtitle explorer__item--secondary">48KB</div>
// </div>
export const generateFileExplorer = (
  fileListing: ITreeNode[]
): HTMLDivElement[] => {
  if (fileListing.length === 0) {
    return [_createEmptyState()];
  }

  const fileListWrapper = document.createElement('div');
  fileListWrapper.classList.add('explorer__filelist');
  fileListWrapper.replaceChildren(
    ...fileListing.map((file) => _createExplorerItem(file))
  );

  // Return both the metadata header as well as the file list as two peer elements
  return [_createMetadataHeader(), fileListWrapper];
};

const _createExplorerItem = (item: ITreeNode): HTMLDivElement => {
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

const _createMetadataHeader = (): HTMLDivElement => {
  const metadataWrapper = document.createElement('div');
  metadataWrapper.classList.add('explorer__metadata');
  metadataWrapper.innerHTML = `
    <div class="explorer__metadata-item explorer__item--primary">
      File Name
    </div>
    <div class="explorer__metadata-item explorer__item--secondary">
      Modified
    </div>
    <div class="explorer__metadata-item explorer__item--secondary">
      Size
    </div>
  `;

  return metadataWrapper;
};

const _createEmptyState = () => {
  const wrappingElement = document.createElement('div');
  wrappingElement.classList.add('explorer__empty');

  const titleElement = document.createElement('h3');
  titleElement.classList.add('explorer__empty-title');
  titleElement.innerText = 'No files found!';

  const subtitleElement = document.createElement('p');
  titleElement.classList.add('explorer__empty-subtitle');
  subtitleElement.innerText = 'Try choosing a different folder in the sidebar.';

  wrappingElement.appendChild(titleElement);
  wrappingElement.appendChild(subtitleElement);

  return wrappingElement;
};

export default generateFileExplorer;
