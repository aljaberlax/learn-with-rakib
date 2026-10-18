import {
  Routes,
  Route,
  Link,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import AuthPage from "./pages/AuthPage.jsx";

function Navbar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const onCatalog = location.pathname === "/";
  const onLogin = location.pathname === "/login";
  const onSignup = location.pathname === "/signup";
  const selectedView =
    searchParams.get("view") === "upcoming" ? "upcoming" : "all";

  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="brand">
          Learn with Rakib
        </Link>
        <nav>
          <Link
            className={
              onCatalog && selectedView === "all"
                ? "nav-filter active"
                : "nav-filter"
            }
            to="/?view=all"
            aria-current={
              onCatalog && selectedView === "all" ? "page" : undefined
            }
          >
            Courses
          </Link>
          <Link
            className={
              onCatalog && selectedView === "upcoming"
                ? "nav-filter active"
                : "nav-filter"
            }
            to="/?view=upcoming"
            aria-current={
              onCatalog && selectedView === "upcoming" ? "page" : undefined
            }
          >
            Upcoming courses
          </Link>
        </nav>
        <div className="nav-actions">
          <Link
            className={onLogin ? "login-link active" : "login-link"}
            to="/login"
            aria-current={onLogin ? "page" : undefined}
          >
            Log in
          </Link>
          <Link
            className={
              onSignup ? "btn nav-signup active" : "btn nav-signup"
            }
            to="/signup"
            aria-current={onSignup ? "page" : undefined}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <b>Learn with Rakib</b>
        <p>
          Cisco networking courses taught by a Cisco instructor. Not affiliated
          with or endorsed by Cisco.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
      </Routes>
      <Footer />
    </>
  );
}
