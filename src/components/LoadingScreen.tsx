'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onLoadingChange?: (isLoading: boolean) => void;
}

const loadingBarChars =
    '.. / -.-. .- -. / -.. --- / .- .-.. .-.. / - .... .. ... / - .... .-. --- ..- --. .... / .... .. -- / .-- .... --- / --. .. ...- . ... / -- . / ... - .-. . -. --. - ....';

export default function LoadingScreen({ onLoadingChange }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [, setIsExiting] = useState(false);

    useEffect(() => {
        // Disable scrolling when the loading screen is active
        if (isLoading) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Notify parent component of loading state change
        onLoadingChange?.(isLoading);

        const loadingTimer = setTimeout(() => {
            setIsExiting(true);
        }, 4000);

        const exitTimer = setTimeout(() => {
            setIsLoading(false);
        }, 4000); // 4s + 2s delay
        
        return () => {
            clearTimeout(loadingTimer);
            clearTimeout(exitTimer);
            document.body.style.overflow = ''; // Ensure scrolling is re-enabled when component unmounts
        };
    }, [isLoading, onLoadingChange]);

    const renderAnimatedText = (text: string) => {
        const totalDuration = 1.5; // total time for full word animation
        const delayStep = totalDuration / text.length;

        return (
            <div className="flex space-x-2">
                {text.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ 
                            opacity: 0,
                            y: -20,
                            transition: { duration: 0.5, delay: i * 0.1 }
                        }}
                        transition={{
                            delay: i * delayStep,
                            duration: 0.5,
                        }}
                        className="text-6xl md:text-8xl font-bold uppercase tracking-widest graffiti-font"
                        data-text={char === ' ' ? '\u00A0' : char}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading"
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ 
                        opacity: 0,
                        transition: { duration: 1, delay: 0.5 }
                    }}
                    transition={{ duration: 1 }}
                >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-900 via-fuchsia-900 to-pink-900 opacity-60 animate-gradient-x"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black opacity-80"></div>
                        
                        {/* Animated circles */}
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-900/30 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 100, 0],
                                y: [0, 50, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-fuchsia-900/30 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, -100, 0],
                                y: [0, -50, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-pink-900/30 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                x: [0, 50, 0],
                                y: [0, -100, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-8 w-full">
                        {renderAnimatedText('RENZ')}
                        {/* Loading Bar Section */}
                        <div className="flex flex-col items-center w-full max-w-xl mt-8">
                            <span className="text-lg md:text-xl tracking-widest font-mono mb-2 text-white/80">LOADING</span>
                            <div className="relative w-full h-6 flex items-center">
                                <div className="absolute left-0 right-0 h-2 bg-white/10 rounded-full shadow-lg" />
                                <motion.div
                                    className="absolute left-0 h-2 rounded-full shadow-lg"
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 4, ease: 'linear' }}
                                    style={{
                                        background: 'linear-gradient(90deg, #6d28d9 0%, #ec4899 100%)',
                                        boxShadow: '0 0 16px 4px #ec4899, 0 0 32px 8px #6d28d9'
                                    }}
                                />
                                {/* End caps */}
                                <div className="absolute left-0 w-4 h-2 border-t-2 border-b-2 border-white rounded-l" />
                                <div className="absolute right-0 w-4 h-2 border-t-2 border-b-2 border-white rounded-r" />
                            </div>
                            <div className="w-full overflow-hidden mt-1">
                                <span className="block w-full text-xs font-mono text-white/40 tracking-tight whitespace-nowrap select-none">
                                    {loadingBarChars}
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
