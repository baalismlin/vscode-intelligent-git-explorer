import { GitLogLayout } from "./GitLogLayout";
import { usePaneKeyboardNavigation } from "./usePaneKeyboardNavigation";
import { useWebviewHost } from "./useWebviewHost";
import { useGitLogStore } from "@store/gitLogStore";

export function App(): JSX.Element {
  const errorMessage = useGitLogStore((state) => state.errorMessage);
  useWebviewHost();
  usePaneKeyboardNavigation();

  return (
    <div className="layout-shell">
      {errorMessage ? <div className="app-banner">{errorMessage}</div> : null}
      <GitLogLayout />
    </div>
  );
}
