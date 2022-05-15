import buildTreeItem from './treeItem';

import { underscorize } from '../../utils/underscorize';

const buildTreeGroup = (
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
    const treeItem = buildTreeItem(folder);
    wrappingElement.appendChild(treeItem);

    // If the folder has children, and at least one of those children is a
    // folder, create a new group for it and the children.
    if (
      folder.children &&
      folder.children.some((child) => child.type === 'folder')
    ) {
      const treeGroup = buildTreeGroup(folder.children, folder.name);
      wrappingElement.appendChild(treeGroup);
    }
  });

  return wrappingElement;
};

export default buildTreeGroup;
