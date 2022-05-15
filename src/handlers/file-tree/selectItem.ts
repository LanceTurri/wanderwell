import { expandFileTree } from './expandFileTree';

export const selectItem = (folderName: string): void => {
  // Remove the previously selected item so that this one is the only one and
  // add the selected class to the event target
  document
    .querySelector('.listing__item--selected')
    ?.classList.remove('listing__item--selected');

  document
    .querySelector(`.listing__item[data-folder=${folderName}]`)
    ?.classList.toggle('listing__item--selected');

  // If an item in the file tree is selected, always attempt to expand the children group
  expandFileTree(folderName, false);
};
