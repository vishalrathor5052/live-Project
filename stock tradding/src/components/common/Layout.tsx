import Footer from "./Footer";
import Header from "./Header";
import LoginHeader from "./LoginHeader";
import MobileHeader from "./MobileHeader";

const Layout =
  (Component: any) =>
  ({ ...props }) =>
    (
      <div>
        <Header />
        <MobileHeader/>
        <LoginHeader/>
        <Component {...props} />
        <Footer />
      </div>
    );

export default Layout;
