/**
 * Get color scheme based on time of day
 * Morning: 5:00 AM - 11:59 AM - Light blue and yellow (sunrise)
 * Afternoon: 12:00 PM - 5:59 PM - Bright blue and orange (daylight)
 * Evening: 6:00 PM - 8:59 PM - Deep blue and gold (sunset)
 * Night: 9:00 PM - 4:59 AM - Dark blue and silver (night)
 */
export const getTimeBasedColors = () => {
  const now = new Date();
  const hour = now.getHours();
  
  // Morning: 5:00 AM - 11:59 AM
  if (hour >= 5 && hour < 12) {
    return {
      background: {
        from: 'from-blue-400',
        to: 'to-yellow-200',
      },
      wave: {
        color: 'rgba(135, 206, 250, alpha)', // Light blue
        glow: 'rgba(255, 220, 100, 0.7)', // Soft yellow glow
      },
      text: {
        primary: 'text-white',
        secondary: 'text-yellow-100',
        accent: 'text-blue-200',
      }
    };
  }
  
  // Afternoon: 12:00 PM - 5:59 PM
  else if (hour >= 12 && hour < 18) {
    return {
      background: {
        from: 'from-blue-500',
        to: 'to-blue-300',
      },
      wave: {
        color: 'rgba(30, 144, 255, alpha)', // Bright blue
        glow: 'rgba(255, 165, 0, 0.7)', // Orange glow
      },
      text: {
        primary: 'text-white',
        secondary: 'text-blue-100',
        accent: 'text-orange-100',
      }
    };
  }
  
  // Evening: 6:00 PM - 8:59 PM
  else if (hour >= 18 && hour < 21) {
    return {
      background: {
        from: 'from-blue-900',
        to: 'to-orange-300',
      },
      wave: {
        color: 'rgba(25, 25, 112, alpha)', // Deep blue
        glow: 'rgba(255, 215, 0, 0.7)', // Gold glow
      },
      text: {
        primary: 'text-white',
        secondary: 'text-orange-100',
        accent: 'text-yellow-300',
      }
    };
  }
  
  // Night: 9:00 PM - 4:59 AM
  else {
    return {
      background: {
        from: 'from-gray-900',
        to: 'to-blue-900',
      },
      wave: {
        color: 'rgba(0, 0, 50, alpha)', // Dark blue
        glow: 'rgba(192, 192, 192, 0.7)', // Silver glow
      },
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        accent: 'text-blue-300',
      }
    };
  }
};

/**
 * Get a description of the current time of day
 */
export const getTimeOfDayDescription = () => {
  const now = new Date();
  const hour = now.getHours();
  
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 21) return "evening";
  return "night";
};