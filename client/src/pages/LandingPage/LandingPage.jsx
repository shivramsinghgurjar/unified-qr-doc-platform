import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import BrandVoice from "./sections/BrandVoice";
import Benefits from "./sections/Benefits";
import Analytics from "./sections/Analytics";
import DocumentModule from "./sections/DocumentModule";
import WhyUs from "./sections/WhyUs";
import UserRoles from "./sections/UserRoles";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";
import "./LandingPage.css";

// import "../../index.css";

export default function LandingPage() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <BrandVoice />
        <Benefits />
        <Analytics />
        <DocumentModule />
        <WhyUs />
        <UserRoles />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}