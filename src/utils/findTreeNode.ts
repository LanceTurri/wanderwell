import { underscorize } from './underscorize';

export const findTreeNode = (
  fileListing: ITreeNode[],
  identifier: string
): ITreeNode | undefined => {
  for (const node of fileListing) {
    if (underscorize(node.name) === identifier) {
      return node;
    }

    if (node.children) {
      const matchedNode = findTreeNode(node.children, identifier);

      if (matchedNode) {
        return matchedNode;
      }
    }
  }

  return;
};
