// این فایل نیازی به "use client" ندارد چون یک Server Component است
import SubHeader from "./SubHeader";
import Header from "./Header";
import NavBar from "./NavBar";
import SocialNetworks from "./SocialNetworks";
import BoxImgBranding from "./home/BoxImgBranding";
import SupportBox from "./home/SupportBox";
import Footer from "./Footer";
import SubFooter from "./SubFooter";

export default function LayoutWrapper({ children, showHeaderFooter = true  , showPro = true}) {
  if (!showHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <>
    <div className={showPro?'':'pb-16 sm:pb-0'}>

      <SubHeader />
      <Header />
      <NavBar />
      <SocialNetworks />
      {children}
      <BoxImgBranding />
      <div className="h-10"></div>
      <SupportBox />
      <Footer />
      <SubFooter />
    </div>
    </>
  );
} 