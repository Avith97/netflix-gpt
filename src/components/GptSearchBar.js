import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    //const gptQuery =
    //"Act as a Movie recommendation system and suggest some movies for the query" +
    //searchText +
    "only give me names of 5 movies , comma seperated like the example resut ahead. Example Result: Gadar, Sholay , Don , WAR, Dhoom ";
    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });
    const movies = [
      "Taare Zameen Par",
      "Hera Pheri",
      "Kahaani",
      "Singham",
      "Dilwale Dulhania Le Jayenge",
    ];
    const promiseAArray = movies.map((movie) => searchMovieTMDB(movie));
    const tmdbMovie = await Promise.all(promiseAArray);
    console.log(tmdbMovie);
    dispatch(
      addGptMovieResult({ movieNames: movies, movieResults: tmdbMovie })
    );
  };

  return (
    <div className="pt-[9%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-3 m-3 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button
          className="px-4 py-2 bg-red-700 text-white rounded-lg col-span-3 m-3"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
