"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 20%", "end 80%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-black dark:bg-black font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto pt-30 px-4 md:px-8 lg:px-10 text-center">

                <h2 className="text-xl md:text-2xl lg:text-3xl mb-4 text-white max-w-4xl mx-auto font-bold">
                    My Educational Journey
                </h2>
                <p className="text-white text-lg md:text-xl max-w-3xl mx-auto">
                    A timeline of my academic achievements and educational background.
                </p>
            </div>

            <div ref={ref} className="relative max-w-3xl mx-auto pb-40 px-4">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row items-center md:items-start justify-center pt-8 md:pt-20 mb-12"
                    >
                        <div className="relative flex items-center justify-center md:justify-end w-full md:w-1/2 md:pr-8">
                            
                            <h3 className="hidden md:block text-xl md:text-[22px] pl-16 md:pl-0 font-bold text-white md:text-right">
                                {item.title}
                            </h3>
                        </div>

                        <div className="md:w-1/2 pl-8 md:pl-8 pr-2 max-w-md flex flex-col items-center md:items-start">
                            <h3 className="md:hidden block text-[22px] mb-2 text-center font-bold text-white">
                                {item.title}
                            </h3>
                            <div className="w-full">
                                {item.content}
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute left-1/4 transform -translate-x-1/4 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-gray-600 dark:via-gray-600 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
