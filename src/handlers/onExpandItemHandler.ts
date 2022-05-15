import { expandFileTree } from './file-tree/expandFileTree';

export const onExpandItemHandler = (event: MouseEvent): void => {
  // Prevent the event from bubbling up to prevent it from triggering the item selected event
  event.stopPropagation();

  const element = event.currentTarget as HTMLLIElement;

  if (!element) {
    console.log('EXPAND CLICK HANDLER: No element was found on event');
    return;
  }

  const folderName = element.getAttribute('data-folder');

  if (!folderName) {
    console.log('EXPAND CLICK HANDLER: No folderName was found');
    return;
  }

  expandFileTree(folderName);
};
