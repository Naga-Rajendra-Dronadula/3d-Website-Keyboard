'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useScroll, useTransform, motion, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 192;

export default function KeyboardScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // 400vh scroll height
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Map non-linear scroll index to frames if needed, or linear
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loaded: HTMLImageElement[] = [];
            let loadedCount = 0;

            const promises = Array.from({ length: FRAME_COUNT }, (_, i) => {
                const index = i + 1; // 00001, 00002...
                const filename = index.toString().padStart(5, '0') + '.png';

                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/frames/${filename}`;
                    img.onload = () => {
                        loaded[i] = img; // Ensure order
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load ${filename}`);
                        loadedCount++; // Count error as done to avoid hang
                        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                        resolve();
                    };
                });
            });

            await Promise.all(promises);
            setImages(loaded);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Draw logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];
        const { width, height } = canvas;

        // Clear and draw
        ctx.clearRect(0, 0, width, height);

        // Contain fit
        const scale = Math.min(width / img.width, height / img.height);
        const drawW = img.width * scale;
        const drawH = img.height * scale;
        const x = (width - drawW) / 2 - 100; // Manual visual adjustment
        const y = (height - drawH) / 2;

        ctx.drawImage(img, x, y, drawW, drawH);
    };

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                // Use client dimensions to avoid scrollbar mismatch
                // window.innerWidth includes scrollbar, which effectively shifts center to the right.
                // document.documentElement.clientWidth excludes scrollbar.
                const width = document.documentElement.clientWidth;
                // const width = window.innerWidth;
                const height = window.innerHeight; // Keep full height

                // Handle DPR for sharpness
                const dpr = window.devicePixelRatio || 1;

                // Set display size
                canvasRef.current.style.width = `${width}px`;
                canvasRef.current.style.height = `${height}px`;

                // Set actual resolution
                canvasRef.current.width = width * dpr;
                canvasRef.current.height = height * dpr;

                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.scale(dpr, dpr);

                // Redraw current frame
                const currentScroll = scrollYProgress.get();
                const currentIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(currentScroll * (FRAME_COUNT - 1))));
                if (!isLoading && images.length > 0) {
                    renderFrame(currentIndex);
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoading, images, scrollYProgress]);

    // Animation Loop
    useMotionValueEvent(frameIndex, 'change', (latest) => {
        if (!isLoading && images.length === FRAME_COUNT) {
            const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
            requestAnimationFrame(() => renderFrame(idx));
        }
    });

    // Initial draw
    useEffect(() => {
        if (!isLoading && images.length === FRAME_COUNT) {
            renderFrame(0);
        }
    }, [isLoading, images]);


    return (
        <div ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[radial-gradient(circle_at_center,#ffffff_0%,#ECECEC_100%)]">
                <canvas ref={canvasRef} className="block" />

                {/* Loading Overlay */}
                <AnimatePresence>
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#ECECEC] z-50 flex items-center justify-center flex-col gap-4"
                        >
                            <div className="w-8 h-8 border-2 border-black/20 border-t-black/90 rounded-full animate-spin" />
                            <p className="text-black/60 text-sm tracking-tight font-medium">
                                Loading BrewCode sequence... {loadingProgress}%
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Story Overlays, positioned absolutely on top of canvas */}
                {!isLoading && <StoryOverlays scrollYProgress={scrollYProgress} />}
            </div>
        </div>
    );
}

function StoryOverlays({ scrollYProgress }: { scrollYProgress: any }) {
    // Opacity transforms
    const opacity0 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y0 = useTransform(scrollYProgress, [0, 0.2], [0, -20]);

    const opacity1 = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0.2, 0.25], [20, 0]);

    const opacity2 = useTransform(scrollYProgress, [0.55, 0.60, 0.70, 0.8], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.55, 0.60], [20, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.85, 0.90, 1], [0, 1, 1]);
    const y3 = useTransform(scrollYProgress, [0.85, 0.90], [20, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none w-full h-full max-w-7xl mx-auto px-6 md:px-12">

            {/* 0% Center */}
            <motion.div style={{ opacity: opacity0, y: y0 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-black/90 mb-2">BrewCode Keyboard.</h1>
                <p className="text-lg md:text-xl text-black/60 font-medium">Engineered clarity.</p>
            </motion.div>

            {/* 25% Left */}
            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute inset-0 flex flex-col items-start justify-center">
                <div className="max-w-md">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black/90 mb-2">Built for Precision.</h2>
                    <p className="text-lg text-black/60 font-medium">Every detail, measured.</p>
                </div>
            </motion.div>

            {/* 60% Right */}
            <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute inset-0 flex flex-col items-end justify-center">
                <div className="max-w-md text-right">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-black/90 mb-2">Layered Engineering.</h2>
                    <p className="text-lg text-black/60 font-medium">See what’s inside.</p>
                </div>
            </motion.div>

            {/* 90% Center CTA */}
            <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tighter text-white/90 mb-6">Assembled. Ready.</h2>
                <p className="text-lg text-black/60 font-medium mb-8">Scroll back to replay.</p>
                <button className="pointer-events-auto px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors">
                    Pre-order Now
                </button>
            </motion.div>

        </div>
    )
}
