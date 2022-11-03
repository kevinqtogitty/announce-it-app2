import React from "react";
// eslint-disable-next-line import/named
import { Auth, getAuth } from "firebase/auth";
import { Route, Routes } from "react-router-dom";
import { firebaseApp } from "./firebase/config";
// import { checkIfUserIsAuthorized } from './firebase/authorization';

import Home from "./pages/Home";
import Newsfeed from "./pages/NewsFeed";
import "./stylesheets/global.css";
import { AuthRoutes } from "./utils/privateRoutes";
import Dashboard from "./pages/Dashboard";

function App() {
  const auth: Auth = getAuth(firebaseApp);

  return (
    <Routes>
      <Route path="/" element={<Home auth={auth} />} />
      <Route element={<AuthRoutes auth={auth} />}>
        <Route path="newsfeed" element={<Newsfeed />} />
        <Route path="dashboard" element={<Dashboard auth={auth} />} />
      </Route>
    </Routes>
  );
}

export default App;
