import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { value: "38+", label: "Years of Legacy" },
    { value: "10K+", label: "Pieces Crafted" },
    { value: "50+", label: "Master Artisans" },
    { value: "100%", label: "Certified Gems" },
];

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="py-24 md:py-32 min-h-[70vh] flex items-center" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-body text-xs tracking-[0.5em] uppercase text-primary/60 block mb-4">
                            Heritage
                        </span>
                        <h2 className="font-display text-3xl md:text-5xl font-bold text-gradient-gold italic mb-6">
                            The Art of Perfection
                        </h2>
                        <div
                            className="space-y-4 font-body text-base md:text-lg text-foreground/60 leading-relaxed"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            <p>
                                For over three decades, Rajasekar Art Jewellery has been synonymous with
                                uncompromising quality and breathtaking design. Our master artisans blend
                                traditional South Indian craftsmanship with contemporary aesthetics.
                            </p>
                            <p>
                                Every gemstone is hand-selected, every setting meticulously crafted,
                                creating heirloom pieces that transcend generations. From bridal
                                magnificence to everyday elegance, we bring your vision to life.
                            </p>
                        </div>
                        <div className="mt-8 h-[1px] w-24 bg-primary/30" />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        className="grid grid-cols-2 gap-8"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="text-center p-6 border border-border/50 hover:border-primary/30 transition-colors duration-500"
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                            >
                                <span className="font-display text-3xl md:text-4xl font-bold text-gradient-gold italic block mb-2">
                                    {stat.value}
                                </span>
                                <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground/50">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
