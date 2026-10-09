import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Projects from "./pages/Projects";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  if (path === "/projects") {
    return <Projects />;
  }

  return <Home />;
}

export default App;
