import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/aboutPage";
import LandingPage from "./pages/landingPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import HomePage from "./pages/homePage";
import NewPage from "./pages/newPage";
import SummaryPage from "./pages/summaryPage";
import AccountPage from "./pages/accountPage";
import SubscriptionsPage from "./pages/subscriptionsPage";
import MyAuth0Provider from "./api/AuthProvider";

function App() {
  return (
    <MyAuth0Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
        </Routes>
      </BrowserRouter>
    </MyAuth0Provider>
  );
}

export default App;
