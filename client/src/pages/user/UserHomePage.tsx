import React from "react";
import UserHome from "../../components/HomePage/UserHome";
import UserHeader from "../../components/Header/UserHeader";
import UserSideFooter from "../../components/Footer/UserSideFooter";
import Test from "../../components/HomePage/Test";
function UserHomePage() {
  return (
    <div>
      <UserHeader />
      <UserHome />
      <Test />
      <UserSideFooter />
    </div>
  );
}

export default UserHomePage;
