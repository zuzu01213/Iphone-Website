import { hightlightsSlides } from "../constants/index.js";

export const VideoCarousel = () => {
    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full rounded-3xl overflow-hidden flex-center bg-black">
                                <video>
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};
