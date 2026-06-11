import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SocialSidebar from "./components/SocialSidebar";
import WhatsAppButton from "./components/WhatsAppButton";
import CookieBanner from "./components/CookieBanner";
import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ApproachPage from "./pages/ApproachPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import FeaturedProjectsPage from "./pages/FeaturedProjectsPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname]);
  return null;
}

function AppContent() {
  useSmoothScroll();
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <SocialSidebar />
      <WhatsAppButton />
      <CookieBanner />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about"    element={<AboutPage />} />
        <Route path="/approach" element={<ApproachPage />} />
        <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
        <Route path="/projects"            element={<FeaturedProjectsPage />} />
        <Route path="/projects/:projectId" element={<FeaturedProjectsPage />} />
        <Route path="/work"                element={<FeaturedProjectsPage />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/terms"    element={<TermsPage />} />
        <Route path="/privacy"  element={<PrivacyPage />} />
        <Route path="*"         element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Hero only mounts AFTER splash is fully gone
  // Sequence: Splash runs → fades out → onComplete fires → Hero mounts → Hero animates
  return showSplash ? (
    <SplashScreen onComplete={() => setShowSplash(false)} />
  ) : (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
