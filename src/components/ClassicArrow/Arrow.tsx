import * as React from "react";
import { ArrowType } from "../../types/ArrowType";
import { ArrowDirection } from "../../types/ArrowDirection";
import { Position } from "../../types/Position";
import { Size } from "../../types/Size";
import {
  ArrowBody,
  ArrowBodyVertical,
  ArrowHead,
  ArrowHeadVertical,
  MirroredArrowHead,
  MirroredArrowHeadVertical,
} from "../ClassicArrowParts/ArrowParts";
import styles from "./Arrow.module.scss";
import { ClassicArrowItemType } from "../../types/ClassicArrowItemType";

export type ClassicArrowProps = {
  type: ArrowType;
  direction: ArrowDirection;
  cellSize: number;
  gapSize: number;
  item: ClassicArrowItemType;
};

const directionClassNames = {
  [ArrowDirection.Up]: styles.pointUp,
  [ArrowDirection.Down]: styles.pointDown,
  [ArrowDirection.Left]: styles.pointLeft,
  [ArrowDirection.Right]: styles.pointRight,
} as const;

const closestDivisor = (n: number, m: number):number => {
    // eslint-disable-next-line radix
    const q = Math.floor(n / m);
     
    // 1st possible closest number
    const n1 = m * q;
     
    // 2nd possible closest number
    const n2 = (n * m) > 0 ?
        (m * (q + 1)) : (m * (q - 1));
     
    // if true, then n1 is the
    // required closest number
    if (Math.abs(n - n1) < Math.abs(n - n2))
        return n1;
     
    // else n2 is the required
    // closest number
    return n2;
}

const snapToGrid = (position: Position, offsetLeft: number, offsetTop: number, cellSize: number, gapSize: number):Position => {
  const {x,y} = position;
  
  return {
    x: closestDivisor(x, cellSize + gapSize),
    y: closestDivisor(y, cellSize + gapSize) - 8,
  };
}

// TODO: Share code with h5p-topic-map instead of duplicating
export const ClassicArrow: React.FC<ClassicArrowProps> = ({
  item,
  type,
  direction,
  cellSize,
  gapSize,
}) => {
  const isHorizontal =
    Math.abs(item.startPosition.x - item.endPosition.x) > Math.abs(item.startPosition.y - item.endPosition.y);

  const classNames = `${styles.arrow} ${directionClassNames[direction]}`;

  const transform = isHorizontal
    ? `translateY(-${gapSize / 2}px)`
    : `translateX(-${gapSize / 2}px)`;

  const style: Size = isHorizontal
    ? {
        width: Math.abs(item.startPosition.x - item.endPosition.x),
        height: cellSize + gapSize,
      }
    : {
        height: Math.abs(item.endPosition.y - item.startPosition.y),
        width: cellSize + gapSize,
      };

  const gridElement = document.querySelector("div[role=application]") as HTMLElement;
  
  const offsetLeft = gridElement.offsetLeft + (gridElement.offsetParent as HTMLElement).offsetLeft; ;
  const offsetTop = gridElement.offsetTop + (gridElement.offsetParent as HTMLElement).offsetTop; ;

  const viewBox = `${offsetLeft} ${offsetTop} ${gridElement.clientWidth - gridElement.offsetLeft} ${gridElement.clientHeight - gridElement.offsetTop}`;

  // const endElement = document.getElementById(item.endElementId) as HTMLElement;
  // eslint-disable-next-line no-console
  // const pathDef = `M ${item.startPosition.x- offsetLeft} ${item.startPosition.y-offsetTop} L ${item.endPosition.x-offsetLeft} ${item.endPosition.y-offsetTop}`;
  // const startPos = snapToGrid(item.startPosition, 0, 0, cellSize, gapSize);
  // const endPos = snapToGrid(item.endPosition, 0, 0, cellSize, gapSize);
  // const pathDef = `M ${item.startPosition.x} ${item.startPosition.y} L ${item.endPosition.x} ${item.endPosition.y}`;


  const startPos = {x: (item.startGridPosition.x - 0.5) * (cellSize + gapSize), y: (item.startGridPosition.y -0.5 ) * (cellSize + gapSize)};
  // eslint-disable-next-line no-nested-ternary
  const xAdjust = isHorizontal && item.startGridPosition.x <= item.endGridPosition.x ? -1.75 : isHorizontal ? 0.5: -0.5;
  // eslint-disable-next-line no-nested-ternary
  const yAdjust = isHorizontal ? -0.5 : item.startGridPosition.y <= item.endGridPosition.y ? -1.75 : 0.5;
  const endPos = {x: (item.endGridPosition.x + xAdjust) * (cellSize + gapSize), y: (item.endGridPosition.y + yAdjust) * (cellSize + gapSize)};

  // eslint-disable-next-line no-console
  console.log(item.startGridPosition, startPos, item.endGridPosition,  endPos, isHorizontal);
  const pathDef = `M ${startPos.x} ${startPos.y} L ${endPos.x} ${endPos.y}`;
  // Apply shadow around arrow
  return (
    <div className={styles.arrow} style={{ transform }}>
      <svg className={styles.arrow}>
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="10" 
            refX="0.7" refY="1" orient="auto">
                <path d="M0,0 L0,2 L1.5,1 z" fill="var(--theme-color-4)" />
            </marker>
        </defs>
        <path className={styles.path} d={pathDef} fill="transparent" stroke="var(--theme-color-4)" strokeWidth={cellSize} markerEnd="url(#arrowhead)"/>
      </svg>
    </div>
  );
};