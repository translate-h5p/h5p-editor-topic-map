import fc from "fast-check";
import { Position } from "../types/Position";
import { Size } from "../types/Size";
import { TopicMapItem } from "../types/TopicMapItem";
import {
  calculateXPercentage,
  calculateYPercentage,
  resizeItem,
  updateItem,
} from "./grid.utils";

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

describe(calculateXPercentage.name, () => {
  it("should calculate the x value's percentage of the total width", () => {
    const xValue = 10;
    const width = 100;

    const expectedPercentage = 10;
    const actualPercentage = calculateXPercentage(xValue, width);

    expect(actualPercentage).toBe(expectedPercentage);
  });
});

describe(calculateYPercentage.name, () => {
  it("should calculate the y value's percentage of the total height", () => {
    const xValue = 10;
    const height = 100;

    const expectedPercentage = 10;
    const actualPercentage = calculateYPercentage(xValue, height);

    expect(actualPercentage).toBe(expectedPercentage);
  });
});

describe(updateItem.name, () => {
  it("should find the item in the items list and update the position and size based on the grid's width and height", () => {
    const item = {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    };

    const items: Array<TopicMapItem> = [
      item,
      {
        id: "2",
        xPercentagePosition: 25,
        yPercentagePosition: 60,
        widthPercentage: 65,
        heightPercentage: 32,
      },
    ];

    const newPosition: Position = {
      x: 50,
      y: 100,
    };

    const newSize: Size = {
      width: 200,
      height: 200,
    };

    const width = 1000;
    const height = 1000;

    const expectedItem = {
      id: "1",
      xPercentagePosition: 5,
      yPercentagePosition: 10,
      widthPercentage: 20,
      heightPercentage: 20,
    };

    const actualItem = updateItem(items, item, width, height, {
      newPosition,
      newSize,
    });

    expect(actualItem).toEqual(expectedItem);
  });

  it("should update without changing the list, and without changing the item object itself", () => {
    const item = {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    };

    const items: Array<TopicMapItem> = [
      item,
      {
        id: "2",
        xPercentagePosition: 25,
        yPercentagePosition: 60,
        widthPercentage: 65,
        heightPercentage: 32,
      },
    ];

    const newPosition: Position = {
      x: 50,
      y: 100,
    };

    const newSize: Size = {
      width: 200,
      height: 200,
    };

    const width = 1000;
    const height = 1000;

    updateItem(items, item, width, height, { newPosition, newSize });

    expect(item).toEqual({
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    });

    expect(items[0]).toEqual({
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    });

    expect(items[1]).toEqual({
      id: "2",
      xPercentagePosition: 25,
      yPercentagePosition: 60,
      widthPercentage: 65,
      heightPercentage: 32,
    });
  });

  it("should be able to update only the size", () => {
    const item = {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    };

    const items: Array<TopicMapItem> = [
      item,
      {
        id: "2",
        xPercentagePosition: 25,
        yPercentagePosition: 60,
        widthPercentage: 65,
        heightPercentage: 32,
      },
    ];

    const newSize: Size = {
      width: 200,
      height: 200,
    };

    const width = 1000;
    const height = 1000;

    const expectedItem = {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 20,
      heightPercentage: 20,
    };

    const actualItem = updateItem(items, item, width, height, {
      newSize,
    });

    expect(actualItem).toEqual(expectedItem);
  });

  it("should be able to update only the position", () => {
    const item = {
      id: "1",
      xPercentagePosition: 25,
      yPercentagePosition: 20,
      widthPercentage: 10,
      heightPercentage: 10,
    };

    const items: Array<TopicMapItem> = [
      item,
      {
        id: "2",
        xPercentagePosition: 25,
        yPercentagePosition: 60,
        widthPercentage: 65,
        heightPercentage: 32,
      },
    ];

    const newPosition: Position = {
      x: 50,
      y: 100,
    };

    const width = 1000;
    const height = 1000;

    const expectedItem = {
      id: "1",
      xPercentagePosition: 5,
      yPercentagePosition: 10,
      widthPercentage: 10,
      heightPercentage: 10,
    };

    const actualItem = updateItem(items, item, width, height, {
      newPosition,
    });

    expect(actualItem).toEqual(expectedItem);
  });
});
