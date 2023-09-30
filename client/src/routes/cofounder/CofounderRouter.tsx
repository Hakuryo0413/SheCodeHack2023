import { Routes, Route } from "react-router-dom";
import CofounderLoginPage from "../../pages/cofounder/CofounderLoginPage";
import CofounderHomePage from "../../pages/cofounder/CofounderHomePage";
import EmailVerifyPage from "../../pages/cofounder/EmailVerifyPage";
import CofounderRegisterPage from "../../pages/cofounder/CofounderRegisterPage";
import EmailOTPPage from "../../pages/cofounder/EmailOTPPage";
import { useSelector } from "react-redux";
import { RootState } from "../../features/redux/reducers/Reducer";

const CofounderRouter = () => {
  const cofounderEmail = useSelector(
    (state: RootState) => state.cofounderDetails.cofounderEmail
  );
  return (
    <div>
      <Routes>
        <Route path="/*" element={<CofounderHomePage />} />
        <Route path="/login" element={<CofounderLoginPage />} />
        <Route path="/register" element={<EmailVerifyPage />} />
        {/* <Route path="/register/form" element={cofounderEmail ? <CofounderRegisterPage/> : <EmailVerifyPage/>}/> */}
        <Route path="/register/form" element={<CofounderRegisterPage />} />
        <Route
          path="/register/OTP"
          element={cofounderEmail ? <EmailOTPPage /> : <EmailVerifyPage />}
        />
      </Routes>
    </div>
  );
};

export default CofounderRouter;
