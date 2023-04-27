// import React, { memo } from "react";
// import "./style.css";

// const Carousel = (props: any) => {
//   const { data } = props;
//   return (
//     <div
//       id="carouselExampleIndicators"
//       className="carousel slide"
//       data-bs-ride="true"
//       style={{ backgroundColor: "rgba(0,0,0,0.8)", borderRadius: "10px" }}
//     >
//       <div className="carousel-indicators button-on-circular-section">
//         {data.map((elm: any, idx: any) => {
//           return (
//             <button
//               key={idx}
//               type="button"
//               data-bs-target="#carouselExampleIndicators"
//               data-bs-slide-to={idx}
//               className="active btn-color"
//               aria-current="true"
//               aria-label={`Slide ${idx + 1}`}
//             ></button>
//           );
//         })}
//       </div>

//       <div className="carousel-inner">
//         {data.map((elm: any, idx: any) => {
//           console.log("elm in carousel", elm);
//           return (
//             <div
//               key={idx}
//               className={`carousel-item  ${idx === 0 ? "active" : ""}`}
//             >
//               <img src={elm} className="d-block w-100 carosal-img" alt="..." />
//             </div>
//           );
//         })}
//       </div>

//       <div className="btn-carousel">
//         <button
//           className="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide="prev"
//         >
//           <span
//             className="carousel-control-prev-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button
//           className="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleIndicators"
//           data-bs-slide="next"
//         >
//           <span
//             className="carousel-control-next-icon"
//             aria-hidden="true"
//           ></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default memo(Carousel);
import React, { memo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./style.css";

const CarouselComponent = (props:any) => {
  console.log("CarouselComponent props", props);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {props.data.map((elm:any, idx:number)=>  <Carousel.Item>
        <img
          className="d-block w-100 h-100"
          src={elm}
          // alt="First slide"
        />
      </Carousel.Item>)}
     
    </Carousel>
  );
}

export default memo(CarouselComponent);