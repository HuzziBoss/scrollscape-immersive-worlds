
import { motion } from 'framer-motion';

const ContentSection = ({ children, className = "", isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`absolute left-8 md:left-16 max-w-md z-10 ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ScrollContent = ({ scrollProgress }) => {
  const getVisibility = (start, end) => {
    return scrollProgress >= start && scrollProgress <= end;
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Section 1 - Introduction */}
      <ContentSection 
        isVisible={getVisibility(0, 0.25)} 
        className="top-1/4"
      >
        <motion.div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Digital Odyssey
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Journey through the infinite expanse of digital space, where data flows like rivers of light and algorithms shape reality itself.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 2 - Exploration */}
      <ContentSection 
        isVisible={getVisibility(0.25, 0.5)} 
        className="top-1/3"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cyan-400">
            Explore
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Navigate through floating geometric structures that represent the building blocks of our digital universe. Each shape tells a story of innovation and possibility.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 3 - Interaction */}
      <ContentSection 
        isVisible={getVisibility(0.5, 0.75)} 
        className="top-1/2"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-purple-400">
            Interact
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Experience the harmonious dance of particles and light as they respond to your presence, creating a symphony of color and movement in the digital realm.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 4 - Conclusion */}
      <ContentSection 
        isVisible={getVisibility(0.75, 1)} 
        className="top-2/3"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-400">
            Transcend
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Step beyond the boundaries of the physical world and embrace the limitless potential of digital transformation.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg pointer-events-auto hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Enter the Future
          </motion.button>
        </motion.div>
      </ContentSection>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollProgress > 0.1 ? 0 : 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
      >
        <p className="text-sm mb-2 text-gray-400">Scroll to explore</p>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <div className="fixed top-4 right-4 w-1 h-32 bg-gray-800 rounded-full overflow-hidden">
        <motion.div 
          className="w-full bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full"
          initial={{ height: "0%" }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default ScrollContent;
