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
import { ProtectedRoute } from "./components/auth/protectedRoute";

function App() {
  return (
    <BrowserRouter>
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
          path="/summary"
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
