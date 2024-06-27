import { Html } from '@react-three/drei';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export const Loader = () => {
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to("#apple", { rotation: 360, duration: 1, ease: "power2.inOut" });

        return () => {
            tl.kill(); // Cleanup GSAP timeline on unmount
        };
    }, []);

    return (
        <Html>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full flex justify-center items-center shadow-lg">
                    <div className="w-20 h-20 bg-white rounded-full border-4 border-gray-200 flex justify-center items-center" >
                        <img
                            src="/apple.png"
                            alt="iPhone Icon"
                            className="w-12 h-12"
                            id="apple"
                        />
                    </div>
                </div>
            </div>
        </Html>
    );
};
