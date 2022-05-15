const buildEmptyState = (): HTMLDivElement => {
  const wrappingElement = document.createElement('div');
  wrappingElement.classList.add('explorer__empty');

  const titleElement = document.createElement('h3');
  titleElement.classList.add('explorer__empty-title');
  titleElement.innerText = 'No files found!';

  const subtitleElement = document.createElement('p');
  subtitleElement.classList.add('explorer__empty-subtitle');
  subtitleElement.innerText = 'Try choosing a different folder in the sidebar.';

  wrappingElement.appendChild(titleElement);
  wrappingElement.appendChild(subtitleElement);

  return wrappingElement;
};

export default buildEmptyState;
