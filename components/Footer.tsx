export default function Footer() {
    return (
        <footer className="bg-black text-white/40 py-12 px-6 md:px-12 border-t border-white/10 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs tracking-wide">
                    © 2026 BrewCode Inc. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-xs hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-xs hover:text-white transition-colors">Terms</a>
                    <a href="#" className="text-xs hover:text-white transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
}
