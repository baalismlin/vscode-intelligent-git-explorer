export function CommitToolButton({
  label,
  iconClassName,
  onClick
}: {
  label: string;
  iconClassName: string;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      className="commit-tool-button"
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      <span className={iconClassName} aria-hidden="true" />
    </button>
  );
}
