import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { rightImg, watchImg } from "../utils/index.js";
import {VideoCarousel} from "./VideoCarousel.jsx";

gsap.registerPlugin(ScrollTrigger);

export const Highlights = () => {
    useEffect(() => {
        gsap.to('#title', {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: '#title',
                start: 'bottom bottom',

            },
           
        });

        gsap.to('.link', {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
            scrollTrigger: {
                trigger: '.link',
                start: 'bottom bottom',
                toggleActions: 'play none none none'

            },

        });
    }, []);

    return (
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-12 w-full items-end justify-between md:flex">
                    <h1 id="title" className="section-heading">Get the highlight</h1>
                    <div className="flex flex-wrap gap-5 items-end">
                        <p className="link">Watch the film
                            <img src={watchImg} alt="watch" className="ml-2" />
                        </p>
                        <p className="link">Watch the event
                            <img src={rightImg} alt="watch" className="ml-2" />
                        </p>
                    </div>
                </div>

                <VideoCarousel/>
            </div>

        </section>
    );
};
