import React from "react";
import { Routes as Router, Route } from "react-router-dom";
import {
  AuthScreen,
  HighLevelProduct,
  Home,
  PaperTrim,
  Patches,
  ProfileScreen,
  SavedPictures,
  Zipper,
} from "../screens/screens";
import { Navbar, PrivateRoute } from "../components/components";
import { useLocation } from "react-router-dom";
import InquiryPage from "../screens/InquiryPage/InquiryPage";
const Routes = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}
      <Router>
        <Route path="/login" element={<AuthScreen />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/:slug" element={<HighLevelProduct />} />
          {/* <Route path="/papertrim" element={<PaperTrim />} />
          <Route path="/patches" element={<Patches />} />
          <Route path="/zippers" element={<Zipper />} /> */}
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/save-pictures" element={<SavedPictures />} />
        </Route>
      </Router>
    </div>
  );
};

export default Routes;
