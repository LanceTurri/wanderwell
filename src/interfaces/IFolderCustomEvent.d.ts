interface IFolderCustomEvent {
  source: 'file-explorer' | 'file-tree';
  identifier: string;
  displayName: string;
}
