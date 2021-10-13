/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5PObject, H5PEditorObject } from "../../H5P";

export const H5P: H5PObject = (window as any).H5P ?? {};
export const H5PEditor: H5PEditorObject = (window as any).H5PEditor ?? {};
export const t = H5PEditor.t.bind(null, "H5PEditor.TopicMap");
