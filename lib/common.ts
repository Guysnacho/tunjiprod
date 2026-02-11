export const isPresent = (str?: string) => {
  return str !== undefined && str !== "";
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
