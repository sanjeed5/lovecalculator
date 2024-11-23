import React from 'react';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  // Generate an array of hearts with random positions and animations
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${10 + Math.random() * 20}s`,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            transform: `scale(${heart.scale})`,
          }}
        >
          <Heart
            className="text-pink-300/30"
            fill="currentColor"
            size={24}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;