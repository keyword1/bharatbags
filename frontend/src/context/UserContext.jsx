import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(() => {
    const stored = localStorage.getItem("userDetails");
    return stored ? JSON.parse(stored) : {};
  });
  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);
  const value = {
    userDetails,
    setUserDetails,
  };
  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
