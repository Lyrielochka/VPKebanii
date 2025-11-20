import axios from "axios";

const IMAGE_API_URL = "https://wmp.by/api/images";

let cachedImages = null;
let pendingRequest = null;

const normalizeImageList = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (typeof data === "string") {
    return data
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const buildImageUrl = (fileName) => {
  if (!fileName) return "";
  const sanitized = fileName.replace(/^\/+/, "").replace(/^Images\//i, "");
  return `https://wmp.by/Images/${sanitized}`;
};

export const getImageOptions = async () => {
  if (cachedImages) {
    return cachedImages;
  }

  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = axios
    .get(IMAGE_API_URL)
    .then((res) => normalizeImageList(res.data))
    .then((images) => {
      cachedImages = images;
      pendingRequest = null;
      return images;
    })
    .catch((err) => {
      pendingRequest = null;
      throw err;
    });

  return pendingRequest;
};
