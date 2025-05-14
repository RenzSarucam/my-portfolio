/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { JSX, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion"; // Changed from motion/react to framer-motion
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // Import menu and close icons

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        if (typeof current === "number") {
            // Only hide the navbar when at the top of the page
            if (scrollYProgress.get() < 0.05) {
                setVisible(false);
            } else {
                // Show navbar when scrolling down or up
                setVisible(true);
            }
        }
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-violet-500/20 rounded-full bg-gradient-to-r from-violet-850/90 via-fuchsia-850/90 to-pink-850/90 backdrop-blur-sm shadow-lg shadow-violet-500/20 z-[5000] px-5 md:px-8 py-3 items-center justify-center",
                    className,
                )}
            >
                {/* Burger Icon for Mobile */}
                <div className="block md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white p-1 hover:text-violet-300 transition-colors"
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-center space-x-6">
                    {navItems.map((navItem: any, idx: number) => (
                        <a
                            key={`link=${idx}`}
                            href={navItem.link}
                            className={cn(
                                "relative text-white/80 items-center flex hover:text-white transition-colors duration-200",
                                "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-violet-500 after:to-pink-500",
                                "hover:after:w-full after:transition-all after:duration-300"
                            )}
                        >
                            <span className="text-sm font-medium">
                                {navItem.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-16  bg-gradient-to-r from-violet-850/95 via-fuchsia-850/95 to-pink-850/95 rounded-xl border border-violet-500/20 shadow-lg shadow-violet-500/20 backdrop-blur-sm py-5 px-6 z-10 flex flex-col items-center"
                        >
                            <div className="flex flex-col items-center w-full max-w-xs">
                                <div className="border-b border-white/10 pb-3 mb-3 w-full text-center">
                                    <h3 className="text-white font-semibold">Navigation Menu</h3>
                                </div>
                                
                                <div className="py-2 grid gap-3 w-full">
                                    {navItems.map((navItem: any, idx: number) => (
                                        <a
                                            key={`mobile-link=${idx}`}
                                            href={navItem.link}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={cn(
                                                "relative text-white/90 flex justify-center items-center transition-colors duration-200 py-3 rounded-lg hover:bg-white/10 hover:text-white border-b border-white/5 last:border-0 mx-2",
                                            )}
                                        >
                                            <span className="font-medium">
                                                {navItem.name}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                                
                                <div className="mt-4 pt-3 border-t border-white/10 w-full flex justify-center">
                                    <button 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="px-5 py-2 rounded-lg text-white/80 text-xs font-medium hover:text-white flex items-center justify-center hover:bg-white/5 transition-colors"
                                    >
                                        <X className="h-3 w-3 mr-2" /> Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
};
