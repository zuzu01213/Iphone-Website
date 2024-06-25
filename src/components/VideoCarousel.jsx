import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants/index.js";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils/index.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "react-use";

gsap.registerPlugin(ScrollTrigger);

export const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState({});
    const { isEnd, isLastVideo, isPlaying, videoId, startPlay } = video;

    useIsomorphicLayoutEffect(() => {
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: 'power2.inOut'
        });

        gsap.to(`#video-${videoId}`, {
            scrollTrigger: {
                trigger: `#video-${videoId}`,
                toggleActions: 'restart none none none',
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [videoId]);

    useEffect(() => {
        const videoElement = videoRef.current[videoId];
        if (Object.keys(loadedData).length > 3) {
            if (!isPlaying && videoElement) {
                videoElement.pause();
            } else if (startPlay && videoElement) {
                videoElement.play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleLoadedMetadata = (i, e) => {
        setLoadedData((prev) => ({ ...prev, [i]: e.target.duration }));
    };

    useEffect(() => {
        let currentProgress = 0;
        const spanElement = videoSpanRef.current[videoId];
        const videoElement = videoRef.current[videoId];

        if (spanElement) {
            const anim = gsap.to(spanElement, {
                onUpdate: () => {
                    const progress = Math.ceil(anim.progress() * 100);
                    if (progress !== currentProgress) {
                        currentProgress = progress;

                        gsap.to(videoDivRef.current[videoId], {
                            width: window.innerWidth < 760
                                ? '10vw'
                                : window.innerWidth < 1200
                                    ? '10vw'
                                    : '4vw'
                        });

                        gsap.to(spanElement, {
                            width: `${currentProgress}%`,
                            backgroundColor: 'white',
                        });
                    }
                },
                onComplete: () => {
                    if (isPlaying) {
                        gsap.to(videoDivRef.current[videoId], {
                            width: '12px'
                        });
                        gsap.to(spanElement, {
                            backgroundColor: '#afafaf'
                        });
                    }
                },
            });

            const animUpdate = () => {
                anim.progress(videoElement.currentTime / loadedData[videoId]);
            };

            if (isPlaying) {
                gsap.ticker.add(animUpdate);
            } else {
                gsap.ticker.remove(animUpdate);
            }

            return () => {
                anim.kill();
                gsap.ticker.remove(animUpdate);
            };
        }
    }, [videoId, startPlay, isPlaying, loadedData]);

    const handleProcess = (type) => {
        switch (type) {
            case 'video-end':
                setVideo((prev) => ({
                    ...prev,
                    isEnd: true,
                    videoId: prev.videoId + 1,
                    isLastVideo: prev.videoId + 1 === hightlightsSlides.length,
                }));
                break;
            case 'video-last':
                setVideo((prev) => ({
                    ...prev,
                    isLastVideo: true,
                }));
                break;
            case 'video-reset':
                setVideo({
                    isEnd: false,
                    startPlay: false,
                    videoId: 0,
                    isLastVideo: false,
                    isPlaying: false,
                });
                break;
            case 'play':
                setVideo((prev) => ({
                    ...prev,
                    isPlaying: !prev.isPlaying,
                }));
                break;

            default:
                break;
        }
    };

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full rounded-3xl overflow-hidden flex-center bg-black">
                                <video
                                    id={`video-${i}`}
                                    playsInline
                                    preload="auto"
                                    muted
                                    className={`${
                                        list.id === 2 && 'translate-x-44'}
                                        pointer-events-none
                                    }`}
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                                    onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                                    onEnded={() => handleProcess(i !== hightlightsSlides.length - 1 ? 'video-end' : 'video-last')}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text) => (
                                    <p key={text} className="md:text-2xl text-xl font-medium">
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
                    {hightlightsSlides.map((_, i) => (
                        <span
                            key={i}
                            ref={(el) => (videoDivRef.current[i] = el)}
                            className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer"
                        >
                            <span className="absolute h-full w-full rounded-full" ref={(el) => (videoSpanRef.current[i] = el)}></span>
                        </span>
                    ))}
                </div>

                <button className="control-btn" onClick={() => handleProcess(isLastVideo ? 'video-reset' : 'play')}>
                    <img src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg} alt={isLastVideo ? 'replay' : isPlaying ? 'pause' : 'play'} />
                </button>
            </div>
        </>
    );
};
