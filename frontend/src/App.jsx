import React, { Suspense } from "react"

import {BrowserRouter, Route, Routes} from "react-router-dom"
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboad from "./components/Dashboad";

const routes = [
  {path: "/", element: <SignUp />},
  {path: "/signin", element: <SignIn />},
  {path: "/dashboard", element: <Dashboad />},
];

function App() {
  return <>
    <BrowserRouter>
    <Routes>
      {routes.map((route, index) => <Route key={index} path={route.path} element={route.element}></Route>)}
    </Routes>
    </BrowserRouter>  
  </>
}

export default App
