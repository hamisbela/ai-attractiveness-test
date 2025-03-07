import React from 'react';
import { Coffee, Sparkles } from 'lucide-react';

export default function SupportBlock() {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-500 shadow-lg border border-purple-200">
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white opacity-30 animate-ping"></div>
          </div>
          <Sparkles className="w-12 h-12 text-purple-600 mx-auto relative z-10" />
        </div>
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">Support Our Work ❤️</h2>
        <p className="text-gray-700 mb-8 text-lg">
          Help us maintain and improve our free AI attractiveness test by supporting us.
          Your contribution helps keep this tool free for everyone who wants to understand and enhance their natural beauty! ✨
        </p>
        <a
          href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-attractiveness-test"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 text-lg font-bold shadow-lg transform hover:scale-105"
        >
          <Coffee className="h-6 w-6" />
          Buy Us a Coffee ☕
        </a>
      </div>
    </div>
  );
}