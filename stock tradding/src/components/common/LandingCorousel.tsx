import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingCorousel(result: any) {
  const newResult = result?.result?.data;
  // const [scrollDir, setScrollDir] = useState("no-scrolling");
  const [pos, setpos] = useState();

  const handleScroll = () => {
    const scrollPosition = window.scrollY; // => scroll position

    if (scrollPosition >= 100 && scrollPosition <= 1000) {
      let value: any = scrollPosition * 1;
      setpos(value);
    }
  };
  const navigate = useNavigate();
  const isUserLogin: any = localStorage.getItem("authToken");
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const styles = {
    transform: `translate(-${pos}px, -${0}%)`,
    // transform: `translate(500px, -${0}%)`,
    // position:"absolute",
    width: "200%",
    display: "flex",
    alignItems: "center",
    // OverFlowX: "auto",
  };
  // useEffect(() => {
  //   const threshold = 0;
  //   let lastScrollY = window.pageYOffset;
  //   let ticking = false;
  //   const updateScrollDir = () => {
  //     let scrollY = window.pageYOffset;
  //     let scrollX = window.scrollY;
  //     let newScroll = Math.round(scrollY);
  //     let newLastScroll = Math.round(lastScrollY);
  //     if (scrollX >= 830 && scrollX <= 1040) {
  //       setScrollDir("no-scrolling");
  //     } else if (scrollX > 0 && scrollX < 3500) {
  //       if (scrollY > lastScrollY) {
  //         setScrollDir("scrolling-down");
  //       } else if (scrollY < lastScrollY) {
  //         setScrollDir("scrolling-up");
  //       }
  //     } else if (scrollX >= 0 && scrollX < 3500) {
  //       if (scrollY > lastScrollY) {
  //         setScrollDir("scrolling-down");
  //       } else if (scrollY < lastScrollY) {
  //         setScrollDir("scrolling-up");
  //       }
  //     }
  //     lastScrollY = scrollY > 0 ? scrollY : 0;
  //     ticking = false;
  //   };

  //   const onScroll = () => {
  //     if (!ticking) {
  //       window.requestAnimationFrame(updateScrollDir);
  //       ticking = true;
  //     }
  //   };

  //   window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [scrollDir]);

  return (
    <>
      <div
        style={{
          transform: `translate(-${pos}px, -${0}%)`,
          position: "absolute",
          left:"55%",
          width: "200%",
          display: "flex",
          alignItems: "center",
        }}
        id="test"
        className="card-scroll"
      >
        {newResult.slice(0, 5).map((elm: any) => {
          return (
            <div
              className="card-div"
              onClick={() => {
                isUserLogin
                  ? navigate(`/companiesdetails/${elm.id}`)
                  : navigate(`/login`);
              }}
            >
              <img
                src={`http://34.203.56.127:3000/stockTradingUploads/${elm?.iconUrl}`}
                alt="companylogo"
                className="super-king-icon"
              />
              <p className="card-amount">${elm.price ? elm.price : 10}</p>
              <p className="sector">Sector</p>
              <p className="card-title">{elm.companyName}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
