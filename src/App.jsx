import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isPortrait, setIsPortrait] = useState(window.matchMedia("(orientation: portrait)").matches);
  
  // Update window dimensions when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsPortrait(window.matchMedia("(orientation: portrait)").matches);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  // Phone mode constraints
  const isPhoneMode = windowWidth <= 480 || (windowWidth <= 896 && isPortrait);
  
  return (
    <div className="app">
      {isPhoneMode ? (
        <HeroSection />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-4">
          <div className="max-w-md mx-auto text-center bg-blue-800 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Mobile View Only</h1>
            <p className="mb-6">This application is designed for mobile devices only.</p>
            <div className="border-2 border-white p-4 rounded-lg mb-6">
              <p className="text-sm mb-2">Please use your phone to access this app, or:</p>
              <p className="text-sm">Resize your browser window to mobile dimensions</p>
            </div>
            <div className="mt-4 text-sm opacity-75">
              <p>Current width: {windowWidth}px</p>
              <p>Orientation: {isPortrait ? 'Portrait' : 'Landscape'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;