import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Upload, Search, Sparkles, Loader2, Star, Heart } from 'lucide-react';
import { analyzeImage } from '../lib/gemini';
import SupportBlock from '../components/SupportBlock';

// Default image path
const DEFAULT_IMAGE = "/default-image.jpg"; 

// Default analysis for the attractiveness test with score
const DEFAULT_ANALYSIS = `## Attractiveness Score: 87/100

## Attractiveness Analysis

### Facial Features Assessment
This young woman displays excellent facial symmetry with balanced proportions between her features. Her face has a pleasing oval shape with defined jawline and harmonious spacing between eyes, nose, and mouth. Her blue-green eyes are expressive and well-proportioned, complemented by naturally full eyebrows that frame her upper face beautifully. Her nose is straight with a refined tip, and her lips have a natural fullness with a well-defined cupid's bow. Her skin appears clear and even-toned with a healthy glow.

### Style & Presentation
Her styling choices include:
- Hair: Long, straight blonde hair with a side part that complements her face shape
- Clothing: Sporty zip-up top with black and white color blocking that creates visual interest
- Makeup: Appears to be wearing minimal makeup, allowing her natural features to shine through
- Overall presentation: Clean, sporty-casual look that projects a fresh and approachable image
- Body language: The hand position suggests confidence and thoughtfulness

### Strengths
- Excellent facial symmetry and balanced proportions
- Clear, even-toned skin with a healthy complexion
- Expressive eyes with a bright, alert quality
- Well-shaped natural eyebrows that frame her face effectively
- Defined jawline that contributes to facial structure
- Natural-looking lips with good definition
- Hair color that complements her skin tone
- Approachable, authentic presentation that projects confidence

### Enhancement Recommendations
- Hair styling: Consider adding layers to create more dimension and movement around the face
- Makeup options: A light application of mascara would enhance her already expressive eyes
- Subtle highlight on the cheekbones would accentuate her bone structure
- A sheer lip color in a rose or peach tone would complement her complexion
- Fashion: Experimenting with colors that enhance her eye color (like teals, soft purples, or coral tones)
- Consider earrings or delicate necklaces to draw attention to her facial features and neckline
- Maintain skincare routine to preserve her excellent skin quality

### Confidence & Presence
This individual already projects confidence through her poised expression and body language. To further enhance her natural presence:
- Practice maintaining eye contact in conversations to leverage the expressiveness of her eyes
- Experiment with different genuine smile variations to determine which best showcases her features
- Good posture (which she already demonstrates) continues to be important for overall presentation
- Authentic self-expression will always be more attractive than trying to conform to trending styles
- Focus on showcasing her natural approachability and thoughtful demeanor

Her overall presentation suggests someone with a naturally appealing appearance enhanced by a genuine, approachable quality. The recommendations above are simply options to explore rather than necessary changes, as she already presents a harmonious and attractive image.`;

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load default image and analysis without API call
    const loadDefaultContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(DEFAULT_IMAGE);
        if (!response.ok) {
          throw new Error('Failed to load default image');
        }
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          setImage(base64data);
          setAnalysis(DEFAULT_ANALYSIS);
          setLoading(false);
        };
        reader.onerror = () => {
          setError('Failed to load default image');
          setLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (err) {
        console.error('Error loading default image:', err);
        setError('Failed to load default image');
        setLoading(false);
      }
    };

    loadDefaultContent();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image size should be less than 20MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setError(null);
      handleAnalyze(base64String);
    };
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);

    // Reset the file input so the same file can be selected again
    e.target.value = '';
  }, []);

  const handleAnalyze = async (imageData: string) => {
    setLoading(true);
    setError(null);
    try {
      // Using the default prompt from gemini.ts which now focuses on attractiveness analysis
      const result = await analyzeImage(imageData);
      setAnalysis(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatAnalysis = (text: string) => {
    const lines = text.split('\n');
    let currentSection = '';
    let inNestedList = false;
    let nestedListType = ''; // To track if we're in 'Seasonal' or 'Time of Day' sections
    
    return lines.map((line, index) => {
      // Handle Score
      if (line.startsWith('## Attractiveness Score:')) {
        const score = line.match(/(\d+)\/100/)?.[1] || '0';
        return (
          <div key={index} className="flex flex-col items-center justify-center mb-8 mt-2 bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-2xl border border-purple-100 shadow-inner">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-1">Attractiveness Score</h2>
              <div className="flex items-center justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-7 w-7 ${parseInt(score) >= star * 20 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="relative w-60 h-60 mx-auto">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-52 h-52 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 shadow-inner"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-44 h-44 rounded-full bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                    <span className="text-5xl font-black text-white">{score}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <p className="text-lg font-semibold text-purple-800">{getScoreDescription(parseInt(score))}</p>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      // H2 headers (##)
      if (line.startsWith('## ') && !line.includes('Score')) {
        currentSection = line.replace('## ', '').trim();
        inNestedList = false;
        return (
          <h2 key={index} className="text-2xl font-bold text-purple-700 mt-8 mb-4 border-b border-purple-200 pb-2">
            {currentSection}
          </h2>
        );
      }
      
      // H3 headers (###)
      if (line.startsWith('### ')) {
        currentSection = line.replace('### ', '').trim();
        inNestedList = false;
        return (
          <h3 key={index} className="text-xl font-bold text-purple-600 mt-6 mb-3 flex items-center">
            <Heart className="h-5 w-5 text-pink-500 mr-2 inline" />
            {currentSection}
          </h3>
        );
      }
      
      // Bold with emoji verdict
      if (line.includes('**Verdict:')) {
        const [prefix, content] = line.split('**Verdict:');
        const verdictContent = content.split('**')[0];
        const remainder = content.split('**')[1] || '';
        
        return (
          <p key={index} className="text-lg font-bold mb-4">
            {prefix}<span className="text-purple-700 font-bold">Verdict: {verdictContent}</span>{remainder}
          </p>
        );
      }
      
      // Handle subsections with ** markings (like "**Seasonal Recommendations:**")
      if (line.trim().startsWith('- **') && line.includes(':**')) {
        const titleMatch = line.match(/\*\*([^*]+)\*\*/);
        const title = titleMatch ? titleMatch[1] : '';
        
        inNestedList = true;
        nestedListType = title;
        
        return (
          <p key={index} className="font-bold text-gray-800 mt-4 mb-2 ml-6">
            {title}:
          </p>
        );
      }
      
      // Numbered list items with bold headings - section headings
      if (/^\d+\.\s\*\*[^*]+\*\*:?$/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1] || '';
        inNestedList = false;
        
        return (
          <p key={index} className="font-bold text-gray-900 mt-4 mb-2">
            {number}. {title}
          </p>
        );
      }
      
      // Numbered list items with bold text - items with descriptions
      if (/^\d+\.\s\*\*[^*]+\*\*:/.test(line)) {
        const number = line.match(/^\d+/)?.[0] || '';
        const title = line.match(/\*\*([^*]+)\*\*/)?.[1] || '';
        const restOfLine = line.replace(/^\d+\.\s\*\*[^*]+\*\*:/, '').trim();
        inNestedList = false;
        
        return (
          <div key={index} className="mb-3">
            <p className="font-semibold text-gray-900">
              {number}. <span className="font-bold">{title}:</span>{restOfLine}
            </p>
          </div>
        );
      }
      
      // Indented bullet points with 5+ spaces (for nested lists)
      if (line.trim().startsWith('- ') && line.startsWith('     ')) {
        return (
          <li key={index} className="ml-12 mb-2 list-disc pl-1 text-gray-700">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Indented bullet points with 3-4 spaces
      if (line.trim().startsWith('- ') && (line.startsWith('   ') || line.startsWith('    '))) {
        return (
          <li key={index} className="ml-10 mb-2 list-disc pl-1 text-gray-700">
            {line.trim().substring(2)}
          </li>
        );
      }
      
      // Standard bullet points
      if (line.trim().startsWith('- ')) {
        return (
          <li key={index} className="ml-6 mb-2 list-disc pl-1 text-gray-700 group transition-all">
            <span className="group-hover:text-purple-700 transition-colors duration-300">
              {line.trim().substring(2)}
            </span>
          </li>
        );
      }
      
      // Empty lines
      if (!line.trim()) {
        return <div key={index} className="h-2"></div>;
      }
      
      // Regular text
      return (
        <p key={index} className="mb-3 text-gray-700">
          {line}
        </p>
      );
    });
  };

  // Helper function to get score description
  const getScoreDescription = (score: number): string => {
    if (score >= 90) return "Exceptional";
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 50) return "Average";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-purple-50 py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-3">
            <Sparkles className="h-10 w-10 text-purple-600 animate-pulse" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">Free AI Attractiveness Test</h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Upload your photo and get an instant analysis of your attractiveness with personalized improvement tips and a comparative score</p>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-12 border border-purple-100 transition-all hover:shadow-2xl">
          <div className="flex flex-col items-center justify-center mb-8">
            <label 
              htmlFor="image-upload"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 cursor-pointer w-full sm:w-auto transform hover:scale-105 shadow-md"
            >
              <Upload className="h-5 w-5" />
              Upload Your Photo to Analyze
              <input
                ref={fileInputRef}
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/jpg,image/webp"
                onChange={handleImageUpload}
              />
            </label>
            <p className="mt-3 text-sm text-gray-500">PNG, JPG, JPEG or WEBP (MAX. 20MB)</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-md border border-red-200">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {loading && !image && (
            <div className="flex flex-col items-center justify-center p-12">
              <Loader2 className="animate-spin h-12 w-12 text-purple-600 mb-4" />
              <span className="text-purple-600 font-medium">Analyzing your image...</span>
            </div>
          )}

          {image && (
            <div className="mb-8">
              <div className="relative rounded-xl mb-6 overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 shadow-inner p-2">
                <img
                  src={image}
                  alt="Portrait to analyze"
                  className="w-full h-auto max-h-[500px] object-contain mx-auto rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnalyze(image)}
                  disabled={loading}
                  className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="-ml-1 mr-2 h-5 w-5" />
                      Analyze Attractiveness
                    </>
                  )}
                </button>
                <button
                  onClick={triggerFileInput}
                  className="flex items-center justify-center px-6 py-3 border border-purple-300 text-base font-medium rounded-xl text-purple-700 bg-white hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transform hover:scale-105 transition-all duration-300"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Another Photo
                </button>
              </div>
            </div>
          )}

          {analysis && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 sm:p-8 border border-purple-100 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-purple-600 mr-2" />
                Your Beauty Analysis
              </h2>
              <div className="text-gray-700">
                {formatAnalysis(analysis)}
              </div>
            </div>
          )}
        </div>

        <SupportBlock />

        <div className="prose max-w-none my-12 p-8 bg-white rounded-xl shadow-lg border border-purple-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-purple-800">Free AI Attractiveness Test: Analyze Your Beauty Instantly</h2>
          
          <p>Welcome to our cutting-edge <strong>AI attractiveness test</strong> tool, designed to help you understand your unique beauty features and discover personalized ways to enhance your natural appearance. Our <strong>AI attractiveness test</strong> provides objective analysis, comparative scoring, and practical suggestions that can help you look and feel your best.</p>

          <h3 className="text-purple-700">How Our AI Attractiveness Test Works</h3>
          <p>Our sophisticated <strong>AI attractiveness test</strong> uses advanced facial recognition technology to analyze your portrait photo and identify key features, proportions, and styling elements. Simply upload your photo, and our <strong>AI attractiveness test</strong> will provide a comprehensive beauty analysis with a score out of 100. Whether you're curious about your facial features or seeking style advice, our <strong>AI attractiveness test</strong> gives you the personalized insights you need.</p>

          <h3 className="text-purple-700">Why Choose Our AI Attractiveness Test</h3>
          <ul>
            <li>Advanced AI facial analysis technology that provides objective beauty assessment</li>
            <li>Detailed analysis of facial features, symmetry, and proportions</li>
            <li>Numerical attractiveness score to help you compare different photos</li>
            <li>Comprehensive styling recommendations tailored to your unique features</li>
            <li>Fast processing with instant results for your uploaded photo</li>
            <li>Personalized beauty enhancement tips based on your specific features</li>
            <li>100% free to use <strong>AI attractiveness test</strong> with no hidden costs or subscriptions</li>
            <li>Privacy-focused approach that doesn't store your uploaded photos</li>
            <li>Supportive, constructive feedback that builds confidence</li>
          </ul>

          <h3 className="text-purple-700">When to Use Our AI Attractiveness Test:</h3>
          <ul>
            <li>When you're curious about your facial features and how they contribute to your overall look</li>
            <li>To select the most flattering photos for your dating profile or social media</li>
            <li>If you're considering changes to your hairstyle, makeup, or styling choices</li>
            <li>When preparing for important events or professional photos</li>
            <li>To understand which aspects of your appearance are particularly striking or distinctive</li>
            <li>For getting objective feedback about styling options that complement your natural features</li>
            <li>When seeking confidence-building insights about your unique beauty attributes</li>
          </ul>

          <p>Try our free <strong>AI attractiveness test</strong> today and gain valuable insights about your natural beauty. No registration required – simply upload your photo and let our <strong>AI attractiveness test</strong> analyze it instantly! Our <strong>AI attractiveness test</strong> tool helps you understand and enhance your natural beauty like never before.</p>
        </div>

        <SupportBlock />
      </div>
    </div>
  );
}