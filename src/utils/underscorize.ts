// Returns the input with all spaces replaced with underscores and lowercased
// Example: "My Files" => my_files
export const underscorize = (name: string): string => {
  return name.replace(/\s/g, '_').toLowerCase();
};
