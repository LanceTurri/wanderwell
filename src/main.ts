export const onStart = async (): Promise<boolean> => {
  setTimeout(() => {
    console.log('done');
  }, 1000);

  return true;
};
