import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo, smallHeroVideo } from "../utils/index.js";
import { useEffect, useState } from "react";

export const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(
        window.innerWidth < 760 ? smallHeroVideo : heroVideo
    );

    const handleVideoSrcSet = () => {
        setVideoSrc(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
    };

    useEffect(() => {
        window.addEventListener("resize", handleVideoSrcSet);
        return () => {
            window.removeEventListener("resize", handleVideoSrcSet);
        };
    }, []);

    useGSAP(() => {
        gsap.to("#hero", {
            opacity: 1,
            delay: 1.5,

        });
        gsap.to("#cta", {
            opacity: 1,
            y: -50,
            delay: 1.8,
        });
    }, []);

    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 w-full flex-center flex-col">
                <p id="hero" className="hero-title">Iphone 15 Pro</p>
                <div className="md:w-10/12 w-9/12">
                    <video
                        className="pointer-events-none"
                        autoPlay
                        muted
                        playsInline
                        loop
                        key={videoSrc}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                <a
                    href="#highlights"
                    className="hover:scale-110 hover:shadow-lg hover:shadow-amber-50 ease-in-out duration-300 bg-transparent border-2 items-center border-white px-6 py-2 mb-3 rounded-xl"
                >
                    Buy
                </a>
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>
        </section>
    );
};
