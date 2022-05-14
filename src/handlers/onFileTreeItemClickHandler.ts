export const onFileTreeItemClickHandler = (event: MouseEvent): void => {
  const element = event.currentTarget as HTMLLIElement;

  if (!element) {
    console.log('FILE TREE CLICK HANDLER: No element was found on event');
    return;
  }

  const folderName = element.getAttribute('data-item');
  const displayName = element.getAttribute('data-name');

  if (!folderName || !displayName) {
    console.log(
      'FILE TREE CLICK HANDLER: No folderName or displayName was found'
    );
    return;
  }

  // Remove the previously selected item so that this one is the only one and
  // add the selected class to the event target
  document
    .querySelector('.listing__item--selected')
    ?.classList.remove('listing__item--selected');

  element.classList.toggle('listing__item--selected');

  // If the item has a list of children underneath it, toggle the hidden status
  document
    .querySelector(`.listing__group[data-folder=${folderName}]`)
    ?.classList.toggle('listing__group--hidden');

  // Finally dispatch a custom event to let the handlers know to update the page
  document.body.dispatchEvent(
    new CustomEvent<IFolderCustomEvent>('item--selected', {
      detail: {
        source: 'file-tree',
        identifier: folderName,
        displayName: displayName,
      },
    })
  );
};
