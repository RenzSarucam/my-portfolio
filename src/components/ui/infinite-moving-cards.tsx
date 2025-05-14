"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        id?: string;
        quote?: string;
        name?: string;
        title?: string;
        image?: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards",
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse",
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "30s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "50s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "90s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className,
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]",
                )}
            >
                {items.map((item, index) => (
                    <li
                        className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-700 bg-[linear-gradient(180deg,#27272a,#18181b)] px-8 py-6 md:w-[450px] overflow-hidden"
                        key={item.id || `item-${index}`}
                    >
                        <blockquote className="relative z-20 flex flex-col h-full">
                            {/* Certificate Image */}
                            {item.image && (
                                <div className=" w-full h-60 mb-4 overflow-hidden rounded-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.title || 'Certificate'}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                            
                            {item.quote && (
                                <span className="relative z-20 text-sm leading-[1.6] font-normal text-gray-100">
                                    {item.quote}
                                </span>
                            )}

                            {(item.name || item.title) && (
                                <div className="relative z-20 mt-auto pt-4 flex flex-row items-center">
                                    <span className="flex flex-col gap-1">
                                        {item.name && (
                                            <span className="text-sm leading-[1.6] font-semibold text-gray-300">
                                                {item.name}
                                            </span>
                                        )}
                                        {item.title && (
                                            <span className="text-sm leading-[1.6] font-normal text-gray-400">
                                                {item.title}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
