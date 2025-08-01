import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

const VideoBackground = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useMovieTrailer(movieId);

    return (
        <div >
            <iframe
                className="w-screen aspect-video"
                src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
                title="YouTube video player"
                allow="autoplay; encrypted-media"
                allowFullScreen
                frameBorder="0"
            ></iframe>

        </div >
    )
}

export default VideoBackground