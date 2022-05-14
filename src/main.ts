import getFileListing from './apis/getFileListing';
import generateFileExplorer from './components/fileExplorer';
import generateFileTree from './components/fileTree';
import { findTreeNode } from './utils/findTreeNode';

const kFileTreeElementId = 'file_tree';
const kFileExplorerElementId = 'file_explorer';

export const onReady = async (): Promise<void> => {
  console.log('Fetching file listing');
  const fileListing = await getFileListing();

  _scaffoldFileTree(fileListing);
  _scaffoldFileExplorer(fileListing);
  _createEventSubscriptions(fileListing);

  console.log('Initialization complete');
};

const _scaffoldFileTree = (fileListing: ITreeNode[]) => {
  console.log('Generating file tree');
  const fileTree = generateFileTree(fileListing);
  const fileTreeElement = document.getElementById(kFileTreeElementId);

  if (fileTreeElement) {
    fileTreeElement.appendChild(fileTree);
  }
};

const _scaffoldFileExplorer = (fileListing: ITreeNode[]) => {
  console.log('Generating file explorer');
  const fileExplorer = generateFileExplorer(fileListing);

  const fileExplorerElement = document
    .getElementById(kFileExplorerElementId)
    ?.querySelector('.explorer__listing') as HTMLDivElement;

  if (fileExplorerElement) {
    fileExplorerElement.replaceChildren(...fileExplorer);
  }
};

const _updateFolderTitle = (folderName: string) => {
  const titleElement = document
    .getElementById(kFileExplorerElementId)
    ?.querySelector('.explorer__title') as HTMLHeadingElement;
  titleElement.innerText = folderName;
};

const _createEventSubscriptions = (fileListing: ITreeNode[]) => {
  document.body.addEventListener(
    'item--selected',
    (event: CustomEventInit<IFolderCustomEvent>) => {
      const treeNode = findTreeNode(
        fileListing,
        event.detail?.identifier ?? ''
      );

      if (treeNode) {
        _updateFolderTitle(treeNode.name);
        _scaffoldFileExplorer(treeNode.children ?? []);
      }
    }
  );
};
