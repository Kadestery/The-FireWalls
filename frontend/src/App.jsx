import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} /> 
        </Route>
        <Route path="login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}/>
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}
