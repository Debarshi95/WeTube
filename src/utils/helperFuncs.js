export const toCamelCase = (str = '') => str.charAt(0).toLowerCase() + str.slice(1);

export const setLocalStorageData = (key, data, removePrevious = false) => {
  const dataExists = JSON.parse(localStorage.getItem(key));

  if (removePrevious && dataExists) {
    localStorage.removeItem(key);
  }
  localStorage.setItem(key, JSON.stringify(data));
};

export const deleteLocalStorageData = (key) => {
  localStorage.removeItem(key);
};

export const getLocalStorageData = (key = '') => {
  return JSON.parse(localStorage.getItem(key));
};

export const formatErrorMsg = (err) => {
  const message = Array.isArray(err) ? err?.[0]?.message : err?.message;
  return message;
};

export const isVideoLiked = (likes = [], userId = '') => {
  return likes?.find((like) => like?.user?.id === userId) || false;
};

export const addedToWatchLater = (watchLater = [], userId = '') => {
  let isAdded = false;
  watchLater?.forEach((watch) => {
    if (watch?.user?.id === userId) {
      isAdded = true;
    }
  });
  return isAdded;
};
