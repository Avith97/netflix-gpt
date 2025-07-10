import { useSelector } from "react-redux"
import MovieList from "./MovieList"

const SecondaryContainer = () => {
    const movies = useSelector(store => store.movies)

    return (
        <div className="bg-black w-screen">
            <div className="-mt-28 relative z-20">
                <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
            </div>
            <MovieList title={"Trending"} movies={movies.nowPlayingMovies} />
            <MovieList title={"Popular"} movies={movies.popularMovies} />
            <MovieList title={"Upcoming"} movies={movies.popularMovies} />
        </div>
    )
}

export default SecondaryContainer