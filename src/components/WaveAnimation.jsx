import { useEffect, useRef } from 'react';

const WaveAnimation = ({ isComplete, seconds }) => {
  const canvasRef = useRef(null);
  const wavesRef = useRef([]);
  const prevSecondsRef = useRef(seconds);
  const lastWaveTimeRef = useRef(0);
  
  useEffect(() => {
    // Add a new wave every 5 seconds
    const currentSecond = Math.floor(Date.now() / 1000);
    if (!isComplete && Math.floor(currentSecond / 5) !== Math.floor(prevSecondsRef.current / 5)) {
      wavesRef.current = [
        ...wavesRef.current,
        {
          radius: 0,
          opacity: 1,
          timestamp: Date.now()
        }
      ];
      prevSecondsRef.current = currentSecond;
    }
  }, [seconds, isComplete]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions to cover the entire viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation function
    const animate = () => {
      // Clear with a semi-transparent fill to create a trail effect
      ctx.fillStyle = 'rgba(12, 45, 107, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height) * 1.5; // Extend beyond canvas
      const waveSpeed = isComplete ? 2 : 1; // Faster when complete
      const now = Date.now();
      
      // Add continuous waves when countdown is complete
      if (isComplete && now - lastWaveTimeRef.current > 5000) { // Add a new wave every 5 seconds
        wavesRef.current.push({
          radius: 0,
          opacity: 1,
          timestamp: now
        });
        lastWaveTimeRef.current = now;
      }
      
      // Add background waves every 5 seconds
      if (!isComplete && now - lastWaveTimeRef.current > 5000) { // Every 5 seconds
        wavesRef.current.push({
          radius: 0,
          opacity: 0.7, // Higher opacity for less frequent waves
          timestamp: now
        });
        lastWaveTimeRef.current = now;
      }
      
      // Update and draw each wave
      wavesRef.current = wavesRef.current.filter(wave => {
        const age = (now - wave.timestamp) / 1000; // Age in seconds
        wave.radius = age * 120 * waveSpeed; // Expand at 120px per second (faster)
        wave.opacity = isComplete 
          ? Math.max(0, 1 - (wave.radius / maxRadius) * 0.5) // Slower fade when complete
          : Math.max(0, 1 - (wave.radius / maxRadius));
        
        // Only keep waves that are still visible
        return wave.opacity > 0;
      });
      
      // Draw waves from oldest to newest
      [...wavesRef.current].reverse().forEach(wave => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, wave.radius, 0, Math.PI * 2);
        // Blue wave with pulsing effect
        const pulseIntensity = Math.sin(now * 0.003) * 0.2 + 0.8; // Pulsing between 0.6 and 1.0
        const blueValue = Math.floor(122 + (pulseIntensity * 50)); // Pulsing blue value
        ctx.strokeStyle = `rgba(0, ${blueValue}, 255, ${wave.opacity * pulseIntensity})`;
        ctx.lineWidth = isComplete ? 3 : 2;
        ctx.stroke();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isComplete]); // Only re-run when isComplete changes
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        filter: isComplete ? 'drop-shadow(0 0 10px rgba(0, 122, 255, 0.7))' : 'none',
        transition: 'filter 0.5s ease'
      }}
    />
  );
};

export default WaveAnimation;