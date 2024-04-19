import React from 'react'
import { Form } from 'react-router-dom'
//Add profile page
function AddProfile() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create A New Profile</h2>
      <Form className="w-[500px] mt-4" method="post">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input required type="text" name="username" id="username" className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
        </div>
        //Show user profile types
        <div className="mb-4">
          <label htmlFor="profileType" className="block text-gray-700 text-sm font-bold mb-2">
            User Profile Type
          </label>
          <div>
            <label htmlFor="parent" className="inline-flex items-center">
              <input required type="radio" id="parent" name="profileType" value="parent" className="form-radio h-5 w-5" />
              <span className="ml-2">Parent</span>
            </label>
          </div>
          <div>
            <label htmlFor="child" className="inline-flex items-center">
              <input required type="radio" id="child" name="profileType" value="child" className="form-radio h-5 w-5" />
              <span className="ml-2">Child</span>
            </label>
          </div>
          <div>
            <label htmlFor="guest" className="inline-flex items-center">
              <input required type="radio" id="guest" name="profileType" value="guest" className="form-radio h-5 w-5" />
              <span className="ml-2">Guest</span>
            </label>
          </div>
          <div>
            <label htmlFor="stranger" className="inline-flex items-center">
              <input required type="radio" id="stranger" name="profileType" value="stranger" className="form-radio h-5 w-5" />
              <span className="ml-2">Stranger</span>
            </label>
          </div>
        </div>
        <button type="submit" className=" w-4/5 m-auto  block py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10">
          Create User
        </button>
      </Form>
    </div>
  )
}

export default AddProfile
