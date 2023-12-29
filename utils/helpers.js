export const isTextEmpty = (text) => text === undefined || !text.trim();

export const parseIdFromResourcePath = (resourcePath) => resourcePath?.split('/')[1];
