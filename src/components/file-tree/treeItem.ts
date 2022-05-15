import { onSelectFolderHandler } from '../../handlers/onSelectFolderHandler';
import { underscorize } from '../../utils/underscorize';
import buildExpandButton from './expandButton';

const buildTreeItem = (item: ITreeNode): HTMLLIElement => {
  const listingItem = document.createElement('li');
  listingItem.classList.add('listing__item');
  listingItem.setAttribute('data-folder', underscorize(item.name));
  listingItem.setAttribute('data-name', item.name);
  listingItem.addEventListener('click', onSelectFolderHandler);

  const listingTextElement = document.createElement('span');
  listingTextElement.classList.add('listing__item-text');
  listingTextElement.innerText = item.name;

  listingItem.appendChild(listingTextElement);

  // Since the file tree only displays folders, an expand button is only needed
  // if at least one of the children is itself a folder
  if (item.children && item.children.some((item) => item.type === 'folder')) {
    listingItem.appendChild(buildExpandButton(item.name));
  }

  return listingItem;
};

export default buildTreeItem;
