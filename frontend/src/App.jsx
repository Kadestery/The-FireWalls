import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Home";
import Login from "./pages/_auth_/login/Login";
import Signup from "./pages/_auth_/signup/Signup";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Accounts from "./pages/accounts/Accounts";
import AddProfile from "./pages/addProfile/AddProfile";
import { signupFormAction } from "./actions/signupFormAction";
import { loadProfiles } from "./loaders/loadProfiles";
import { createProfileAction } from "./actions/createProfileAction";
import { loginFormAction } from "./actions/loginFormAction";
import PrivateRoute from "./generalComponents/PrivateRoute";

//Routing to pages
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={ <PrivateRoute><RootLayout /></PrivateRoute>  } >
          <Route index element={<Home />}  loader={loadProfiles} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="accounts" element={<Accounts />} loader={loadProfiles} />
          <Route path="addprofile" element={<AddProfile />} action={createProfileAction} />
        </Route>
        <Route path="/login" element={<Login />} action={loginFormAction} />
        <Route path="/signup" element={<Signup />} action={signupFormAction} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}
