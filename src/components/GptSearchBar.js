import { useSelector } from "react-redux"
import lang from "../utils/languageConstants"

const GptSearchBar = () => {
    const langKey = useSelector(store => store.config.lang);
    return (
        <div className="pt-[9%] flex justify-center">
            <form className='bg-black w-1/2 grid grid-cols-12'>
                <input type='text' className='p-3 m-3 col-span-9' placeholder={lang[langKey].gptSearchPlaceHolder} />
                <button className='px-4 py-2 bg-red-700 text-white rounded-lg col-span-3 m-3'>{lang[langKey].search}</button>
            </form>
        </div>
    )
}

export default GptSearchBar