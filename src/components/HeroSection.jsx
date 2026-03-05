import { motion } from "framer-motion";

const heroImage = "/hero-jewellery.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ paddingTop: '100px' }}>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Rajasekar Art Jewellery"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >

          {/* Since 1985 */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="w-20 h-[1px] bg-[#f2c23a]/50"></span>

            <span className="text-sm tracking-[0.5em] uppercase text-[#f2c23a]/90" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Since 2025
            </span>

            <span className="w-20 h-[1px] bg-[#f2c23a]/50"></span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="italic font-bold mb-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              color: "#FFD700",
              fontSize: "40px",
              lineHeight: "1.1"
            }}
          >
            RAJASEKHAR
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl tracking-[0.35em] text-[#FFC42C]/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Art Jewellery
          </motion.p>


          {/* Description */}
          <motion.p
            className="max-w-xl mx-auto text-base md:text-[17px] text-white/80 leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Where timeless craftsmanship meets contemporary elegance.
            Each piece tells a story of heritage, passion, and artistry.
          </motion.p>


          {/* Button */}
          <motion.a
            href="#collections"
            className="hero-explore-btn inline-block px-12 py-4 text-[13px] uppercase tracking-[0.35em]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            EXPLORE COLLECTIONS
          </motion.a>

        </motion.div>
      </div>


      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#d4af37]/60" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Scroll
        </span>

        <span className="h-12 w-[1px] bg-[#d4af37]/40"></span>
      </motion.div>

    </section>
  );
};

export default HeroSection;