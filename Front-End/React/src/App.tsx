import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import FindNearMe from "./pages/FindNearMe";
import OrdersPageDesktop from "./pages/OrdersPageDesktop";
import TestingPage from "./pages/testingpage"
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/orders-page-desktop":
        title = "";
        metaDescription = "";
        break;

        case "/test":
          title = "";
          metaDescription = "";
          break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<OrdersPageDesktop />} />
      <Route path="/FindNearMe" element={<FindNearMe />} />
      <Route path="/test" element={<TestingPage />} />
    </Routes>
  );
}
export default App;
