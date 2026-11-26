import { type ReactNode, useEffect, useState } from "react";
import { ConnectedDraft } from "./components/ConnectedDraft";
import { initApp } from "@freeappstore/sdk";
import { type NavItem, PageHeader, Shell } from "@freeappstore/sdk/ui";

// "APPID" is replaced by the CLI scaffold or deployment flow with this app's id.
export const fas = initApp({ appId: "APPID" });

// The app's screens. Shell renders them as the navbar: a <nav> in its topbar
// with the current screen highlighted, collapsing to a menu on phones.
// Add one entry per primary screen; `title` becomes the browser tab title.
// About is not a screen: it goes in Shell's `about` (bottom of Profile).
const NAV: NavItem[] = [{ label: "Home", href: "/", title: "APPNAME_JS" }];

// The component for each NAV href. Unknown paths show Home.
const SCREENS: Record<string, () => ReactNode> = { "/": Home };

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname);

  // Keep the screen in step with the browser's back and forward buttons.
  useEffect(() => {
    const sync = () => setPath(window.location.pathname);
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  // Nav clicks switch screens without a page load. Shell scrolls to the top
  // and moves focus to the new screen's PageHeader.
  const navigate = (href: string) => {
    window.history.pushState(null, "", href);
    setPath(window.location.pathname);
  };

  const Screen = SCREENS[path] ?? Home;

  // `about` shows at the bottom of Profile with a link to this app's
  // FreeAppStore listing. Shell's bottom status bar says "Save to home screen"
  // in a browser tab and shows this app's address once installed.
  return (
    <Shell app={fas} appName={"APPNAME_JS"} nav={NAV} onNavigate={navigate} about={ABOUT}>
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-8">
        <Screen />
      </div>
    </Shell>
  );
}

const ABOUT = "APPNAME_JS is a free app on FreeAppStore.";

function Home() {
  return <><PageHeader title={"Welcome to APPNAME_JS"} description="Editable app-owned starter screen." /><ConnectedDraft app={fas} /></>;
}
