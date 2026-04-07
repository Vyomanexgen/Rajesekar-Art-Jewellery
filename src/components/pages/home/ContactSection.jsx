import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            className="pt-32 md:pt-40 pb-16 md:pb-24 min-h-[70vh] flex flex-col justify-center"
            ref={ref}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    style={{ marginTop: "64px" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="font-body text-xs tracking-[0.5em] uppercase text-primary/60 block mb-4">
                        Visit Us
                    </span>
                    <h2 className="font-display section-heading-50 font-bold text-gradient-gold italic mb-4">
                        Get in Touch
                    </h2>
                    <p
                        className="font-body text-base text-foreground/50 max-w-md mx-auto"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Experience our collections in person. We'd love to help you find your perfect piece.
                    </p>
                </motion.div>

                <motion.div
                    className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto overflow-x-auto snap-x snap-mandatory pb-4 px-2 md:px-0 scrollbar-hide items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {[
                        { icon: MapPin, title: "Location", lines: ["123 Jewellers Lane", "Chennai, Tamil Nadu"] },
                        { icon: Phone, title: "Contact", lines: ["+91 98765 43210", "info@rajasekar.com"] },
                        { icon: Clock, title: "Hours", lines: ["Mon - Sat: 10AM - 8PM", "Sunday: By Appointment"] },
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="contact-box flex flex-col items-center justify-center text-center shrink-0 w-[220px] md:w-auto snap-center bg-white/5 border border-white/10 rounded-xl p-6 md:p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                        >
                            <item.icon className="mx-auto mb-6 text-[#f2c23a]" size={28} strokeWidth={1} />
                            <h3
                                className="font-display text-xl font-semibold text-[#f2c23a] mb-4 tracking-wide"
                                style={{ color: "#f2c23a" }}
                            >
                                {item.title}
                            </h3>
                            {item.lines.map((line) => (
                                <p
                                    key={line}
                                    className="font-body text-sm text-foreground/50 truncate"
                                    style={{ fontFamily: "'Cormorant Garamond', serif", whiteSpace: "normal" }}
                                >
                                    {line}
                                </p>
                            ))}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
