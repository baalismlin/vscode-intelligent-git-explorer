import { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode, useEffect, useMemo, useRef } from "react";
import { PersistedWebviewState } from "@store/gitLogStore";

type PanelLayoutState = PersistedWebviewState["panelLayout"];

interface ResizableSplitLayoutProps {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  refsWidth: number;
  detailsWidth: number;
  minRefsWidth?: number;
  minCenterWidth?: number;
  minDetailsWidth?: number;
  onResize: (layout: Partial<PanelLayoutState>) => void;
}

export function ResizableSplitLayout({
  left,
  center,
  right,
  refsWidth,
  detailsWidth,
  minRefsWidth = 220,
  minCenterWidth = 420,
  minDetailsWidth = 260,
  onResize
}: ResizableSplitLayoutProps): JSX.Element {
  const layoutRef = useRef<HTMLDivElement>(null);
  const latestWidthsRef = useRef({ refsWidth, detailsWidth });

  latestWidthsRef.current = { refsWidth, detailsWidth };

  const resolvedLayout = useMemo(() => {
    const availableWidth = layoutRef.current?.getBoundingClientRect().width;
    return resolveLayout({
      availableWidth,
      refsWidth,
      detailsWidth,
      minRefsWidth,
      minCenterWidth,
      minDetailsWidth
    });
  }, [refsWidth, detailsWidth, minRefsWidth, minCenterWidth, minDetailsWidth]);

  useEffect(() => {
    const layout = layoutRef.current;
    if (!layout || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      const next = resolveLayout({
        availableWidth: entry.contentRect.width,
        refsWidth: latestWidthsRef.current.refsWidth,
        detailsWidth: latestWidthsRef.current.detailsWidth,
        minRefsWidth,
        minCenterWidth,
        minDetailsWidth
      });

      if (
        next.refsWidth !== latestWidthsRef.current.refsWidth ||
        next.detailsWidth !== latestWidthsRef.current.detailsWidth
      ) {
        onResize(next);
      }
    });

    observer.observe(layout);
    return () => observer.disconnect();
  }, [minRefsWidth, minCenterWidth, minDetailsWidth, onResize]);

  const style = {
    gridTemplateColumns: `${resolvedLayout.refsWidth}px 8px minmax(${minCenterWidth}px, 1fr) 8px ${resolvedLayout.detailsWidth}px`
  } satisfies CSSProperties;

  const startResize = (side: "left" | "right") => (event: ReactMouseEvent<HTMLDivElement>) => {
    const layout = layoutRef.current;
    if (!layout) {
      return;
    }

    event.preventDefault();
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const startX = event.clientX;
    const startRefsWidth = resolvedLayout.refsWidth;
    const startDetailsWidth = resolvedLayout.detailsWidth;
    const containerWidth = layout.getBoundingClientRect().width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const delta = moveEvent.clientX - startX;
      const next = resolveLayout({
        availableWidth: containerWidth,
        refsWidth: side === "left" ? startRefsWidth + delta : startRefsWidth,
        detailsWidth: side === "right" ? startDetailsWidth - delta : startDetailsWidth,
        minRefsWidth,
        minCenterWidth,
        minDetailsWidth
      });

      onResize(next);
    };

    const handleMouseUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  return (
    <div ref={layoutRef} className="layout" style={style}>
      {left}
      <ResizeHandle onMouseDown={startResize("left")} />
      {center}
      <ResizeHandle onMouseDown={startResize("right")} />
      {right}
    </div>
  );
}

function ResizeHandle({ onMouseDown }: { onMouseDown: (event: ReactMouseEvent<HTMLDivElement>) => void }): JSX.Element {
  return <div className="resize-handle" onMouseDown={onMouseDown} role="separator" aria-orientation="vertical" />;
}

function clamp(value: number, min: number, max: number): number {
  if (max < min) {
    return min;
  }

  return Math.max(min, Math.min(value, max));
}

function resolveLayout({
  availableWidth,
  refsWidth,
  detailsWidth,
  minRefsWidth,
  minCenterWidth,
  minDetailsWidth
}: {
  availableWidth?: number;
  refsWidth: number;
  detailsWidth: number;
  minRefsWidth: number;
  minCenterWidth: number;
  minDetailsWidth: number;
}): PanelLayoutState {
  if (!availableWidth) {
    return {
      refsWidth: Math.max(refsWidth, minRefsWidth),
      detailsWidth: Math.max(detailsWidth, minDetailsWidth)
    };
  }

  const separatorWidth = 16;
  const maxRefsWidth = availableWidth - minCenterWidth - minDetailsWidth - separatorWidth;
  const safeRefsWidth = clamp(refsWidth, minRefsWidth, maxRefsWidth);
  const maxDetailsWidth = availableWidth - minCenterWidth - safeRefsWidth - separatorWidth;
  const safeDetailsWidth = clamp(detailsWidth, minDetailsWidth, maxDetailsWidth);

  return {
    refsWidth: safeRefsWidth,
    detailsWidth: safeDetailsWidth
  };
}
