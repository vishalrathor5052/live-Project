import React, { FC, memo } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMobileCat } from "../../screens/reduxSetup/UserDetailsSlice";

interface CircularComponentProps {
  color?: boolean;
}

const CircularCategories: FC<CircularComponentProps> = ({ color }) => {
  const navigates = useNavigate();
  const dispatch = useDispatch();
  const {
    apiResponse: { categoryList },
  } = useSelector((state: any) => state);

  const handleNavigateMenu = (data: any) => {
    navigates("/menu", { state: { num: data?.id } });
    dispatch(selectMobileCat({ [data.categoryName]: true }));
    // var element = document.getElementById(
    //   `${data.categoryName}-${data.id}`
    // );
    // element?.scrollIntoView({
    //   behavior: "smooth",
    //   inline: "nearest",
    // });
  };

  return (
    <>
      {/* if length of menuItems is greater then 0 (there is no data in menuItems)  */}
      {categoryList?.length > 0 &&
        categoryList?.map((elm: any) => {
          return (
            <>
              <div
                key={elm?.id}
                className="main-circle-container"
                onClick={() => handleNavigateMenu(elm)}
              >
                <div className="circle-main-div">
                  <div className="circle-image-div">
                    <div className="image-outer-border">
                      <img
                        className="circle-image"
                        src={`http://34.200.195.34/upload/${elm?.image}`}
                        alt="categories"
                      />
                    </div>
                  </div>
                  <div className="circle-text-div">
                    <p
                      style={{ cursor: "pointer" }}
                      className={
                        color
                          ? "circle_category_text_yellow"
                          : "circle_category_text_black"
                      }
                    >
                      {elm.categoryName}
                    </p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default memo(CircularCategories);
