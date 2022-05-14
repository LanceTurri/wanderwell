export const onExplorerItemClickHandler = (event: MouseEvent): void => {
  const element = event.currentTarget as HTMLDivElement;

  if (!element) {
    console.log('FILE EXPLORER CLICK HANDLER: No element was found on event');
    return;
  }

  const folderName = element.getAttribute('data-folder');
  const displayName = element.getAttribute('data-name');

  if (!folderName || !displayName) {
    console.log(
      'FILE EXPLORER CLICK HANDLER: No folderName or displayName was found'
    );
    return;
  }

  document.body.dispatchEvent(
    new CustomEvent<IFolderCustomEvent>('item--selected', {
      detail: {
        source: 'file-explorer',
        identifier: folderName,
        displayName: displayName,
      },
    })
  );
};
