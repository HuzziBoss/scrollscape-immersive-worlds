
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

      {/* Spacer to enable scrolling - 4x viewport height */}
      <div className="h-[400vh] relative z-0" />

      {/* Footer */}
      <div className="relative z-10 bg-black/80 backdrop-blur-sm text-white p-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 text-cyan-400">
            Ready to Build the Future?
          </h3>
          <p className="text-gray-300 mb-6">
            Experience the next generation of web technology with immersive 3D experiences 
            that push the boundaries of what's possible in a browser.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
              WebGL
            </span>
            <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm">
              Three.js
            </span>
            <span className="px-4 py-2 bg-yellow-500/20 rounded-full text-yellow-300 text-sm">
              React
            </span>
            <span className="px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm">
              Framer Motion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
