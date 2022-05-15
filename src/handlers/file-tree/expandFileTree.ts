// Un-hides a hidden list group in the file tree, effectively expanding it
export const expandFileTree = (
  folderName: string,
  force: boolean | undefined = undefined
): void => {
  document
    .querySelector(`.listing__item[data-folder=${folderName}]`)
    // We need to take the opposite of the force parameter here, but only if force was actually passed in
    // This will ensure that toggle works correctly when being clicked as well as when the group was selected
    ?.classList.toggle(
      'listing__item--expanded',
      typeof force === 'boolean' ? !force : undefined
    );

  document
    .querySelector(`.listing__group[data-group=${folderName}]`)
    ?.classList.toggle('listing__group--hidden', force);
};
