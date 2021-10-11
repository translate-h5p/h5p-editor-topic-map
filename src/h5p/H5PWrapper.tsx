import * as React from "react";
import * as ReactDOM from "react-dom";
import { IH5PEditorWrapper } from "../../H5P";
import App from "../App";
import { H5PField } from "../types/h5p/H5PField";
import { H5PForm } from "../types/h5p/H5PForm";
import { H5PSetValue } from "../types/h5p/H5PSetValue";
import { Params } from "../types/h5p/Params";
import { H5P } from "./H5P.util";

export class H5PWrapper
  extends H5P.EventDispatcher
  implements IH5PEditorWrapper
{
  private wrapper: HTMLElement;

  constructor(
    parent: H5PForm,
    semantics: H5PField,
    params: Params,
    setValue: H5PSetValue,
  ) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    // Intentional log.
    // TODO: Remove this before official release
    console.info({
      field: JSON.stringify(semantics),
      params,
    });

    ReactDOM.render(
      <App
        setValue={setValue}
        semantics={semantics}
        params={params}
        parent={parent}
        topicMapItems={params?.topicMapItems ?? []}
      />,
      this.wrapper,
    );
  }

  appendTo([containerElement]: JQuery<HTMLElement>): void {
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-topic-map");
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
