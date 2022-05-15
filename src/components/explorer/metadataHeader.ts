const buildMetadataHeader = (): HTMLDivElement => {
  const metadataWrapper = document.createElement('div');
  metadataWrapper.classList.add('explorer__metadata');
  metadataWrapper.innerHTML = `
    <div class="explorer__metadata-item explorer__item--primary">
      File Name
    </div>
    <div class="explorer__metadata-item explorer__item--secondary">
      Modified
    </div>
    <div class="explorer__metadata-item explorer__item--secondary">
      Size
    </div>
  `;

  return metadataWrapper;
};

export default buildMetadataHeader;
