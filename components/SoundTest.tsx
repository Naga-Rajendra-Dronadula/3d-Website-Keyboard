'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Mic } from 'lucide-react';

export default function SoundTest() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.volume = 0.5;
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                        })
                        .catch(error => {
                            console.error("Audio playback failed:", error);
                            setIsPlaying(false);
                        });
                }
            }
        }
    };

    return (
        <section className="py-32 px-6 md:px-12 bg-[#ECECEC] text-black">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">

                {/* Hidden Audio Element with Standard SoundJay URL */}
                <audio
                    ref={audioRef}
                    src="sounds/keyboard.m4a"
                    onEnded={() => setIsPlaying(false)}
                    onError={(e) => console.error("Audio loading error:", e)}
                />

                {/* Text Side */}
                <div className="flex-1 space-y-8">
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter">
                        Hear the <br /> Distinction.
                    </h2>
                    <p className="text-lg text-black/60 max-w-md">
                        Acoustics aren't an afterthought; they are the design.
                        Experience the deep, thocky signature sound of our custom-lubed GhostKeys switches.
                    </p>

                    <div className="p-6 rounded-2xl border border-black/10 bg-white/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                            <h3 className="text-xl font-medium mb-2">GhostKeys Signature</h3>
                        </div>
                        <p className="text-sm text-black/60">
                            Factory lubed linear switches. High-density Polycarbonate plate.
                            Poron gasket mounted for a clean, resonant-free acoustic profile.
                        </p>
                    </div>
                </div>

                {/* Visualizer Side */}
                <div className="flex-1 w-full flex justify-center">
                    <div className="relative w-full max-w-md aspect-square bg-[#E6E6E6] rounded-3xl flex items-center justify-center overflow-hidden border border-white/50 shadow-inner">

                        {/* Play Button Overlay */}
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePlay}
                            className="z-10 w-24 h-24 bg-black rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform"
                        >
                            {isPlaying ? <Mic className="w-10 h-10 animate-pulse" /> : <Volume2 className="w-10 h-10" />}
                        </motion.button>

                        {/* Simulated Waveform (Reacts to 'isPlaying') */}
                        <div className="absolute inset-0 flex items-center justify-center gap-1.5 opacity-30">
                            {Array.from({ length: 32 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 bg-black rounded-full"
                                    animate={isPlaying ? {
                                        height: [
                                            20 + Math.random() * 20,
                                            40 + Math.random() * 80,
                                            20 + Math.random() * 20
                                        ]
                                    } : { height: 10 }}
                                    transition={isPlaying ? {
                                        repeat: Infinity,
                                        duration: 0.15,
                                        ease: "easeInOut",
                                        delay: i * 0.02
                                    } : { duration: 0.5 }}
                                />
                            ))}
                        </div>

                        <p className="absolute bottom-8 text-xs font-mono tracking-widest text-black/40 uppercase">
                            {isPlaying ? 'Playing Audio Sample...' : 'Tap for Sound Test'}
                        </p>

                    </div>
                </div>

            </div>
        </section>
    );
}
