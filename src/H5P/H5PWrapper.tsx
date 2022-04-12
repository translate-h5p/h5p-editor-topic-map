import * as React from "react";
import { createRoot } from "react-dom/client";
import { IH5PEditorWrapper } from "../../H5P";
import { App } from "../App";
import { H5PFieldGroup } from "../types/H5P/H5PField";
import { H5PForm } from "../types/H5P/H5PForm";
import { H5PSetValue } from "../types/H5P/H5PSetValue";
import { Params } from "../types/H5P/Params";
import { H5P } from "./H5P.util";

export class H5PWrapper
  extends H5P.EventDispatcher
  implements IH5PEditorWrapper
{
  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PFieldGroup,
    params: Params,
    setValue: H5PSetValue,
  ) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    const root = createRoot(this.wrapper);
    root.render(
      <App
        setValue={newParams => setValue(semantics, newParams)}
        semantics={semantics}
        initialParams={params}
        parent={parent}
      />,
    );
  }

  appendTo($container: JQuery<HTMLElement>): void {
    const containerElement = $container.get(0);
    if (!containerElement) {
      console.error(
        "Found no containing element to attach `h5p-editor-topic-map` to.",
      );
      return;
    }

    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-editor-topic-map");
  }

  validate(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove(): void {}

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
