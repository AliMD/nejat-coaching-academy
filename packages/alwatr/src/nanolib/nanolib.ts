export * from '@alwatr/nanolib';

const trimSlashes = /* #__PURE__ */ /(?:^\/+|\/+$)/g;
const multipleSlashes = /* #__PURE__ */ /(?<!:)\/{2,}/g;

export function resolveUrl(...parts: string[]): string {
  const prefix = parts[0].indexOf('/') === 0 ? '/' : ''; // Add leading slash if the first part has it
  return prefix + parts
    .map((part) => part.replace(trimSlashes, '')) // Remove leading and trailing slashes
    .filter((part) => part) // Remove empty parts
    .join('/')
    .replace(multipleSlashes, '/'); // Replace multiple slashes with a single slash, except for protocol
}

// Examples
// console.log(resolveUrl('/', 'ali', 'v1')); // '/ali/v1'
// console.log(resolveUrl('/', '/ali/', '/v1')); // '/ali/v1'
// console.log(resolveUrl('https://domain.com', 'ali', 'v1')); // 'https://domain.com/ali/v1'
