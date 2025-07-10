import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(store => store?.user);
    const showGptSearch = useSelector(store => store.gpt.showGptSearch)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: USER_AVATAR }))
                navigate("/browse")
            } else {
                dispatch(removeUser())
                navigate("/")
            }
        });
        return () => unsubscribe();
    }, [])

    const handleSignOut = () => {
        signOut(auth).then(() => {

        }).catch((error) => {
            // An error happened.
            navigate("/error")
        });

    }

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div className="flex justify-between w-screen absolute px-8  bg-gradient-to-b from-black z-10">
            <img className="w-44" src={LOGO} ></img>
            {user && <div className='flex'>
                {showGptSearch && <select className='px-4 text-white my-5 mx-2 bg-gray-900' onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
                </select>}
                <button className='h-12 px-4  bg-purple-800 text-white rounded-lg mx-4 my-5' onClick={handleGptSearchClick}>{showGptSearch ? "Homepage" : "GPT Search"}</button>
                <img alt='usericon' className='w-12 h-12 my-4' src={user.photoURL} />
                <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
            </div>}

        </div>
    )
}

export default Header