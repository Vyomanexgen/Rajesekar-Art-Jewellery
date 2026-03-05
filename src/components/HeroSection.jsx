import { motion } from "framer-motion";

const heroImage = "/hero-jewellery.jpg";

const HeroSection = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Rajasekar Art Jewellery - Exquisite diamond and emerald necklace"
                    className="h-full w-full object-cover"
                />
                {/* Rich purple velvet-style gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#3b014d]/95 via-[#22002f]/80 to-black/90" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 -mt-10 md:-mt-16">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                >
                    <motion.div
                        className="mb-4 flex items-center justify-center gap-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <span className="h-[1px] w-16 bg-primary/50" />
                        <span className="font-body text-base md:text-lg tracking-[0.55em] uppercase text-primary/70">
                            Since 2025
                        </span>
                        <span className="h-[1px] w-16 bg-primary/50" />
                    </motion.div>

                    <motion.h1
                        className="font-display hero-title-main font-bold italic text-gradient-gold mb-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Rajasekar
                    </motion.h1>

                    <motion.p
                        className="font-body text-2xl md:text-3xl tracking-[0.35em] text-foreground/80 mb-10 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                    >
                        Art Jewellery
                    </motion.p>

                    <motion.p
                        className="font-body text-lg md:text-xl text-foreground/60 max-w-xl mx-auto mb-10 leading-[1.9]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        Where timeless craftsmanship meets contemporary elegance.
                        Each piece tells a story of heritage, passion, and artistry.
                    </motion.p>

                    <motion.a
                        href="#collections"
                        className="btn-explore-gold font-body"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.4 }}
                    >
                        Explore Collections
                    </motion.a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <span className="font-body scroll-label-gold">Scroll</span>
                <span className="scroll-line-gold" />
            </motion.div>
        </section>
    );
};

export default HeroSection;
