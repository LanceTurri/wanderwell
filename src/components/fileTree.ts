import buildTreeGroup from './file-tree/treeGroup';

// Generates a <ul> element for every group of children from the file listing
//
// Example HTML output:
// <ul class="listing__group" data-group="root">
//   <li class="listing__item" data-folder="my_files">My Files</li>
//   <ul class="listing__group" data-group="my_files">
//     <li class="listing__item">
//       <span class="listing__item-text">Documents</span>
//     </li>
//     <li class="listing__item">
//       <span class="listing__item-text">Music</span>
//     </li>
//     <li class="listing__item">
//       <span class="listing__item-text">Photos</span>
//     </li>
//   </ul>
// </ul>
const generateFileTree = (fileListing: ITreeNode[]): HTMLUListElement => {
  // The first tree group will have an id of root to denote it is at the top of the hierarchy
  return buildTreeGroup(fileListing, 'root', false);
};

export default generateFileTree;
