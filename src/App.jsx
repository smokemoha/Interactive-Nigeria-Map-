import React, { useState, useRef, useEffect } from 'react';
import { X, MapPin, Users, Calendar, Globe, Loader2, Search, Share2 } from 'lucide-react';
import nigeriaStatesData from './data/statesData.js';
import './App.css';

// Ultra-realistic Water Ripple Effect Class
class UltraRealisticWaterRipple {
  constructor(x, y, canvas) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.radius = 0;
    this.maxRadius = 200;
    this.opacity = 1;
    this.speed = 0.8; // Much slower for realistic effect
    this.lineWidth = 2;
    this.isActive = true;
    this.age = 0;
    this.maxAge = 250; // Longer lifespan
    this.amplitude = 1;
    this.frequency = 0.1;
    
    // Multiple ring system for ultra-realistic effect
    this.rings = [
      { offset: 0, opacity: 1, width: 2 },
      { offset: 15, opacity: 0.7, width: 1.5 },
      { offset: 30, opacity: 0.4, width: 1 },
      { offset: 45, opacity: 0.2, width: 0.5 }
    ];
  }

  update() {
    if (!this.isActive) return false;
    
    this.age++;
    this.radius += this.speed;
    
    // Realistic opacity decay with wave-like pattern
    const ageRatio = this.age / this.maxAge;
    this.opacity = Math.max(0, (1 - ageRatio) * (1 + 0.1 * Math.sin(this.age * this.frequency)));
    
    // Add slight amplitude variation for realism
    this.amplitude = 1 + 0.3 * Math.sin(this.age * 0.05);
    
    if (this.age >= this.maxAge || this.radius >= this.maxRadius) {
      this.isActive = false;
      return false;
    }
    return true;
  }

  draw() {
    if (!this.isActive) return;
    
    this.ctx.save();
    
    // Draw multiple concentric rings for ultra-realistic effect
    this.rings.forEach((ring, index) => {
      const ringRadius = this.radius - ring.offset;
      if (ringRadius <= 0) return;
      
      const ringOpacity = this.opacity * ring.opacity * this.amplitude;
      if (ringOpacity <= 0) return;
      
      this.ctx.globalAlpha = ringOpacity;
      
      // Gradient stroke for more realistic water effect
      const gradient = this.ctx.createRadialGradient(
        this.x, this.y, ringRadius - 5,
        this.x, this.y, ringRadius + 5
      );
      gradient.addColorStop(0, `rgba(6, 182, 212, ${ringOpacity})`);
      gradient.addColorStop(0.5, `rgba(255, 255, 255, ${ringOpacity * 0.8})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, ${ringOpacity * 0.3})`);
      
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = ring.width * this.amplitude;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, ringRadius, 0, Math.PI * 2);
      this.ctx.stroke();
      
      // Add inner glow effect
      if (index === 0) {
        this.ctx.globalAlpha = ringOpacity * 0.3;
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${ringOpacity * 0.5})`;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, ringRadius - 2, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    });
    
    this.ctx.restore();
  }
}

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <div className="text-center">
      <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
      <p className="text-white/80 text-lg">Loading Nigeria Map...</p>
      <div className="mt-4 w-64 bg-white/20 rounded-full h-2">
        <div className="bg-cyan-400 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
      </div>
    </div>
  </div>
);

// Search Component
const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => (
  <div className="relative mb-4">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
    <input
      type="text"
      placeholder="Search states..."
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
      }}
      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-cyan-400 transition-colors"
    />
  </div>
);

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const animationRef = useRef(null);

  // Create ultra-realistic water ripple effect
  const createWaterRipple = (event) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple = new UltraRealisticWaterRipple(x, y, canvasRef.current);
    setRipples(prev => [...prev.slice(-3), newRipple]); // Keep max 4 ripples for performance
  };

  // Animation loop for ripples
  const animateRipples = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas with slight fade for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw ripples
    setRipples(prev => {
      const activeRipples = prev.filter(ripple => {
        const isActive = ripple.update();
        if (isActive) {
          ripple.draw();
        }
        return isActive;
      });
      return activeRipples;
    });
    
    animationRef.current = requestAnimationFrame(animateRipples);
  };

  // Handle search
  const handleSearch = (term) => {
    if (!term.trim()) {
      setFilteredStates([]);
      return;
    }
    
    const filtered = Object.keys(nigeriaStatesData).filter(state =>
      state.toLowerCase().includes(term.toLowerCase()) ||
      nigeriaStatesData[state].capital.toLowerCase().includes(term.toLowerCase()) ||
      nigeriaStatesData[state].region.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStates(filtered);
  };

  // Handle state click
  const handleStateClick = (event, stateName) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('State clicked:', stateName);
    
    createWaterRipple(event);
    setSelectedState(stateName);
    setShowPanel(true);
    
    // Add active class to clicked state
    const allPaths = mapRef.current.querySelectorAll('path');
    allPaths.forEach(path => path.classList.remove('active'));
    event.target.classList.add('active');
  };

  // Close info panel
  const closePanel = () => {
    setShowPanel(false);
    setSelectedState(null);
    
    // Remove active class from all states
    if (mapRef.current) {
      const allPaths = mapRef.current.querySelectorAll('path');
      allPaths.forEach(path => path.classList.remove('active'));
    }
  };

  // Share functionality
  const handleShare = () => {
    if (navigator.share && selectedState) {
      navigator.share({
        title: `${selectedState} - Nigeria Interactive Map`,
        text: `Explore ${selectedState} state in Nigeria with interactive water effects!`,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Load SVG content and add event listeners
  useEffect(() => {
    const loadSVG = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/nigeria_map.svg');
        if (!response.ok) {
          throw new Error('Failed to load map');
        }
        
        const svgText = await response.text();
        
        if (mapRef.current) {
          mapRef.current.innerHTML = svgText;
          
          // Get all paths and map them to states
          const paths = mapRef.current.querySelectorAll('path');
          const stateNames = Object.keys(nigeriaStatesData);
          
          console.log('Found paths:', paths.length);
          console.log('Available states:', stateNames.length);
          
          // Better state mapping - try to match by area or position
          const stateMapping = [
            'Lagos', 'Ogun', 'Oyo', 'Osun', 'Ekiti', 'Ondo', // Southwest
            'Kwara', 'Kogi', 'Niger', 'FCT', 'Nasarawa', 'Plateau', 'Benue', // North Central
            'Sokoto', 'Zamfara', 'Kebbi', 'Katsina', 'Kano', 'Jigawa', 'Kaduna', // Northwest
            'Bauchi', 'Yobe', 'Borno', 'Adamawa', 'Gombe', 'Taraba', // Northeast
            'Edo', 'Delta', 'Bayelsa', 'Rivers', 'Akwa Ibom', 'Cross River', // South South
            'Enugu', 'Ebonyi', 'Anambra', 'Imo', 'Abia' // Southeast
          ];
          
          paths.forEach((path, index) => {
            const stateName = stateMapping[index] || stateNames[index % stateNames.length];
            
            // Set initial styles with smooth transitions
            path.style.fill = '#10b981';
            path.style.stroke = '#ffffff';
            path.style.strokeWidth = '1';
            path.style.cursor = 'pointer';
            path.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            path.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
            
            // Store state name as data attribute
            path.setAttribute('data-state', stateName);
            path.setAttribute('aria-label', `${stateName} state`);
            path.setAttribute('role', 'button');
            path.setAttribute('tabindex', '0');
            
            // Add click event listener
            path.addEventListener('click', (e) => {
              console.log('Path clicked:', stateName);
              handleStateClick(e, stateName);
            });
            
            // Add keyboard support
            path.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStateClick(e, stateName);
              }
            });
            
            // Enhanced hover effects
            path.addEventListener('mouseenter', () => {
              if (!path.classList.contains('active')) {
                path.style.fill = '#059669';
                path.style.stroke = '#06b6d4';
                path.style.strokeWidth = '2';
                path.style.filter = 'drop-shadow(0 4px 8px rgba(6, 182, 212, 0.3))';
                path.style.transform = 'scale(1.02)';
              }
            });
            
            path.addEventListener('mouseleave', () => {
              if (!path.classList.contains('active')) {
                path.style.fill = '#10b981';
                path.style.stroke = '#ffffff';
                path.style.strokeWidth = '1';
                path.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))';
                path.style.transform = 'scale(1)';
              }
            });
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading SVG:', error);
        setError('Failed to load the Nigeria map. Please refresh the page.');
        setIsLoading(false);
      }
    };

    loadSVG();
  }, []);

  // Setup canvas and animation
  useEffect(() => {
    if (canvasRef.current && mapRef.current && !isLoading) {
      const mapRect = mapRef.current.getBoundingClientRect();
      const canvas = canvasRef.current;
      
      // Set canvas size to match map
      canvas.width = mapRect.width;
      canvas.height = mapRect.height;
      
      // Start animation loop
      animationRef.current = requestAnimationFrame(animateRipples);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoading]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && mapRef.current) {
        const mapRect = mapRef.current.getBoundingClientRect();
        canvasRef.current.width = mapRect.width;
        canvasRef.current.height = mapRect.height;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container relative">
      {/* Header */}
      <header className="header-gradient fixed top-0 left-0 right-0 z-50 p-4 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Interactive Nigeria Map
          </h1>
          <p className="text-white/80 hidden md:block">
            Click on any state to explore with ultra-realistic water effects
          </p>
        </div>
      </header>

      {/* Search Panel */}
      <div className="fixed top-20 left-4 z-40 w-80 max-w-[calc(100vw-2rem)]">
        <div className="info-panel p-4">
          <SearchBar 
            onSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {filteredStates.length > 0 && (
            <div className="mt-2 max-h-40 overflow-y-auto">
              {filteredStates.map(state => (
                <button
                  key={state}
                  onClick={() => {
                    setSelectedState(state);
                    setShowPanel(true);
                    setSearchTerm('');
                    setFilteredStates([]);
                  }}
                  className="w-full text-left p-2 hover:bg-white/10 rounded text-white/90 text-sm transition-colors"
                >
                  {state} - {nigeriaStatesData[state].capital}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Map Container */}
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="relative max-w-4xl w-full">
          {/* SVG Map Container */}
          <div className="relative">
            <div 
              ref={mapRef}
              className="nigeria-map w-full h-auto relative transition-all duration-500"
              style={{ maxHeight: '80vh' }}
            />
            
            {/* Canvas Overlay for Water Effects */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 pointer-events-none"
              style={{ zIndex: 10 }}
            />
          </div>
        </div>
      </div>

      {/* Enhanced Info Panel */}
      {showPanel && selectedState && nigeriaStatesData[selectedState] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="info-panel slide-in p-6 max-w-lg w-full text-white relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-cyan-300">
                {selectedState}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={closePanel}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Capital</p>
                    <p className="font-semibold">{nigeriaStatesData[selectedState].capital}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Population</p>
                    <p className="font-semibold">{nigeriaStatesData[selectedState].population}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Founded</p>
                    <p className="font-semibold">{nigeriaStatesData[selectedState].founded}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Region</p>
                    <p className="font-semibold">{nigeriaStatesData[selectedState].region}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white/10 rounded-lg">
                <h3 className="font-semibold mb-2 text-cyan-300">About {selectedState}</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {nigeriaStatesData[selectedState].description}
                </p>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30">
                <p className="text-xs text-cyan-200">
                  💧 Click on other states to explore more with ultra-realistic water ripple effects!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Instructions */}
      <div className="fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)]">
        <div className="info-panel p-4 text-white text-sm">
          <h3 className="font-semibold mb-2 text-cyan-300">How to Use</h3>
          <ul className="space-y-1 text-white/80">
            <li>• Click or tap any state for water effects</li>
            <li>• Use search to find specific states</li>
            <li>• Keyboard navigation supported</li>
            <li>• Share interesting discoveries</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

