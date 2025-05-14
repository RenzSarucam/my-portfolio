"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";
import React, { useState } from "react";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Lock, Search, Settings, Sparkles, ChevronDown, Mail, X, Home, MessageCircle } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Timeline } from "@/components/ui/timeline";
import { PinContainer } from "@/components/ui/3d-pin";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import LoadingScreen from "@/components/LoadingScreen";

export default function Navbar() {
    const [isLoading, setIsLoading] = useState(true);
    const [showContactModal, setShowContactModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'contact' | 'email'>('contact');
    
    const navItems = [
        { name: "Home", link: "#home" },
        { name: "About", link: "#about" },
        { name: "Educational Backgrounds", link: "#education" },
        { name: "Projects", link: "#projects" },
        { name: "Certifications", link: "#certifications" },
        
    ];

    const handleLoadingChange = (loading: boolean) => {
        setIsLoading(loading);
    };

    return (
        <div className="relative w-full">
            <LoadingScreen onLoadingChange={handleLoadingChange} />
            
            {/* Only render the content when not loading */}
            {!isLoading && (
                <>
                    <FloatingNav navItems={navItems} />
                    <HeroSection />
                    <div id="about" className="bg-black">
                        <GlowingEffectDemo />
                    </div>
                </>
            )}
            {/* Chat-style Contact Modal with AnimatePresence */}
            <AnimatePresence>
                {showContactModal && (
                    <motion.div
                        key="contact-modal"
                        className="fixed inset-0 z-[100] flex items-end justify-end bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                        <div className="relative w-full max-w-sm mx-4 mb-24 bg-neutral-900 rounded-2xl shadow-2xl flex flex-col" style={{ minHeight: 500 }}>
                            {/* Top Bar */}
                            <div className="flex items-center justify-between p-4 border-b border-white/10 rounded-t-2xl bg-black/80">
                                <span className="text-xl font-bold text-white">{activeTab === 'contact' ? 'Contact Us' : 'Direct to Email'}</span>
                                <button
                                    className="text-white/60 hover:text-white"
                                    onClick={() => setShowContactModal(false)}
                                    aria-label="Close"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            {/* Main Content */}
                            <div className="flex-1 p-6 overflow-y-auto">
                                {activeTab === 'contact' && (
                                    <>
                                        <h2 className="text-xl font-bold text-white mb-2">Hi there <span className="inline-block">👋</span></h2>
                                        <p className="text-sm text-neutral-400 mb-6">How can we help?</p>
                                        <form className="flex flex-col gap-4">
                                            <div className="flex gap-4">
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-white mb-1">First name</label>
                                                    <input type="text" className="w-full rounded-lg bg-neutral-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="First name" />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-white mb-1">Last name</label>
                                                    <input type="text" className="w-full rounded-lg bg-neutral-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Last name" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-1">Email</label>
                                                <input type="email" className="w-full rounded-lg bg-neutral-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Email address" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-1">Contact number</label>
                                                <input type="tel" className="w-full rounded-lg bg-neutral-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Contact number" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-white mb-1">Message</label>
                                                <textarea className="w-full rounded-lg bg-neutral-800 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500" rows={4} placeholder="Your message" />
                                            </div>
                                            <button type="submit" className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg">Send Message</button>
                                        </form>
                                    </>
                                )}
                                {activeTab === 'email' && (
                                    <>
                                        <h2 className="text-xl font-bold text-white mb-4">Send Direct Email</h2>
                                        <div className="flex flex-col gap-4">
                                            <button
                                                className="flex items-center gap-3 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-pink-600 to-violet-700 text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg"
                                                onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=renzcarljansen@gmail.com`, '_blank')}
                                                type="button"
                                            >
                                                {/* Gmail SVG */}
                                                <span className="w-6 h-6">
                                                  <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
                                                    <rect width="48" height="48" rx="8" fill="#fff"/>
                                                    <path d="M8 16v16a4 4 0 004 4h24a4 4 0 004-4V16l-16 12L8 16z" fill="#EA4335"/>
                                                    <path d="M40 16V12a4 4 0 00-4-4H12a4 4 0 00-4 4v4l16 12 16-12z" fill="#4285F4"/>
                                                    <path d="M8 16l16 12 16-12" stroke="#34A853" strokeWidth="2"/>
                                                  </svg>
                                                </span>
                                                Gmail
                                            </button>
                                            <button
                                                className="flex items-center gap-3 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-violet-700 to-pink-600 text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg"
                                                onClick={() => window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=muichirotokito1328@gmail.com`, '_blank')}
                                                type="button"
                                            >
                                                {/* Outlook SVG */}
                                                <span className="w-6 h-6">
                                                  <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
                                                    <rect width="48" height="48" rx="8" fill="#fff"/>
                                                    <rect x="8" y="12" width="32" height="24" rx="2" fill="#0072C6"/>
                                                    <rect x="14" y="18" width="20" height="12" rx="1" fill="#fff"/>
                                                    <path d="M14 18l10 7 10-7" stroke="#0072C6" strokeWidth="2"/>
                                                  </svg>
                                                </span>
                                                Outlook
                                            </button>
                                            <button
                                                className="flex items-center gap-3 w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg"
                                                onClick={() => window.open('https://www.facebook.com/renz134542770/', '_blank')}
                                                type="button"
                                            >
                                                {/* Messenger SVG */}
                                                <span className="w-6 h-6">
                                                  <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
                                                    <circle cx="24" cy="24" r="20" fill="#fff"/>
                                                    <circle cx="24" cy="24" r="18" fill="url(#messenger-gradient)"/>
                                                    <defs>
                                                      <linearGradient id="messenger-gradient" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
                                                        <stop stopColor="#0099FF"/>
                                                        <stop offset="1" stopColor="#A033FF"/>
                                                      </linearGradient>
                                                    </defs>
                                                    <path d="M16 30l7-7 5 5 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                  </svg>
                                                </span>
                                                Messenger
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* Bottom Navigation */}
                            <div className="flex items-center justify-around border-t border-white/10 bg-black/80 rounded-b-2xl p-2">
                                <button
                                    className={`flex flex-col items-center flex-1 py-2 rounded-xl transition-all ${activeTab === 'contact' ? 'bg-white/10 text-pink-400' : 'text-white/60'}`}
                                    onClick={() => setActiveTab('contact')}
                                >
                                    <Home className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-semibold">Contact Us</span>
                                </button>
                                <button
                                    className={`flex flex-col items-center flex-1 py-2 rounded-xl transition-all ${activeTab === 'email' ? 'bg-white/10 text-pink-400' : 'text-white/60'}`}
                                    onClick={() => setActiveTab('email')}
                                >
                                    <MessageCircle className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-semibold">Direct to Email</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Floating Contact Button (always visible, above modal) */}
            {!isLoading && (
                <button
                    onClick={() => setShowContactModal((prev) => !prev)}
                    className="fixed bottom-6 right-6 z-[200] bg-gradient-to-r from-violet-700 to-pink-600 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                    title="Contact Me"
                >
                    <Mail className="w-7 h-7 text-white" />
                </button>
            )}
        </div>
    );
}

const HeroSection: React.FC = () => {
    return (
        <div id="home" className="min-h-screen w-full bg-black relative overflow-hidden">
            <div className="absolute inset-0">
                <BackgroundBeams />
            </div>

            <div className="relative z-10 min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col items-center justify-center">
                        <motion.div
                            className="flex flex-col items-center max-w-xl"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { duration: 0.5 } }
                            }}
                        >
                            <div className="space-y-6 text-center">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 whitespace-nowrap overflow-hidden text-ellipsis">
                                    Renz CarlJansen Sarucam
                                </h1>
                                <p className="text-2xl md:text-3xl text-neutral-400">
                                    Web Developer | UI/UX Designer | IoT Developer
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center w-full">
                                <button className="px-25 py-3 rounded-2xl bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white font-medium 
                  hover:opacity-90 transition-all duration-200 shadow-lg shadow-purple-500/25">
                                    Hire Me
                                </button>
                                <button className="px-20 py-3 rounded-2xl border border-white/10 text-white font-medium 
                  hover:bg-white/5 transition-all duration-200 backdrop-blur-sm">
                                    Download CV
                                </button>
                            </div>
                            
                            {/* Double Arrow Down Icon */}
                            <motion.div 
                                className="mt-16"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0,
                                    transition: { 
                                        delay: 1,
                                        duration: 0.5
                                    }
                                }}
                            >
                                <motion.div
                                    animate={{ 
                                        y: [0, 10, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        ease: "easeInOut"
                                    }}
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => {
                                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    <ChevronDown className="h-6 w-6 text-white/70" />
                                    <ChevronDown className="h-6 w-6 text-white/70 -mt-3" />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export function GlowingEffectDemo() {
    return (
        <div className="min-h-screen w-full bg-black">
            {/* Grid Items Section */}
            <div className="p-8">
                <ul className="grid h-[calc(100vh-4rem)] grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 xl:grid-rows-2">
                    <GridItem
                        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
                        icon={<Box className="h-4 w-4 text-white" />}
                        title="🧑‍💻 Hi, I'm Renz Carljansen"
                        description="I'm a UI/UX Designer, Web Designer, and Web Developer who turns ideas into visually stunning, user-focused digital experiences. I combine design and development to build intuitive, engaging interfaces that feel as good as they look. With a strong eye for detail and a drive to keep learning, I'm always exploring new tools and technologies to create future-ready, meaningful solutions. Let's build something extraordinary together."
                        image="/profpic.JPG"
                    />

                    <GridItem
                        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
                        icon={<Settings className="h-4 w-4 text-white" />}
                        title="💡 What I Do?"
                        description="I design and build seamless websites and digital interfaces that are visually compelling, highly functional, and tailored to real user needs. Every project I take on is more than just pixels and code — it's about creating a full experience that feels smooth, intuitive, and purposeful.From wireframes to final development, I carefully craft each detail — ensuring that design, responsiveness, accessibility, and performance come together in perfect harmony. Whether it's a bold landing page, a clean portfolio, or a complex web app, I make sure the end result not only looks great but works flawlessly across all devices."
                        image="/WHAT.png"
                    />

                    <GridItem
                        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
                        icon={<Lock className="h-4 w-4 text-white" />}
                        title="🧠 Why I Do It?"
                        description="Designing is more than just a job for me — it's my way of solving real problems through creativity and logic. I find fulfillment in transforming complex ideas or challenges into clean, user-centered experiences that feel intuitive and effortless.Whether it's a simple website or a full digital product, I approach each project with empathy, always thinking from the user's perspective. I love the challenge of balancing aesthetics with function — crafting experiences that not only look great but work beautifully. Every project is an opportunity to make technology feel more human."
                        image="/WHY.png"
                    />

                    <GridItem
                        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
                        icon={<Sparkles className="h-4 w-4 text-white" />}
                        title="🚀 Always Learning"
                        description="I'm driven by curiosity and fueled by change. In a world where technology evolves fast, I stay ahead by continuously exploring new tools, frameworks, and design trends. Whether it's diving into a new programming language, mastering the latest UI techniques, or experimenting with micro-interactions — I thrive on the excitement of learning.For me, growth isn't optional — it's part of the job. Every project is a chance to refine my skills, challenge my thinking, and push creative boundaries. I believe the best designers never stop being students."
                        image="/AL.png"
                    />

                    <GridItem
                        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
                        icon={<Search className="h-4 w-4 text-white" />}
                        title="🤝 Let's Collaborate"
                        description="If you're looking for someone who can design, develop, and breathe life into digital ideas — let's team up. I bring creativity, strategy, and technical skill to the table, turning visions into experiences that truly connect with users. Whether you're starting from scratch or improving what already exists, I'm here to help build something thoughtful, impactful, and uniquely yours. Let's create something that not only looks great — but leaves a lasting impression."
                        image="/LC2.png"
                    />
                </ul>
            </div>

            {/* Timeline Section */}
            <div id="education" className="w-full">
                <h2 className="text-3xl font-bold text-white mb-12 text-center"></h2>
                <TimelineDemo />
            </div>
            
            {/* Projects Section */}
            <div id="projects" className="w-full ">
                <AnimatedPinDemo />
                
                {/* Certifications Section with Moving Cards */}
                <div id="certifications" className="w-full mt-96 pb-20">
                    <InfiniteMovingCardsDemo />
                </div>
            </div>
        </div>
    );
}

interface GridItemProps {
    area: string;
    icon: React.ReactNode;
    title: string;
    description: React.ReactNode;
    image?: string;
}

const GridItem = ({ area, icon, title, description, image }: GridItemProps) => {
    return (
        <li className={`min-h-[14rem] list-none ${area}`}>
            <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="border-0.75 relative flex h-full flex-col gap-4 overflow-hidden rounded-xl p-6 md:p-6 bg-white/5 backdrop-blur-sm">
                    {/* Background Image */}
                    {image && (
                        <div className="absolute inset-0 -z-10">
                            <Image
                                src={image}
                                alt="Background"
                                fill
                                className={`object-cover opacity-50 ${
                                    title.includes("What I Do") || 
                                    title.includes("Always Learning") || 
                                    title.includes("Let's Collaborate") 
                                        ? "object-center"
                                        : "object-top"
                                }`}
                                priority
                            />
                        </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex items-center gap-4">
                        <div className="w-fit rounded-lg border border-white/20 p-2">
                            {icon}
                        </div>
                        <h3 className="-tracking-4 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                            {title}
                        </h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center px-2">
                        <h2 className="font-sans text-sm/[1.375rem] text-white/70 md:text-base/[1.675rem] text-justify hyphens-auto">
                            {description}
                        </h2>
                    </div>
                </div>
            </div>
        </li>
    );
};

export function TimelineDemo() {
    const data = [
        {
            title: "2021 - 2025",
            content: (
                <div className="text-center">
                    <p className="mb-8 text-xl font-bold text-white md:text-2xl">
                        College
                    </p>
                    <p className="mb-8 text-base font-normal text-white md:text-lg">
                        Bachelor of Science in Information Technology
                    </p>
                    <p className="mb-8 text-base font-normal text-white md:text-lg">
                        Holy Cross of Davao College
                    </p>
                    <div className="mb-8 flex flex-col items-center">
                    
                    </div>
                </div>
            ),
        },
        {
            title: "2018 - 2020",
            content: (
                <div className="text-center">
                    <p className="mb-8 text-xl font-bold text-white md:text-2xl">
                        Senior High School
                    </p>
                    <p className="mb-8 text-base font-normal text-white md:text-lg">
                       ICT - Information and Communication Technology
                    </p>
                    <p className="mb-8 text-base font-normal text-white md:text-lg">
                        Assumption College of Davao
                    </p>
                    <div className="mb-8 flex flex-col items-center">
                       
                        <div className="flex items-center gap-2 text-base text-white md:text-lg">
                            ✅ Graduated with Honors
                        </div>
                        
                    </div>
                </div>
            ),
        },
        {
            title: "2014 - 2018",
            content: (
                <div className="text-center">
                    <p className="mb-8 text-xl font-bold text-white md:text-2xl">
                       Junior High School
                    </p>
                    <p className="mb-8 text-base font-normal text-white md:text-lg">
                        Don Manuel A. Javellana Memorial National High School
                    </p>
                    <div className="mb-8 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-base text-white md:text-lg">
                            ✅ Badminton Player
                        </div>
                        <div className="flex items-center gap-2 text-base text-white md:text-lg">
                            ✅ ICT Club Member
                        </div>
                
                    </div>
                </div>
            ),
        },
        {
            title: "2007 - 2014",
            content: (
                <div className="text-center">
                    <p className="mb-8 text-xl font-bold text-white md:text-2xl">
                        Elementary                    </p>
                    <p className="mb-8 text-base font-normal text-white md:text-lg">
                        Magsaysay Elementary School                    </p>
                    <div className="mb-8 flex flex-col items-center">
                        <div className="flex items-center gap-2 text-base text-white md:text-lg">
                            ✅ Volleyball Player                        </div>
                        <div className="flex items-center gap-2 text-base text-white md:text-lg">
                            ✅ DLC Club Member
                        </div>
                        
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full min-h-screen overflow-clip bg-black">
            <div className="relative w-full h-full">
                <div className="absolute inset-0 z-0">
                    <GlowingEffect
                        spread={90}
                        glow={true}
                        disabled={false}
                        proximity={150}
                        inactiveZone={0.1}
                        blur={20}
                        borderWidth={2}
                    />
                </div>
                <div className="relative z-10 pb-40">
                    <Timeline data={data} />
                </div>
            </div>
        </div>
    );
}

export function AnimatedPinDemo() {
    const handleClick = (url: string) => {
        window.open(url, '_blank');
    };
    
    const projects = [
        {
            title: "TrackGuard Admin Panel",
            description: "Smart and secure control center for tracking, managing, and safeguarding your data—all in one powerful dashboard.",
            link: "https://github.com/RenzSarucam/Trackguard-WebAdmin",
            color: "from-violet-500 via-purple-500 to-blue-500",
            tags: ["ReactJS", "Firebase", "JavaScript"],
            icon: "🛡️",
            image: "/admin.png"
        },
        {
            title: "TrackGuard Mobile App",
            description: "Real-time tracking and smart protection—right in your pocket. Stay connected, stay secure, anytime, anywhere.",
            link: "https://github.com/RenzSarucam/trackguard-mobile",
            color: "from-emerald-500 via-teal-500 to-cyan-500",
            tags: ["ReactNative", "API", "Firebase"],
            icon: "🛡️",
            image: "/mob.jpg"
        },
        {
            title: "TrueNest Seekers Website Design",
            description: "A sleek real estate platform helping seekers find their perfect nest with ease, style, and smart location tools.",
            link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
            color: "from-orange-500 via-amber-500 to-yellow-500",
            tags: ["Figma"],
            icon: "🏠",
            image: "/w1.png"
        },
        {
            title: "TrueNest Seekers Mobile Design",
            description: "A seamless real estate experience at your fingertips—explore, discover, and secure your dream home with ease and elegance.",
            link: "https://github.com",
            color: "from-pink-500 via-rose-500 to-red-500",
            tags: ["Figma"],
            icon: "🏠",
            image: "/mb1.png"
        },
        // Second row of projects
        {
            title: "Clotify Ecomm",
            description: "Style meets simplicity—your personalized fashion destination with seamless shopping at your fingertips.",
            link: "https://github.com/RenzSarucam/Clothify-Ecomm",
            color: "from-blue-500 via-indigo-500 to-purple-500",
            tags: ["Python", "Django", "HTML", "CSS", "JavaScript"],
            icon: "👕",
            image: "/clot.png"
        },
        {
            title: "Good Taste",
            description: "Curated elegance in every bite. Savor the finest flavors and elevate your dining experience.",
            link: "https://www.figma.com/design/IPXOqKQOcXlH7s8wb1xK24/Good-Taste?node-id=0-1&t=dYubPY7NNZECtJVD-1",
            color: "from-green-500 via-emerald-500 to-teal-500",
            tags: ["Figma"],
            icon: "🍲",
            image: "/GT.png"
        },
        {
            title: "Facebook Clone",
            description: "A sleek, social experience—connect, share, and engage with friends and communities, just like the original.",
            link: "https://www.figma.com/design/Els0kit8BXfniyEsmdE48Y/HCIACtivity1?node-id=0-1&t=jXQKsUDKxx88GlDi-1",
            color: "from-yellow-500 via-amber-500 to-orange-500",
            tags: ["Figma"],
            icon: "📘",
            image: "/fb.png"
        },
        {
            title: "JIT (Jairo Institute of Technology) Design",
            description: "Culinary app for discovering recipes based on available ingredients with filtering and saving options.",
            link: "https://www.figma.com/design/aMb9FTGYo8G0MlHldnoxxa/MVP-%7C-JIT?node-id=352-2321&t=7TiJ5HnhQp1ffiPJ-1",
            color: "from-yellow-500 via-amber-500 to-orange-500",
            tags: ["Figma" ],
            icon: "🎓",
            image: "/jit.png"
        },
        {
            title: "Travel Planner",
            description: "Trip planning application with itinerary creation, expense tracking, and location recommendations.",
            link: "https://github.com",
            color: "from-red-500 via-pink-500 to-rose-500",
            tags: ["React", "Node.js", "Google Maps API"],
            icon: "✈️",
            image: "/AL.png"
        }
    ];
    
    return (
        <>
            
            <div className="py-20 w-full flex flex-col items-center justify-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 text-center">Projects</h2>
                <div className="max-w-7xl w-full flex flex-col md:flex-row flex-wrap items-center justify-center gap-16">
                    {projects.map((project, index) => (
                        <div key={index} onClick={() => handleClick(project.link)}>
                            <PinContainer
                                title={project.title}
                                href={project.link}
                            >
                                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[18rem] h-[18rem]">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">{project.icon}</span>
                                        <h3 className="max-w-xs !m-0 font-bold text-base text-slate-100">
                                            {project.title}
                                        </h3>
                                    </div>
                                    
                                    <div className="text-sm !m-0 !pb-2 !pt-1 font-normal">
                                        <span className="text-slate-300">
                                            {project.description}
                                        </span>
                                    </div>
                                    
                                    {/* Project Image */}
                                    <div className="flex flex-1 w-full mt-auto overflow-hidden rounded-lg relative group">
                                        {/* Fallback gradient if image fails to load */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`}></div>
                                        
                                        {/* Project image */}
                                        <div className="absolute inset-0 bg-cover bg-center" style={{ 
                                            backgroundImage: `url(${project.image})`,
                                            backgroundSize: 'cover'
                                        }}></div>
                                        
                                        {/* Overlay with tags on hover */}
                                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center flex-wrap gap-2 p-3 transition-opacity duration-300">
                                            {project.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/20 text-white shadow-sm"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </PinContainer>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export function InfiniteMovingCardsDemo() {
    return (
        <div className="w-full">
            <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 z-0">
                        <GlowingEffect
                            spread={70}
                            glow={true}
                            disabled={false}
                            proximity={120}
                            inactiveZone={0.1}
                            blur={15}
                            borderWidth={1}
                        />
                    </div>
                    <h2 className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-16 text-center">Certifications</h2>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <InfiniteMovingCards
                            items={testimonials}
                            direction="right"
                            speed="fast"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const testimonials = [
    {
        image: "/1.jpg"
    },
    {
        image: "/2.jpg"
    },
    {
        image: "/3.jpg"
    },
    {
        image: "/4.jpg"
    },
    {
        image: "/5.jpg"
    },
    {
        image: "/6.jpg"
    },
    {
        image: "/7.jpg"
    },
    {
        image: "/8.jpg"
    },
    {
        image: "/9.jpg"
    },
    {
        image: "/10.jpeg"
    }
];


