import { useEffect, useRef, useState } from "react";

export function VirtualList<T>({
  items,
  rowHeight,
  overscan = 8,
  className,
  contentClassName,
  windowClassName = "virtual-list__window",
  emptyState,
  getKey,
  renderItem
}: {
  items: T[];
  rowHeight: number;
  overscan?: number;
  className: string;
  contentClassName: string;
  windowClassName?: string;
  emptyState?: JSX.Element;
  getKey: (item: T) => string;
  renderItem: (item: T) => JSX.Element;
}): JSX.Element {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    setViewportHeight(container.clientHeight);
    const observer = new ResizeObserver(() => {
      setViewportHeight(container.clientHeight);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const totalHeight = items.length * rowHeight;
  const visibleCount = Math.ceil(viewportHeight / rowHeight) + overscan * 2;
  const maxStartIndex = Math.max(0, items.length - visibleCount);
  const startIndex = Math.min(
    maxStartIndex,
    Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
  );
  const endIndex = Math.min(items.length, startIndex + visibleCount);
  const offsetY = startIndex * rowHeight;
  const visibleItems = items.slice(startIndex, endIndex);

  return (
    <div
      ref={scrollContainerRef}
      className={className}
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      {items.length === 0 ? emptyState : null}
      {items.length > 0 ? (
        <div className={contentClassName} style={{ height: totalHeight }}>
          <div
            className={windowClassName}
            style={{
              transform: `translateY(${offsetY}px)`
            }}
          >
            {visibleItems.map((item) => (
              <div key={getKey(item)} style={{ height: rowHeight }}>
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
