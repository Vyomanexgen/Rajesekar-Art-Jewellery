import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, MapPin, Clock } from "lucide-react";

const ContactSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            className="py-24 md:py-32"
            ref={ref}
            style={{ paddingTop: "80px", paddingBottom: "80px" }}
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
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
                    <p className="font-body text-base text-foreground/50 max-w-md mx-auto">
                        Experience our collections in person. We'd love to help you find your perfect piece.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
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
                            className="text-center p-8 border border-border/30 hover:border-primary/30 transition-colors duration-500"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                        >
                            <item.icon className="mx-auto mb-4 text-primary/70" size={24} strokeWidth={1} />
                            <h3 className="font-display text-lg font-semibold text-primary mb-3">{item.title}</h3>
                            {item.lines.map((line) => (
                                <p key={line} className="font-body text-sm text-foreground/50">{line}</p>
                            ))}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
