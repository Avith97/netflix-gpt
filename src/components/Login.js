import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BG_URL, USER_AVATAR } from '../utils/constants';
import { auth } from '../utils/firebase';
import { addUser } from '../utils/userSlice';
import { checkValidDate } from '../utils/validate';
import Header from './Header';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);
    const [errorMessage, setErrorMessage] = useState();
    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        // Validate the form
        const message = checkValidDate(email.current.value, password.current.value)
        setErrorMessage(message);
        if (errorMessage) return;

        //sign up
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: fullName.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });

        }
        else {
            //sign in
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + " - " + errorMessage);
                });
        }
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src={BG_URL} />
            </div>
            <form onSubmit={(e) => { e.preventDefault() }} className="absolute p-12 bg-black w-3/12 my-24 mx-auto left-0 right-0 bg-opacity-80">
                <h1 className='font-bold text-white text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input ref={fullName} type="text" placeholder="Full Name" className="p-2 my-4 w-full  bg-gray-700  text-white"></input>}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-4 w-full  bg-gray-700"></input>
                <input ref={password} type="text" placeholder="Password" className="p-2 my-4 w-full  bg-gray-700"></input>
                <p className='text-red-500 font-bold text-lg'>{errorMessage}</p>
                <button className="p-2 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4 text-white cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered Sign In Now."}</p>
            </form>
        </div>
    )
}

export default Login