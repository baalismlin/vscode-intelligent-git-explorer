import { PropsWithChildren } from "react";

export function Panel({ title, children }: PropsWithChildren<{ title: string }>): JSX.Element {
  return (
    <section className="panel">
      <div className="panel-title">{title}</div>
      <div className="panel-body">{children}</div>
    </section>
  );
}
