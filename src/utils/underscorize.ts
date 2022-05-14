export const underscorize = (name: string): string => {
  return name.replace(/\s/g, '_').toLowerCase();
};
