export const domainValidation = (domain) => {
  const domainRegex = /^https?:\/\/[a-zA-Z0-9.-]+\.(com)$/;
  return domainRegex.test(domain);
};
