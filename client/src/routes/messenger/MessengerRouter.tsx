import { Route, Routes } from "react-router-dom";
import UserMessenger from "../../pages/messenger/UserMessenger";
import CofounderHomePage from "../../pages/cofounder/CofounderHomePage";

const MessengerRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/user" element={<UserMessenger />} />
        <Route path="/cofounder" element={<CofounderHomePage />} />
      </Routes>
    </div>
  );
};

export default MessengerRouter;
