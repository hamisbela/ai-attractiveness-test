import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, User, Tag, BookOpen, Heart, Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-pink-700 text-white border-t border-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-7 w-7 text-purple-200" />
              <h3 className="text-xl font-bold text-white">AI Attractiveness Test</h3>
            </div>
            <p className="text-purple-100">
              Your AI-powered companion for analyzing facial features and beauty. 
              Upload any portrait photo and get an instant attractiveness assessment with personalized enhancement recommendations and a beauty score.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Heart className="h-5 w-5 text-pink-300 mr-2" />
              Resources
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group">
                <User className="h-5 w-5 text-purple-300 group-hover:text-white transition-colors duration-300" />
                <Link to="/" className="text-purple-100 hover:text-white transition-colors duration-300">
                  Attractiveness Test
                </Link>
              </li>
              <li className="flex items-center gap-2 group">
                <Tag className="h-5 w-5 text-purple-300 group-hover:text-white transition-colors duration-300" />
                <Link to="/about" className="text-purple-100 hover:text-white transition-colors duration-300">
                  About Our Service
                </Link>
              </li>
              <li className="flex items-center gap-2 group">
                <Sparkles className="h-5 w-5 text-purple-300 group-hover:text-white transition-colors duration-300" />
                <Link to="/contact" className="text-purple-100 hover:text-white transition-colors duration-300">
                  Get Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Support Our Project</h3>
            <p className="text-purple-100 mb-6">
              Help us maintain and improve our free AI attractiveness test for everyone who wants to understand and enhance their beauty potential.
            </p>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-attractiveness-test"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md transform hover:scale-105 font-medium"
            >
              <Coffee className="h-5 w-5" />
              Buy us a coffee
            </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-purple-500">
          <div className="text-center text-purple-200">
            <p className="mb-2">&copy; {new Date().getFullYear()} AI Attractiveness Test. Helping people discover and enhance their natural beauty.</p>
            <p className="text-sm">
              For informational purposes only. Our AI attractiveness test provides suggestions, not definitive beauty standards.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}