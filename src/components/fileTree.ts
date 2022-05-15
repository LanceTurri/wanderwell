import { onSelectFolderHandler } from '../handlers/onSelectFolderHandler';
import { onExpandItemHandler } from '../handlers/onExpandItemHandler';
import { underscorize } from '../utils/underscorize';

// Generates a <ul> element for every group of children from the file listing
//
// Example HTML output:
// <ul class="listing__group" data-group="root">
//   <li class="listing__item" data-folder="my_files">My Files</li>
//   <ul class="listing__group" data-group="my_files">
//     <li class="listing__item">Documents</li>
//     <li class="listing__item">Photos</li>
//     <li class="listing__item">Videos</li>
//   </ul>
// </ul>
const generateFileTree = (fileListing: ITreeNode[]): HTMLUListElement => {
  // The first tree group will have an id of root to denote it is at the top of the hierarchy
  return _createTreeGroup(fileListing, 'root', false);
};

const _createTreeGroup = (
  children: ITreeNode[],
  id: string,
  isHidden = true
): HTMLUListElement => {
  // The file tree should only contain folders, so filter them out here prior to generating the tree.
  const childFolders = children.filter((item) => item.type === 'folder');

  const wrappingElement = document.createElement('ul');
  wrappingElement.classList.add('listing__group');
  wrappingElement.setAttribute('data-group', underscorize(id));

  if (isHidden) {
    wrappingElement.classList.add('listing__group--hidden');
  }

  childFolders.forEach((folder) => {
    const treeItem = _createTreeItem(folder);
    wrappingElement.appendChild(treeItem);

    // If the folder has children, and at least one of those children is a folder, generate a new listing for it
    if (
      folder.children &&
      folder.children.some((child) => child.type === 'folder')
    ) {
      const treeGroup = _createTreeGroup(folder.children, folder.name);
      wrappingElement.appendChild(treeGroup);
    }
  });

  return wrappingElement;
};

const _createTreeItem = (item: ITreeNode): HTMLLIElement => {
  const listingItem = document.createElement('li');
  listingItem.classList.add('listing__item');
  listingItem.setAttribute('data-folder', underscorize(item.name));
  listingItem.setAttribute('data-name', item.name);
  listingItem.addEventListener('click', onSelectFolderHandler);

  const listingTextElement = document.createElement('span');
  listingTextElement.classList.add('listing__item-text');
  listingTextElement.innerText = item.name;

  listingItem.appendChild(listingTextElement);

  if (item.children && item.children.some((item) => item.type === 'folder')) {
    listingItem.appendChild(_createExpandButton(item.name));
  }

  return listingItem;
};

const _createExpandButton = (name: string): HTMLButtonElement => {
  const listingExpandElement = document.createElement('button');
  listingExpandElement.classList.add('listing__item-expand');
  listingExpandElement.type = 'button';
  listingExpandElement.innerText = '+';
  listingExpandElement.setAttribute('data-folder', underscorize(name));
  listingExpandElement.addEventListener('click', onExpandItemHandler);

  return listingExpandElement;
};

export default generateFileTree;
