import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./components/FunctionalForm";
export const FunctionalApp = () => {
  const [userInformation, setUser] = useState();
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        userData={userInformation?.firstName ? userInformation : ""}
      />
      <FunctionalForm setUser={setUser} userInformation={userInformation} />
    </>
  );
};
