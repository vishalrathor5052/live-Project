import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  MarkerF,
} from "@react-google-maps/api";
import "./style.css";
import Geocode from "react-geocode";
import { useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import ImageObj from "../../constant/Images";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { PATH } from "../../constant/Constant";
import { addUserDetails } from "../reduxSetup/UserDetailsSlice";
import SignIn from "../signIn/SignIn";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(`AIzaSyAlFBVWZq1kAs8wRQ1_3hAN1F9Bj9FObaE`);
const MapTest = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `AIzaSyAlFBVWZq1kAs8wRQ1_3hAN1F9Bj9FObaE`,
    libraries: ["places"],
  });

  if (!isLoaded) return <h2>Loading Location...</h2>;
  return <Map></Map>;
};
function Map(props: any) {
  const location1 = useLocation();
  const navigate = useNavigate();
  const [map, setMap] = useState<any>();
  const [autocomplete, setAutoComplete] = useState<any>();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState<any>({
    lat: 12.972442,
    lng: 77.580643,
  });
  const dispatch = useDispatch();
  const {
    userDetails: { userDetail },
  } = useSelector((state: any) => state);
  const onPlaceChanged = () => {
    console.log(
      "onplace change",
      autocomplete?.getPlace()?.geometry.location.lat()
    );
    location.lat = autocomplete?.getPlace()?.geometry.location.lat();
    location.lng = autocomplete?.getPlace()?.geometry.location.lng();
    setAddress(autocomplete?.getPlace()?.formatted_address ?? "");

    setLocation(location);
    const zipCode = autocomplete
      ?.getPlace()
      ?.address_components.find((addressComponent: any) =>
        addressComponent.types.includes("postal_code")
      )?.short_name;
    console.log(
      "pincode",
      autocomplete
        ?.getPlace()
        ?.address_components.find((addressComponent: any) =>
          addressComponent.types.includes("postal_code")
        )?.short_name
    );
    setPincode(zipCode);
  };
  /**
   *
   * @param {*} autocomplete  object of the place
   * !: setAutoComplete for storing the autocomplete object
   */
  const onLoad = (autocomplete: any) => {
    setAutoComplete(autocomplete);
  };
  /**
   *
   * @param {*} autocomplete getting the object of placeId, lat and lng
   * todo: storing the location and get the address from the getAddress function
   * !: setLocation for storing the lat and lng obj
   * !: getAddress function for get the places by lat and lng
   */
  const onHandleClick = (autocomplete: any) => {
    setLocation({
      lat: autocomplete.latLng.lat(),
      lng: autocomplete.latLng.lng(),
    });
    getAddress(autocomplete.latLng.lat(), autocomplete.latLng.lng());
  };

  /**
   *
   * @param {*} latitude for latitune in floating value
   * @param {*} longitude for longitude in floating value
   * todo: get the selected and located place address by Geocode package
   * !: setAddress for storing the address of resulted address
   */
  const getAddress = (latitude: any, longitude: any) => {
    // tslint: disable - next - line: new- parens
    // Get address from latitude & longitude.
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response?.results[0]?.formatted_address;
        const zipCode = response?.results[0]?.address_components.find(
          (addressComponent: any) =>
            addressComponent.types.includes("postal_code")
        )?.short_name;
        setAddress(address);
        setPincode(zipCode);
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  let value = {
    address: address,
    pinCode: pincode,
    latitude: latitude,
    longitude: longitude,
    currentLocation: true,
  };

  const addAvailabilityArea = async (value: any) => {
    await axios(`${PATH}availabilityArea/add`, {
      method: "post",
      data: value,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  };

  /**
   * todo: for get the current allocation lat and lng by navigator
   * !: getAddress for storing the result of current lat and lng
   * !: setLocation for making the maker on that position
   */
  const onHandleLocateMe = () => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          getAddress(pos.lat, pos.lng);
          setLocation(pos);
          map && map.setCenter(pos);
        },
        (error: any) => {}
      );
    }
  };

  /**
   *
   * @param {*} map value of map on load of map
   * todo: getting the current position by onHandleLocateMe function
   * todo: and storing the map value in setMap
   */
  const mapLoad = (map: any) => {
    setMap(map);
    onHandleLocateMe();
  };

  const backHandle = () => {
    navigate("/");
  };

  const handleNavigate1 = () => {
    if (location1?.state?.heading == "Address") {
      // console.log("ddddd", location1?.state?.heading);
      location1?.state?.id
        ? navigate(`/deliveryaddress/${location1?.state?.id}`, {
            state: {
              address: address,
              showbutton: true,
              delivery: true,
              data: { id: location1?.state?.id },
            },
          })
        : navigate(`/deliveryaddress`, {
            state: { address: address, showbutton: true },
          });
    } else if (location1?.state?.heading == "Location") {
      navigate("/cart", {
        state: { address: address, showbutton: true },
      });
    } else {
      if (userDetail?.tokenId?.isVerify === true) {
        navigate("/cart", {
          state: { address: address, showbutton: true },
        });
      } else {
        loginLink();
        // navigate("/signin");
      }
      // navigate("/landing", {
      //   state: { address: address, showbutton: true },
      // });
    }

    dispatch(addUserDetails({ location: address }));
    addAvailabilityArea(value);
  };
  const loginLink = () => {
    setShowModal(true);
    // dispatch(
    //   addUserDetails({
    //     isVerify: false,
    //   })
    // );
  };
  const handleChangeAddress = (e: any) => {
    console.log("lat", e.lat);
    // getAddress(pos.lat, pos.lng);
    setAddress(e.target.value);
  };
  console.log("address 1", address);
  return (
    <div className="location-background-img">
      {showModal && <SignIn newShow={setShowModal} />}
      <GoogleMap
        zoom={14}
        center={location}
        mapContainerClassName="map"
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={mapLoad}
        onClick={onHandleClick}
      >
        <MarkerF position={location} />

        {location?.lng && (
          <MarkerF
            position={location}
            onLoad={() => map?.panTo(location)}
            draggable={true}
          ></MarkerF>
        )}
      </GoogleMap>
      <div className="location-box">
        <p className="back-text" onClick={backHandle}>
          BACK
        </p>
        <p className="confirm-delivery-text">{location1?.state?.heading}</p>
        <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
          <div className="input-group1">
            <input
              type="text"
              className="form-control"
              placeholder="Search Location"
              value={address}
              onChange={handleChangeAddress}
            />
          </div>
        </Autocomplete>
        <div className="btn-address">
          <div className="use-my-location-logo-text">
            <img className="gps-img" src={ImageObj.gpsIcon} alt="location" />
            <p
              className="use-my-current-location ms-2"
              onClick={onHandleLocateMe}
            >
              Use my current location
            </p>
          </div>
          <ButtonComponent
            type="button"
            title="Confirm Location & Proceed"
            customClass="locate-me-btn"
            onClick={handleNavigate1}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(MapTest);
