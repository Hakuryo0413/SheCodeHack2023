import React from "react";
import UserHome from "../../components/HomePage/UserHome";
import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";
//import EditUserProfile from '../../components/User/UserProfile/EditUserProfile';

function CheckOut() {
  return (
    <div>
      <UserHeader />
      {/* <EditUserProfile /> */}
      <UserSideFooter/>
    </div>
  );
}

export default CheckOut;