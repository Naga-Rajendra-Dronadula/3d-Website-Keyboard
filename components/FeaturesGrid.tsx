'use client';

import { Cpu, Layers, Zap, Bluetooth, ShieldCheck, Keyboard } from 'lucide-react';

const FEATURES = [
    {
        icon: <Cpu className="w-6 h-6" />,
        title: 'QMK/VIA Ready',
        desc: 'Remap any key. Create macros. Full open-source control.',
        colSpan: 'md:col-span-2',
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: 'Gasket Performance',
        desc: 'Leaf-spring mounts provide softer typing feedback.',
        colSpan: 'md:col-span-1',
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: 'Double-Shot PBT',
        desc: 'Legends that never fade. Textured finish.',
        colSpan: 'md:col-span-1',
    },
    {
        icon: <Bluetooth className="w-6 h-6" />,
        title: 'Tri-Mode Connect',
        desc: '2.4GHz, Bluetooth 5.1, and USB-C wire.',
        colSpan: 'md:col-span-2',
    },
];

export default function FeaturesGrid() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#ECECEC]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tighter text-black/90 mb-4">
                        Nano-Engineered <br /> for Perfection.
                    </h2>
                    <p className="text-lg text-black/60 max-w-xl">
                        Every component is selected for durability, acoustics, and response time.
                        No compromises.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {FEATURES.map((feat, i) => (
                        <div
                            key={i}
                            className={`${feat.colSpan} bg-white p-8 rounded-3xl border border-black/5 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between min-h-[240px]`}
                        >
                            <div className="w-12 h-12 bg-[#F5F5F5] rounded-full flex items-center justify-center text-black mb-4">
                                {feat.icon}
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold tracking-tight mb-2">{feat.title}</h3>
                                <p className="text-black/60 font-medium">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
