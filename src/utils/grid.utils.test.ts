import fc from "fast-check";
import { TopicMapItem } from "../types/TopicMapItem";
import { resizeItem } from "./grid.utils";

describe(resizeItem.name, () => {
  it("should scale the item down if the scale factor is lower than 1", () => {
    const item: TopicMapItem = {
      id: "test",
      xPercentagePosition: 10,
      yPercentagePosition: 10,
      widthPercentage: 20,
      heightPercentage: 20,
    };

    const scaleFactor = 0.5;

    const expectedItem: TopicMapItem = {
      id: "test",
      xPercentagePosition: 5,
      yPercentagePosition: 5,
      widthPercentage: 10,
      heightPercentage: 10,
    };

    const actualItem = resizeItem(item, scaleFactor);

    expect(actualItem).toEqual(expectedItem);
  });

  it("should scale the item down if the scale factor is greater than 1", () => {
    const item: TopicMapItem = {
      id: "test",
      xPercentagePosition: 10,
      yPercentagePosition: 10,
      widthPercentage: 20,
      heightPercentage: 20,
    };

    const scaleFactor = 2;

    const expectedItem: TopicMapItem = {
      id: "test",
      xPercentagePosition: 20,
      yPercentagePosition: 20,
      widthPercentage: 40,
      heightPercentage: 40,
    };

    const actualItem = resizeItem(item, scaleFactor);

    expect(actualItem).toEqual(expectedItem);
  });

  it("should do nothing if the scale factor is 1", () => {
    const item: TopicMapItem = {
      id: "test",
      xPercentagePosition: 10,
      yPercentagePosition: 10,
      widthPercentage: 20,
      heightPercentage: 20,
    };

    const scaleFactor = 1;

    const expectedItem: TopicMapItem = {
      id: "test",
      xPercentagePosition: 10,
      yPercentagePosition: 10,
      widthPercentage: 20,
      heightPercentage: 20,
    };

    const actualItem = resizeItem(item, scaleFactor);

    expect(actualItem).toEqual(expectedItem);
  });

  it("should handle any number", () =>
    fc.assert(
      fc.property(fc.double(), scaleFactor => {
        const item: TopicMapItem = {
          id: "test",
          xPercentagePosition: 10,
          yPercentagePosition: 10,
          widthPercentage: 20,
          heightPercentage: 20,
        };

        const expectedItem: TopicMapItem = {
          id: "test",
          xPercentagePosition: 10 * scaleFactor,
          yPercentagePosition: 10 * scaleFactor,
          widthPercentage: 20 * scaleFactor,
          heightPercentage: 20 * scaleFactor,
        };

        const actualItem = resizeItem(item, scaleFactor);

        expect(actualItem).toEqual(expectedItem);
      }),
      { verbose: true },
    ));
});
