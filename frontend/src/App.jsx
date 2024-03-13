import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";
import Login from "./pages/_auth_/login/Login";
import Signup from "./pages/_auth_/signup/Signup";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { signupFormAction } from "./actions/signupFormAction";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} /> 
          <Route path="about" element={<About/>} />
          <Route path="contact" element={<Contact/>}/>
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} action={signupFormAction}/>
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}


//index = path=""