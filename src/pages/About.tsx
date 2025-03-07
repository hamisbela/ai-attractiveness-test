import React from 'react';
import { Sparkles } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Our AI Attractiveness Test</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 prose max-w-none">
          <p>
            Welcome to AI Attractiveness Test, your trusted resource for AI-powered beauty analysis.
            We're passionate about helping people understand their unique features, appreciate their natural beauty,
            and discover personalized ways to enhance their appearance through advanced technology
            that analyzes visual characteristics of facial features and styling.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to make beauty analysis accessible to everyone by providing a free, easy-to-use
            AI attractiveness test. In a world where beauty standards are constantly evolving, we aim to help you
            understand your unique features, appreciate your natural strengths, and receive personalized enhancement recommendations.
            Our free AI attractiveness test is designed to empower users with objective analysis and constructive feedback,
            helping more people discover their optimal look and build confidence.
          </p>

          <h2>Why Choose Our AI Attractiveness Test?</h2>
          <ul>
            <li>Advanced AI facial recognition algorithms trained on diverse beauty standards</li>
            <li>Detailed analysis reports with personalized recommendations</li>
            <li>Comprehensive assessment of facial features, symmetry, and proportions</li>
            <li>Practical style and grooming suggestions tailored to your unique features</li>
            <li>Objective feedback on styling, hair, and presentation</li>
            <li>Confidence-building insights that focus on your natural strengths</li>
            <li>Completely free to use AI attractiveness test</li>
            <li>No registration required</li>
            <li>Privacy-focused approach</li>
            <li>User-friendly interface for people of all tech levels</li>
          </ul>

          <h2>Support Our Project</h2>
          <p>
            We're committed to keeping this AI attractiveness test free and accessible to everyone.
            If you find our tool useful, consider supporting us by buying us a coffee.
            Your support helps us maintain and improve the service, ensuring it remains available to all
            who want to analyze their attractiveness and discover ways to enhance their natural beauty.
          </p>

          <div className="mt-8 text-center">
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=ai-attractiveness-test"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-colors text-lg font-semibold"
            >
              Support Our Work
            </a>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="flex items-center text-xl font-bold text-gray-900 mb-4">
              <Sparkles className="h-5 w-5 text-purple-500 mr-2" />
              Important Disclaimer
            </h3>
            <p className="text-gray-700">
              While our free AI attractiveness test uses sophisticated algorithms to analyze facial features and styling, it's important to understand that beauty is subjective and varies across cultures, time periods, and personal preferences. Our analysis is meant to be informative and suggestive, not definitive.
            </p>
            <p className="text-gray-700 mt-2">
              Our free AI attractiveness test should be used as a helpful guide in your personal grooming and styling journey, not as an absolute measure of worth or beauty. True attractiveness encompasses many factors beyond physical appearance, including confidence, personality, and character. We encourage a balanced perspective on beauty that values inner qualities as much as external features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}