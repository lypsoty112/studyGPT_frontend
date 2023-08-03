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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
