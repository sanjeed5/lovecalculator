import React, { useEffect } from 'react';
import { Heart } from 'lucide-react';

interface ResultAnimationProps {
  result: number;
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
}

const ResultAnimation: React.FC<ResultAnimationProps> = ({ result, isAnimating, setIsAnimating }) => {
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, setIsAnimating]);

  return (
    <div className="relative">
      <div className="flex justify-center items-center">
        <div className={`text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-transparent bg-clip-text transform transition-all duration-1000 ${
          isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
        }`}>
          {result}%
        </div>
      </div>
      
      {/* Burst Hearts Animation */}
      {isAnimating && (
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <Heart
              key={i}
              className={`absolute text-red-500 animate-burst-${i}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
              }}
              size={24}
              fill="currentColor"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultAnimation;