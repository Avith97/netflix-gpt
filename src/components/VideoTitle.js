
const VideoTitle = ({ title, overview }) => {
    return (
        <div className="w-screen aspect-video pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black">
            <h1 className="text-6xl font-bold">{title}</h1>
            <p className="py-6 text-lg w-1/4">{overview}</p>
            <div className="">
                <button className="bg-white font-bold text-black py-4 px-10 text-xl rounded-lg hover:bg-opacity-80">Play</button>
                <button className="bg-gray-600 font-bold text-white py-4 px-10 text-xl rounded-lg mx-2 hover:bg-opacity-80">More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle