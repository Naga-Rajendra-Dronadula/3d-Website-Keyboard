'use client';

export default function Specifications() {
    return (
        <section className="bg-[#111] text-white py-32 px-6 md:px-12 relative z-10 w-full min-h-screen flex items-center justify-center">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">

                <div>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter mb-8 text-white/90">
                        Technical <br /> Mastery.
                    </h2>
                    <p className="text-lg text-white/60 leading-relaxed max-w-md">
                        <p className="text-zinc-600">Every switch, stabilizer, and keycap is calibrated for acoustic perfection. The GhostKeys Series 01 isn't just a tool; it's an instrument.</p>
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">

                    <div className="space-y-2">
                        <h4 className="text-white/40 text-sm uppercase tracking-widest">Case Material</h4>
                        <p className="text-xl font-medium tracking-tight">6063 Aluminum Series</p>
                        <p className="text-sm text-white/40">CNC Machined, bead-blasted finish.</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-white/40 text-sm uppercase tracking-widest">PCB</h4>
                        <p className="text-xl font-medium tracking-tight">Hot-swappable</p>
                        <p className="text-sm text-white/40">QMK/VIA compatible. South-facing RGB.</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-white/40 text-sm uppercase tracking-widest">Mounting</h4>
                        <p className="text-xl font-medium tracking-tight">Gasket Mount System</p>
                        <p className="text-sm text-white/40">Poron gaskets with leaf-spring play.</p>
                    </div>

                    <div className="space-y-2">
                        <h4 className="text-white/40 text-sm uppercase tracking-widest">Weight</h4>
                        <p className="text-xl font-medium tracking-tight">2.1 kg / 4.6 lbs</p>
                        <p className="text-sm text-white/40">Solid brass internal weight.</p>
                    </div>

                </div>

            </div>
        </section>
    );
}
