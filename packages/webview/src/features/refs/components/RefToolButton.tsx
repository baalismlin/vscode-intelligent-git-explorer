export function RefToolButton({
  label,
  iconClassName,
  active = false,
  disabled = false,
  onClick
}: {
  label: string;
  iconClassName: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}): JSX.Element {
  return (
    <button
      type="button"
      className={`reference-tool-button ${active ? "active" : ""}`.trim()}
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={iconClassName} aria-hidden="true" />
    </button>
  );
}
