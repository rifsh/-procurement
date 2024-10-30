import React, { useState } from 'react'
import Img from '../assets/img1.jpg'
import useLogin from '../hook/useLogin';
const Login = () => {
    const {
        formData,
        handleChange,
        handleSubmit,
        isLoading,
        isError,
        error,
        data,
      } = useLogin();
  return (
    <div className='h-screen w-full flex overflow-hidden '>
        {/* left section */}
        <div
        className="w-1/2 h-full bg-cover bg-center hidden lg:flex"
        style={{ backgroundImage: `url(${Img})` }}
      ></div>
        {/* Right section */}
        <div className='lg:w-1/2 w-full h-full flex justify-center items-center'>
        <div className=' lg:w-9/12 w-11/12 shadow-lg md:shadow-none rounded-lg'>
        <form onSubmit={handleSubmit} className="bg-white  lg:p-14 p-8 shadow-lg rounded-lg md:shadow-none ">
          <h2 className="text-2xl font-bold mb-6 text-center text-pretty text-secondary">Login</h2>
          <p className='lg:pr-4 lg:pt-4 lg:pb-2 text-sm lg:text-base pb-2'>Empower your decisions with knowledge. Every login is a step towards greater achievements.</p>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700">ID</label>
            <input
              type="text"
              id="Id"
              name="Id"
              value={formData.Id}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl mt-2 focus:outline-none focus:border-secondary"
              placeholder="Enter your ID"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl mt-2 focus:outline-none focus:border-secondary"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-black py-2 rounded-xl hover:bg-secondary hover:text-white " 
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          {isError && <p className="error-message">{error.message}</p>}
        {data && <p className="success-message">Login successful!</p>}
        </form>
        </div>
        </div>
    </div>
  )
}

export default Login