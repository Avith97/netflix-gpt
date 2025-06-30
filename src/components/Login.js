import React, { useState } from 'react'
import Header from './Header'

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media/banner.jpg" />
            </div>
            <form className="absolute p-12 bg-black w-3/12 my-24 mx-auto left-0 right-0 bg-opacity-80">
                <h1 className='font-bold text-white text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input type="text" placeholder="Full Name" className="p-2 my-4 w-full  bg-gray-700  text-white"></input>}
                <input type="email" placeholder="Email Address" className="p-2 my-4 w-full  bg-gray-700"></input>
                <input type="text" placeholder="Password" className="p-2 my-4 w-full  bg-gray-700"></input>
                <button className="p-2 my-6 bg-red-700 w-full rounded-lg">{isSignInForm ? "Sign In" : "Sign Out"}</button>
                <p className='py-4 text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered Sign In Now."}</p>
            </form>
        </div>
    )
}

export default Login