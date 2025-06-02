import { useEffect, useRef } from 'react';

const HeartbeatWave = ({ isComplete }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let heartbeatPoints = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 100;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize heartbeat points
    const initHeartbeat = () => {
      heartbeatPoints = [];
      const width = canvas.width;
      const centerX = width / 2;
      
      // Create a flat line with a heartbeat spike in the middle
      for (let x = 0; x < width; x++) {
        let y = 50; // Center line
        
        // Create the heartbeat pattern near the center
        if (x > centerX - 40 && x < centerX + 40) {
          if (x < centerX - 20) {
            y = 50 - (x - (centerX - 40)) * 1.5;
          } else if (x < centerX - 10) {
            y = 20 + (x - (centerX - 20)) * 3;
          } else if (x < centerX) {
            y = 50 - (x - (centerX - 10)) * 5;
          } else if (x < centerX + 10) {
            y = 0 + (x - centerX) * 5;
          } else if (x < centerX + 20) {
            y = 50 - (x - (centerX + 10)) * 3;
          } else {
            y = 20 + (x - (centerX + 20)) * 1.5;
          }
        }
        
        heartbeatPoints.push({ x, y, alpha: 1 });
      }
    };
    
    initHeartbeat();
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the heartbeat line
      ctx.beginPath();
      ctx.moveTo(0, 50);
      
      heartbeatPoints.forEach((point, index) => {
        const color = isComplete ? 'rgba(255, 0, 0,' : 'rgba(255, 0, 0,';
        
        // Calculate distance from center for alpha
        const centerX = canvas.width / 2;
        const distance = Math.abs(point.x - centerX);
        const maxDistance = canvas.width / 2;
        
        // Fade out based on distance from center
        point.alpha = isComplete ? 1 : Math.max(0, 1 - distance / maxDistance);
        
        ctx.strokeStyle = `${color}${point.alpha})`;
        ctx.lineWidth = isComplete ? 3 : 2;
        ctx.lineTo(point.x, point.y);
      });
      
      ctx.stroke();
      
      // Pulse effect
      if (!isComplete) {
        const pulseSpeed = 0.02;
        const pulseAmount = 5;
        const centerX = canvas.width / 2;
        const pulseRange = 60;
        
        heartbeatPoints.forEach(point => {
          if (Math.abs(point.x - centerX) < pulseRange) {
            const time = Date.now() * pulseSpeed;
            const pulse = Math.sin(time) * pulseAmount;
            point.y += pulse * (1 - Math.abs(point.x - centerX) / pulseRange);
          }
        });
      } else {
        // Flatline animation when countdown is complete
        heartbeatPoints.forEach(point => {
          point.y = 50;
        });
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isComplete]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-[100px]"
      style={{ 
        filter: isComplete ? 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.7))' : 'none',
        transition: 'filter 0.5s ease'
      }}
    />
  );
};

export default HeartbeatWave;