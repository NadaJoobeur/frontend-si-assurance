// src/shared/stores/previewStore.ts

let previewUrl: string | null = null;

export const getPreviewUrl = () => previewUrl;
export const setPreviewUrl = (url: string | null) => {
  previewUrl = url;
};
