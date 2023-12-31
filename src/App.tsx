import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/aboutPage";
import LandingPage from "./pages/landingPage";
import HomePage from "./pages/homePage";
import NewPage from "./pages/newPage";
import SummaryPage from "./pages/summaryPage";
import AccountPage from "./pages/accountPage";
import SubscriptionsPage from "./pages/subscriptionsPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import EditPassword from "./pages/editPassword";
import { ProtectedRoute } from "./components/auth/protectedRoute";
import Error from "./components/pageLayout/error";

function App() {
  return (
    <BrowserRouter>
      <Error>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary/:id"
            element={
              <ProtectedRoute>
                <SummaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editPassword"
            element={
              <ProtectedRoute>
                <EditPassword />
              </ProtectedRoute>
            }
          />
          <Route path="*">"404 Not Found"</Route>
        </Routes>
      </Error>
    </BrowserRouter>
  );
}

export default App;
