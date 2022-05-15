import getFileListing from './apis/getFileListing';
import generateFileExplorer from './components/fileExplorer';
import generateFileTree from './components/fileTree';
import { selectItem } from './handlers/file-tree/selectItem';
import { findTreeNode } from './utils/findTreeNode';

const kFileTreeElementId = 'file_tree';
const kFileExplorerElementId = 'file_explorer';

export const onReady = async (): Promise<void> => {
  console.log('Fetching file listing');
  const fileListing = await getFileListing();

  _populateFileTree(fileListing);
  _populateFileExplorer(fileListing);
  _createEventSubscriptions(fileListing);

  console.log('Initialization complete');
};

const _populateFileTree = (fileListing: ITreeNode[]) => {
  console.log('Generating file tree');
  const fileTree = generateFileTree(fileListing);
  const fileTreeElement = document.getElementById(kFileTreeElementId);

  if (fileTreeElement) {
    fileTreeElement.appendChild(fileTree);
  }
};

const _populateFileExplorer = (fileListing: ITreeNode[]) => {
  console.log('Generating file explorer');
  const fileExplorer = generateFileExplorer(fileListing);

  const fileExplorerElement = document
    .getElementById(kFileExplorerElementId)
    ?.querySelector('.explorer__listing') as HTMLDivElement;

  if (fileExplorerElement) {
    fileExplorerElement.replaceChildren(...fileExplorer);
  }
};

const _populateFolderTitle = (folderName: string) => {
  const titleElement = document
    .getElementById(kFileExplorerElementId)
    ?.querySelector('.explorer__title') as HTMLHeadingElement;
  titleElement.innerText = folderName;
};

const _createEventSubscriptions = (fileListing: ITreeNode[]) => {
  document.body.addEventListener(
    'item--selected',
    (event: CustomEventInit<IFolderCustomEvent>) => {
      if (!event.detail) {
        return;
      }

      const treeNode = findTreeNode(fileListing, event.detail.identifier);

      if (treeNode) {
        selectItem(event.detail.identifier);
        _populateFolderTitle(treeNode.name);
        _populateFileExplorer(treeNode.children ?? []);
      }
    }
  );
};
