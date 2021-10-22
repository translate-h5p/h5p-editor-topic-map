/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5PObject, H5PEditorObject } from "../../H5P";
import type { libraryStrings } from "../../language/en.json";

export const H5P: H5PObject = (window as any).H5P ?? {};
export const H5PEditor: H5PEditorObject = (window as any).H5PEditor ?? {};
export const t: (
  key: keyof typeof libraryStrings,
  vars?: Record<string, string> | undefined,
) => string = H5PEditor.t.bind(null, "H5PEditor.TopicMap");

/**
 * Get absolute path to image from relative parameters path
 *
 * @param path Relative path as found in content parameters
 * @returns Absolute path to image
 */
export const getAbsoluteUrlFromRelativePath = (path: string): string => {
  return H5P.getPath(path, H5PEditor.contentId);
};

export const getImageUrl = (imagePath: string | undefined): string | null => {
  if (!imagePath) {
    return null;
  }

  const imagePathIsAbsolute =
    imagePath.startsWith("http://") || imagePath.startsWith("https://");

  const imageUrl = imagePathIsAbsolute
    ? imagePath
    : getAbsoluteUrlFromRelativePath(imagePath);

  return imageUrl;
};
