import buildEmptyState from './explorer/emptyState';
import buildExplorerItem from './explorer/explorerItem';
import buildMetadataHeader from './explorer/metadataHeader';

// Generates a <ul> element for every group of children from the file listing
// Also generates the header with column titles
//
// Example HTML output:
// <div class="explorer__filelist-item explorer__filelist-item--file">
//  <div class="explorer__filelist-title explorer__item--primary">Videos</div>
//  <div class="explorer__filelist-subtitle explorer__item--secondary">3/7/2020</div>
//  <div class="explorer__filelist-subtitle explorer__item--secondary">48KB</div>
// </div>
export const generateFileExplorer = (
  fileListing: ITreeNode[]
): HTMLDivElement[] => {
  if (fileListing.length === 0) {
    // Wrap this in an array to match the return type
    return [buildEmptyState()];
  }

  const fileListWrapper = document.createElement('div');
  fileListWrapper.classList.add('explorer__filelist');
  fileListWrapper.replaceChildren(
    ...fileListing.map((file) => buildExplorerItem(file))
  );

  // Return both the metadata header as well as the file list as two peer elements
  return [buildMetadataHeader(), fileListWrapper];
};

export default generateFileExplorer;
