import { onExpandItemHandler } from '../../handlers/onExpandItemHandler';
import { underscorize } from '../../utils/underscorize';

const buildExpandButton = (name: string): HTMLButtonElement => {
  const listingExpandElement = document.createElement('button');
  listingExpandElement.classList.add('listing__item-expand');
  listingExpandElement.type = 'button';
  listingExpandElement.innerText = '+';
  listingExpandElement.setAttribute('data-folder', underscorize(name));
  listingExpandElement.addEventListener('click', onExpandItemHandler);

  return listingExpandElement;
};

export default buildExpandButton;
