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
    <div className="flex gap-1 mb-4 ml-2">
        {Array.from({ length: count }).map((_, i) => (
            <Star
                key={i}
                size={16}
                style={{ color: "#D4AF37", fill: "#D4AF37" }}
            />
        ))}
    </div>
);

const TestimonialsSection = () => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    return (
        <section
            id="testimonials"
            className="py-24 md:py-32 bg-[#0B0613]"
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
            <div className="container mx-auto px-4">

                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-xs tracking-[0.5em] uppercase block mb-4 text-[#D4AF37]/70">
                        Testimonials
                    </span>

                    <h2 className="font-bold italic mb-4 text-[36px] md:text-[50px] text-[#F1C86A]">
                        Cherished by Many
                    </h2>

                    <p className="text-base max-w-md mx-auto text-[#E9D8A6]/70">
                        Words from those who wear our artistry close to their hearts
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto px-4 md:px-8">

                    {testimonials.map((t, i) => {
                        const ref = useRef(null);
                        const isInView = useInView(ref, { once: true });

                        return (
                            <motion.div
                                key={t.name}
                                ref={ref}
                                className="h-full px-6 md:px-7 pt-6 md:pt-7 pb-6 md:pb-7 rounded-xl border border-[#D4AF37]/20 bg-[#140A22]/70 backdrop-blur-md flex flex-col"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                {/* Stars */}
                                <div className="mt-2">
                                    <Stars count={t.rating} />
                                </div>

                                {/* Text */}
                                <p className="ml-2 text-sm md:text-base leading-relaxed mb-6 italic text-[#E9D8A6]/80 text-left">
                                    "{t.text}"
                                </p>

                                {/* Bottom */}
                                <div className="mt-auto ml-2">
                                    <span className="text-sm font-semibold text-[#F1C86A] block">
                                        {t.name}
                                    </span>

                                    <span className="text-xs tracking-[0.15em] uppercase text-[#A28DB5] mt-2 block">
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