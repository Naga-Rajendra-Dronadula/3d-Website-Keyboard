'use client';

import { motion } from 'framer-motion';

export default function Navigation() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-4 md:px-12 backdrop-blur-md bg-[#ECECEC]/60 border-b border-black/5"
        >
            <div className="w-full max-w-7xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl tracking-tight">GhostKeys</span>
                    <span className="text-xs uppercase tracking-widest opacity-60 hidden md:block border border-black/10 px-2 py-0.5 rounded-full text-black">Series 01</span>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-sm font-medium text-black/60 hover:text-black transition-colors hidden md:block">
                        Specs
                    </button>
                    <button className="text-sm font-medium text-black/60 hover:text-black transition-colors hidden md:block">
                        Story
                    </button>
                    <button className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/90 transition-colors">
                        Pre-order $299
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
