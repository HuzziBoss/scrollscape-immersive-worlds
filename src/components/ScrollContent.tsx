
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
        isVisible={getVisibility(0, 0.2)} 
        className="top-1/4"
      >
        <motion.div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Digital Genesis
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Witness the birth of digital architecture as data transforms into living structures, breathing with the rhythm of innovation.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 2 - Construction */}
      <ContentSection 
        isVisible={getVisibility(0.2, 0.4)} 
        className="top-1/3"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cyan-400">
            Construct
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Watch as digital towers rise from the void, each block representing lines of code materializing into architectural marvels that define our virtual skyline.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 3 - Evolution */}
      <ContentSection 
        isVisible={getVisibility(0.4, 0.6)} 
        className="top-1/2"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-purple-400">
            Evolve
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Experience the DNA of digital evolution as spiraling patterns of data unwind, revealing the genetic code of tomorrow's technology.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 4 - Connect */}
      <ContentSection 
        isVisible={getVisibility(0.6, 0.8)} 
        className="top-3/5"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-green-400">
            Connect
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Navigate through interconnected networks where every node pulses with possibility, forming the neural pathways of our digital consciousness.
          </p>
        </motion.div>
      </ContentSection>

      {/* Section 5 - Transcend */}
      <ContentSection 
        isVisible={getVisibility(0.8, 1)} 
        className="top-2/3"
      >
        <motion.div className="text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-yellow-400">
            Transcend
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Ascend beyond the physical realm into a dimension where imagination becomes reality and the impossible becomes inevitable.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white px-8 py-3 rounded-full font-semibold text-lg pointer-events-auto hover:shadow-lg transition-all duration-300"
          >
            Enter the Future
          </motion.button>
        </motion.div>
      </ContentSection>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollProgress > 0.05 ? 0 : 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
      >
        <p className="text-sm mb-2 text-gray-400">Scroll to witness the creation</p>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>

      {/* Enhanced progress indicator */}
      <div className="fixed top-4 right-4 w-2 h-40 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
        <motion.div 
          className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500 rounded-full relative"
          initial={{ height: "0%" }}
          animate={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-white/30 rounded-full animate-pulse"></div>
        </motion.div>
      </div>

      {/* Section indicators */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 space-y-4">
        {[0, 0.2, 0.4, 0.6, 0.8].map((threshold, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              scrollProgress >= threshold 
                ? 'bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50' 
                : 'bg-transparent border-gray-500'
            }`}
            animate={scrollProgress >= threshold ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollContent;
