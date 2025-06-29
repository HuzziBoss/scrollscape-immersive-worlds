
import Scene3D from '../components/Scene3D';
import ScrollContent from '../components/ScrollContent';
import useScrollProgress from '../hooks/useScrollProgress';

const Index = () => {
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative">
      {/* Fixed 3D Scene Background */}
      <div className="fixed inset-0 w-full h-full">
        <Scene3D scrollProgress={scrollProgress} />
      </div>

      {/* Scrollable Content Overlay */}
      <ScrollContent scrollProgress={scrollProgress} />

      {/* Extended spacer to enable longer scrolling - 6x viewport height for more sections */}
      <div className="h-[600vh] relative z-0" />

      {/* Enhanced Footer */}
      <div className="relative z-10 bg-gradient-to-b from-black/90 via-gray-900/95 to-black/90 backdrop-blur-lg text-white">
        {/* Main footer content */}
        <div className="p-12 text-center border-b border-gray-700/50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Ready to Shape Tomorrow?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the convergence of imagination and technology where every pixel tells a story, 
              every animation breathes life, and every interaction opens a gateway to infinite possibilities.
            </p>
            
            {/* Technology badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <span className="px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 rounded-full text-cyan-300 text-lg font-medium hover:bg-cyan-500/30 transition-all duration-300">
                WebGL 2.0
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-lg font-medium hover:bg-purple-500/30 transition-all duration-300">
                Three.js
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-300 text-lg font-medium hover:bg-yellow-500/30 transition-all duration-300">
                React Fiber
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 rounded-full text-green-300 text-lg font-medium hover:bg-green-500/30 transition-all duration-300">
                GSAP
              </span>
              <span className="px-6 py-3 bg-gradient-to-r from-pink-500/20 to-pink-600/20 border border-pink-500/30 rounded-full text-pink-300 text-lg font-medium hover:bg-pink-500/30 transition-all duration-300">
                AI-Driven
              </span>
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                Start Your Journey
              </button>
              <button className="px-8 py-4 border-2 border-purple-500 text-purple-300 font-semibold text-lg rounded-full hover:bg-purple-500/10 transition-all duration-300 hover:scale-105">
                Explore More
              </button>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="p-8 bg-black/50">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
                <div className="text-gray-400">Polygons Rendered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">60fps</div>
                <div className="text-gray-400">Smooth Animation</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">5</div>
                <div className="text-gray-400">Interactive Scenes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
                <div className="text-gray-400">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
