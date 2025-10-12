import React, { useContext, useEffect, useState } from "react";
import { logos } from "../assets/icons/Assets.jsx";
import { UserContext } from "../context/UserContext.jsx";
import EditAddress from "./EditAddress.jsx";
import EditNumber from "../components/EditNumber.jsx";
import Draggable from "react-draggable";
import { useRef } from "react";
import icons from "../assets/icons/icons.jsx";

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const { street, city, district, state, zip } = userDetails.address
    ? userDetails.address
    : "";
  const [showEdit, setShowEdit] = useState(false);
  const [showEditNum, setShowEditNum] = useState(false);
  const [addressTF, setAddressTF] = useState(
    userDetails.address ? true : false
  );
  const user_picture = userDetails.user_picture;
  useEffect(() => {
    console.log("user Details - profile ", addressTF);
  }, [userDetails]);
  console.log("user pic: ", userDetails.user_picture);
  return (
    <div className="flex justify-center mt-5 relative">
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button
              onClick={() => setShowEdit(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <EditAddress
              userDetails={userDetails}
              addressTF={addressTF}
              onClose={() => setShowEdit(false)}
            />
          </div>
        </div>
      )}
      {showEditNum && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            <button
              onClick={() => setShowEditNum(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <EditNumber
              userDetails={userDetails}
              onClose={() => setShowEditNum(false)}
            />
          </div>
        </div>
      )}

      <div className="flex gap-3 w-[80%] justify-center">
        <div className="flex w-[100%] flex-col gap-3 justify-center items-center">
          <div className="flex mt-5 w-24 h-24 bg-blue-300 justify-center items-center rounded-full">
            {userDetails.user_picture ? (
              <img
                src={userDetails.user_picture}
                alt="avatar"
                className="rounded-full w-24"
              />
            ) : (
              icons.profile("profile")
            )}
            {/* <img src={user_picture} alt="avatar" className="rounded-full" /> */}
            {/* avatar */}
          </div>
          <div>{userDetails.name}</div>
        </div>
        <div className="flex flex-col gap-2 w-[100%] m-3">
          <div className="flex gap-2">
            <p className="bg-gray-50 p-3">Email:</p>
            <p className="bg-gray-50 p-3">{userDetails.email}</p>
          </div>
          <div className="flex gap-2 relative">
            <button
              onClick={() => {
                setShowEditNum(true);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:bg-gray-200 p-1"
            >
              <img src={logos.edit} className="w-4" />
            </button>
            <p className="bg-gray-50 p-3">Phone Number: </p>
            <p className="bg-gray-100 p-3">{userDetails.phone}</p>
          </div>
          <div className="flex gap-2">
            <p className="bg-gray-50 p-3 flex items-center">Address: </p>
            <div className="w-[100%] bg-gray-50 relative flex items-center">
              {/* edit icon top-right */}
              <button
                onClick={() => {
                  setShowEdit(true);
                }}
                className="absolute top-2 right-2 text-gray-500 hover:bg-gray-200 p-1"
              >
                <img src={logos.edit} className="w-4" />
              </button>
              {userDetails.address ? (
                <div className=" p-3 w-[100%] flex flex-col">
                  {/* H.No. 1-2-123, Gandhi Chouk, Nizambad-515236, Nizamabad,
                Telangana */}
                  <p>{street}</p>
                  <p>
                    <b>City</b>: {city}
                  </p>
                  <p>
                    <b>District</b>: {district}
                  </p>
                  <p>
                    <b>State</b>: {state}
                  </p>
                  <p>
                    <b>Pincode</b>: {zip}
                  </p>
                </div>
              ) : (
                <p className="flex items-center text-gray-400 text-sm pl-2">
                  Add your address here
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
