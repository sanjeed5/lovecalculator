import React, { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import ResultAnimation from './components/ResultAnimation';

function App() {
  const [names, setNames] = useState({ name1: '', name2: '' });
  const [result, setResult] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculateLove = useCallback(() => {
    setIsAnimating(true);

    // Special case for Sanjeed and Sulbia, Talbia and Zaid
    if (
      (names.name1.toLowerCase() === 'sanjeed' &&
        names.name2.toLowerCase() === 'sulbia') ||
      (names.name1.toLowerCase() === 'sulbia' &&
        names.name2.toLowerCase() === 'sanjeed') ||
      (names.name1.toLowerCase() === 'talbia' &&
        names.name2.toLowerCase() === 'zaid') ||
      (names.name1.toLowerCase() === 'zaid' &&
        names.name2.toLowerCase() === 'talbia')
    ) {
      setResult(100);
      return;
    }

    // Generate a consistent result for the same pair of names
    const combinedNames = `${names.name1.toLowerCase()}${names.name2.toLowerCase()}`;
    let hash = 0;
    for (let i = 0; i < combinedNames.length; i++) {
      hash = combinedNames.charCodeAt(i) + ((hash << 5) - hash);
    }
    const percentage = Math.abs(hash % 100) + 1;
    setResult(percentage);
  }, [names]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 relative overflow-hidden">
      <FloatingHearts />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-center mb-8">
            <Heart
              className="w-10 h-10 text-red-500 animate-pulse"
              fill="currentColor"
            />
            <h1 className="text-3xl font-bold text-red-600 ml-3">
              Love Calculator
            </h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-pink-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={names.name1}
                onChange={(e) =>
                  setNames((prev) => ({ ...prev, name1: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition-colors"
                placeholder="Enter first name..."
              />
            </div>

            <div>
              <label className="block text-pink-700 font-medium mb-2">
                Second Name
              </label>
              <input
                type="text"
                value={names.name2}
                onChange={(e) =>
                  setNames((prev) => ({ ...prev, name2: e.target.value }))
                }
                className="w-full px-4 py-2 rounded-lg border-2 border-pink-200 focus:border-red-400 focus:ring-2 focus:ring-red-200 outline-none transition-colors"
                placeholder="Enter second name..."
              />
            </div>

            <button
              onClick={calculateLove}
              disabled={!names.name1 || !names.name2}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Calculate Love ❤️
            </button>

            {result !== null && (
              <div className="mt-8 text-center">
                <ResultAnimation
                  result={result}
                  isAnimating={isAnimating}
                  setIsAnimating={setIsAnimating}
                />
                <p className="text-lg text-pink-700 mt-4">
                  {result === 100
                    ? 'Perfect Match! 💑'
                    : 'Love is in the air! 💕'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
