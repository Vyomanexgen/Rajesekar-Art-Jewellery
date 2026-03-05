import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Priya Sharma",
        location: "Mumbai",
        rating: 5,
        text: "The bridal necklace set Rajasekar crafted for my wedding was beyond breathtaking. Every guest couldn't stop admiring the intricate detailing. A true masterpiece!",
    },
    {
        name: "Anand Krishnan",
        location: "Chennai",
        rating: 5,
        text: "I've been a loyal customer for 15 years. The quality of their diamond work is unmatched anywhere in South India. My wife's anniversary ring still sparkles like day one.",
    },
    {
        name: "Meera Venkatesh",
        location: "Bangalore",
        rating: 5,
        text: "From design consultation to the final piece, the experience was luxurious. The emerald earrings I commissioned are absolutely stunning — heirloom quality.",
    },
    {
        name: "Deepak Rajan",
        location: "Coimbatore",
        rating: 5,
        text: "Three generations of my family have trusted Rajasekar for our jewellery. Their craftsmanship and integrity are second to none. Truly the finest artisans.",
    },
];

const Stars = ({ count }) => (
    <div className="flex gap-1 mb-4">
        {Array.from({ length: count }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className="star-gold-icon"
                style={{ color: "#f2c23a", fill: "#f2c23a" }}
            />
        ))}
    </div>
);

const TestimonialsSection = () => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

    return (
        <section
            id="testimonials"
            className="py-24 md:py-32"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    ref={headerRef}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="font-body text-xs tracking-[0.5em] uppercase text-primary/60 block mb-4">
                        Testimonials
                    </span>
                    <h2 className="font-display section-heading-50 font-bold text-gradient-gold italic mb-4">
                        Cherished by Many
                    </h2>
                    <p
                        className="font-body text-base text-foreground/50 max-w-md mx-auto"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Words from those who wear our artistry close to their hearts
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto px-4 md:px-8">
                    {testimonials.map((t, i) => {
                        const ref = useRef(null);
                        const isInView = useInView(ref, { once: true, margin: "-50px" });
                        return (
                            <motion.div
                                key={t.name}
                                ref={ref}
                                className="testimonial-box"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <Stars count={t.rating} />
                                <p className="font-body text-sm md:text-base text-foreground/60 leading-relaxed mb-6 italic">
                                    "{t.text}"
                                </p>
                                <div>
                                    <span className="font-display text-sm font-semibold text-gradient-gold block">
                                        {t.name}
                                    </span>
                                    <span className="font-body text-xs text-foreground/40 tracking-[0.15em] uppercase">
                                        {t.location}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
