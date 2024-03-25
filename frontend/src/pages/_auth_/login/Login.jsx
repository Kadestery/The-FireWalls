import AuthFormHeader from "../authComponents/AuthFormHeader";
import { Form } from "react-router-dom";

function Login() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <AuthFormHeader heading="Login to your account" paragraph="Don't have an account yet? " linkName="Signup" linkUrl="/signup" />
      <Form className="w-[500px] mt-4" method="post">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input required type="email" name="email" id="email" className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input required type="password" name="password" id="password" className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
        </div>
        <button type="submit" className=" w-4/5 m-auto  block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">Login</button>
      </Form>
    </div>
  );
  
  
}

export default Login;
