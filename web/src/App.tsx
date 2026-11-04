import { useEffect, useState } from "react";
import { ConnectedDraft } from "./components/ConnectedDraft";
import { initApp } from "@freeappstore/sdk";
import { type NavItem, PageHeader, Shell } from "@freeappstore/sdk/ui";

// "APPID" is replaced by the CLI scaffold or deployment flow with this app's id.
export const fas = initApp({ appId: "APPID" });

// The app's screens. Shell renders them as the navbar: a <nav> in its topbar
// with the current screen highlighted, collapsing to a menu on phones.
// Add one entry per primary screen; `title` becomes the browser tab title.
const NAV: NavItem[] = [
  { label: "Home", href: "/", title: "APPNAME_JS" },
  { label: "About", href: "/about", title: "About — APPNAME_JS" },
];

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
    setPath(href);
  };

  return (
    <Shell app={fas} appName={"APPNAME_JS"} nav={NAV} onNavigate={navigate}>
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-8">
        {path === "/about" ? <About /> : <Home />}
      </div>
    </Shell>
  );
}

function Home() {
  return <><PageHeader title={"Welcome to APPNAME_JS"} description="Editable app-owned starter screen." /><ConnectedDraft app={fas} /></>;
}

function About() {
  return (
    <>
      <PageHeader title="About" />
      <p style={{ color: "var(--muted)" }}>
        APPNAME_TEXT is a free app on <a href="https://freeappstore.online">FreeAppStore</a>.
      </p>
    </>
  );
}