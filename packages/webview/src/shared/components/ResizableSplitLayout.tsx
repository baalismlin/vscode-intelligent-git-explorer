import { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode, useRef } from "react";

interface ResizableSplitLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  leftWidth: number;
  rightWidth: number;
  minLeftWidth?: number;
  minCenterWidth?: number;
  minRightWidth?: number;
  onResize: (layout: { leftWidth: number; rightWidth: number }) => void;
}

export function ResizableSplitLayout({
  left,
  center,
  right,
  leftWidth,
  rightWidth,
  minLeftWidth = 220,
  minCenterWidth = 420,
  minRightWidth = 260,
  onResize
}: ResizableSplitLayoutProps): JSX.Element {
  const layoutRef = useRef<HTMLDivElement>(null);

  const style = {
    gridTemplateColumns: `${leftWidth}px 5px minmax(${minCenterWidth}px, 1fr) 5px ${rightWidth}px`
  } satisfies CSSProperties;

  const startResize = (side: "left" | "right") => (event: ReactPointerEvent<HTMLDivElement>) => {
    const layout = layoutRef.current;
    if (!layout) {
      return;
    }

    event.preventDefault();
    const pointerId = event.pointerId;
    event.currentTarget.setPointerCapture(pointerId);
    const startX = event.clientX;
    const startLeftWidth = leftWidth;
    const startRightWidth = rightWidth;
    const containerWidth = layout.getBoundingClientRect().width;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = moveEvent.clientX - startX;
      const nextLeftWidth = clamp(
        side === "left" ? startLeftWidth + delta : startLeftWidth,
        minLeftWidth,
        containerWidth - minCenterWidth - startRightWidth - 10
      );
      const nextRightWidth = clamp(
        side === "right" ? startRightWidth - delta : startRightWidth,
        minRightWidth,
        containerWidth - minCenterWidth - startLeftWidth - 10
      );

      onResize({
        leftWidth: side === "left" ? nextLeftWidth : startLeftWidth,
        rightWidth: side === "right" ? nextRightWidth : startRightWidth
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
  };

  return (
    <div ref={layoutRef} className="layout" style={style}>
      {left}
      <ResizeHandle onPointerDown={startResize("left")} />
      {center}
      <ResizeHandle onPointerDown={startResize("right")} />
      {right}
    </div>
  );
}

function ResizeHandle({ onPointerDown }: { onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) => void }): JSX.Element {
  return <div className="resize-handle" onPointerDown={onPointerDown} role="separator" aria-orientation="vertical" />;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
