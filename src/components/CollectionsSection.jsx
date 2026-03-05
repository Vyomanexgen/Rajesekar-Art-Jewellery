import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const collections = [
    // Row 1
    { name: "Necklace sets", shortName: "Necklace", description: "Elegant necklaces crafted with precision", image: "/Necklaces.jpg" },
    { name: "Haram", shortName: "Haram", description: "Traditional long chains for special occasions", image: "/Haram.jpg" },
    { name: "Combo set", shortName: "Combo", description: "Perfectly matched majestic combinations", image: "/combo_set.jpg" },
    { name: "Wedding collection", shortName: "Wedding", description: "Bridal sets to make your day unforgettable", image: "/Wedding_collection.jpg" },
    { name: "Earrings", shortName: "Earrings", description: "Stunning pieces from studs to statement drops", image: "/Earings.jpg" },
    { name: "Bangles", shortName: "Bangles", description: "Beautiful designs in traditional and modern styles", image: "/Bangles.jpg" },
    { name: "Hip beads", shortName: "Hip Beads", description: "Exquisite waist chains for an elegant drape", image: "/Hip_beads.jpg" },
    // Row 2
    { name: "Accessories", shortName: "Accessories", description: "Essential additions to complete your look", image: "/Accessories.jpg" },
    { name: "Gentlemen's items", shortName: "Gentlemen's", description: "Refined adornments for the modern man", image: "/Gentlemen_items.jpg" },
    { name: "Beads", shortName: "Beads", description: "Artisanal beaded artistry", image: "/Beads.jpg" },
    { name: "Mangalsutra", shortName: "Mangalsutra", description: "Sacred threads of eternal bond", image: "/Mangalsutra.jpg" },
    { name: "Sarudu", shortName: "Sarudu", description: "Classic timeless craftsmanship", image: "/Sarudu.jpg" },
    { name: "Chains", shortName: "Chains", description: "Versatile pieces for daily elegance", image: "/Chains.jpg" },
    { name: "Choker sets", shortName: "Choker", description: "Statement neckpieces that command attention", image: "/Choker_sets.jpg" }
];

const CollectionCard = ({ item, index, onExplore }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            className="collection-card group relative overflow-hidden cursor-pointer rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: (index % 7) * 0.1 }}
        >
            <div className="aspect-square overflow-hidden">
                <img
                    src={item.image}
                    alt={`${item.name} collection by Rajasekar Art Jewellery`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                        e.target.src = "/combo_set.jpg"; // fallback image
                    }}
                />
                <div className="collection-overlay absolute inset-0 bg-background/40 transition-opacity duration-500" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2">
                <h3 className="font-display text-xs sm:text-sm md:text-base font-semibold text-gradient-gold italic drop-shadow-md">
                    {item.shortName || item.name}
                </h3>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onExplore) onExplore(item.name);
                    }}
                    className="collection-explore-btn px-4 py-1.5 rounded-full bg-[#f2c23a] text-[#1f1230] font-body text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-500 shadow-lg"
                >
                    Explore
                </button>
            </div>
        </motion.div>
    );
};

const CollectionsSection = ({ handleCategoryClick }) => {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

    const handleExploreClick = (categoryName) => {
        if (handleCategoryClick) {
            handleCategoryClick(categoryName);
        }
    };

    return (
        <section id="collections" className="pt-32 md:pt-40 pb-32 md:pb-40">
            <div className="container mx-auto px-4 max-w-[1400px]">
                <motion.div
                    ref={headerRef}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="font-body text-xs tracking-[0.5em] uppercase text-primary/60 block mb-4">
                        Our Craft
                    </span>
                    <h2 className="font-display section-heading-50 font-bold text-gradient-gold italic mb-4">
                        Shop by Category
                    </h2>
                    <p className="font-body text-base text-foreground/50 max-w-md mx-auto">
                        Discover our exclusive collections, handcrafted with devotion
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
                    {collections.map((item, i) => (
                        <CollectionCard key={item.name} item={item} index={i} onExplore={handleExploreClick} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CollectionsSection;
