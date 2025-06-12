import React, { useState, useRef, useEffect } from 'react';
import { X, MapPin, Users, Calendar } from 'lucide-react';
import './App.css';

// Nigeria states data
const nigeriaStates = {
  'Abia': { capital: 'Umuahia', population: '3.7M', founded: '1991' },
  'Adamawa': { capital: 'Yola', population: '4.2M', founded: '1991' },
  'Akwa Ibom': { capital: 'Uyo', population: '5.5M', founded: '1987' },
  'Anambra': { capital: 'Awka', population: '5.5M', founded: '1991' },
  'Bauchi': { capital: 'Bauchi', population: '6.5M', founded: '1976' },
  'Bayelsa': { capital: 'Yenagoa', population: '2.3M', founded: '1996' },
  'Benue': { capital: 'Makurdi', population: '5.7M', founded: '1976' },
  'Borno': { capital: 'Maiduguri', population: '5.9M', founded: '1976' },
  'Cross River': { capital: 'Calabar', population: '3.7M', founded: '1967' },
  'Delta': { capital: 'Asaba', population: '5.7M', founded: '1991' },
  'Ebonyi': { capital: 'Abakaliki', population: '2.9M', founded: '1996' },
  'Edo': { capital: 'Benin City', population: '4.2M', founded: '1991' },
  'Ekiti': { capital: 'Ado-Ekiti', population: '3.3M', founded: '1996' },
  'Enugu': { capital: 'Enugu', population: '4.4M', founded: '1991' },
  'Gombe': { capital: 'Gombe', population: '3.3M', founded: '1996' },
  'Imo': { capital: 'Owerri', population: '5.4M', founded: '1976' },
  'Jigawa': { capital: 'Dutse', population: '5.8M', founded: '1991' },
  'Kaduna': { capital: 'Kaduna', population: '8.3M', founded: '1967' },
  'Kano': { capital: 'Kano', population: '13.4M', founded: '1967' },
  'Katsina': { capital: 'Katsina', population: '7.8M', founded: '1987' },
  'Kebbi': { capital: 'Birnin Kebbi', population: '4.4M', founded: '1991' },
  'Kogi': { capital: 'Lokoja', population: '4.5M', founded: '1991' },
  'Kwara': { capital: 'Ilorin', population: '3.2M', founded: '1967' },
  'Lagos': { capital: 'Ikeja', population: '15.4M', founded: '1967' },
  'Nasarawa': { capital: 'Lafia', population: '2.5M', founded: '1996' },
  'Niger': { capital: 'Minna', population: '5.6M', founded: '1976' },
  'Ogun': { capital: 'Abeokuta', population: '5.2M', founded: '1976' },
  'Ondo': { capital: 'Akure', population: '4.7M', founded: '1976' },
  'Osun': { capital: 'Osogbo', population: '4.7M', founded: '1991' },
  'Oyo': { capital: 'Ibadan', population: '7.8M', founded: '1976' },
  'Plateau': { capital: 'Jos', population: '4.2M', founded: '1976' },
  'Rivers': { capital: 'Port Harcourt', population: '7.3M', founded: '1967' },
  'Sokoto': { capital: 'Sokoto', population: '4.9M', founded: '1976' },
  'Taraba': { capital: 'Jalingo', population: '3.1M', founded: '1991' },
  'Yobe': { capital: 'Damaturu', population: '3.3M', founded: '1991' },
  'Zamfara': { capital: 'Gusau', population: '4.5M', founded: '1996' },
  'FCT': { capital: 'Abuja', population: '3.6M', founded: '1976' }
};

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [showPanel, setShowPanel] = useState(false);
  const mapRef = useRef(null);
  const [effects, setEffects] = useState([]);

  // Create water droplet effect
  const createWaterEffect = (event) => {
    const rect = mapRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const effectId = Date.now();
    const newEffect = { id: effectId, x, y };
    
    setEffects(prev => [...prev, newEffect]);
    
    // Remove effect after animation completes
    setTimeout(() => {
      setEffects(prev => prev.filter(effect => effect.id !== effectId));
    }, 1000);
  };

  // Handle state click
  const handleStateClick = (event, stateName) => {
    event.preventDefault();
    event.stopPropagation();
    
    console.log('State clicked:', stateName);
    
    createWaterEffect(event);
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

  // Load SVG content and add event listeners
  useEffect(() => {
    const loadSVG = async () => {
      try {
        const response = await fetch('/nigeria_map.svg');
        const svgText = await response.text();
        
        if (mapRef.current) {
          mapRef.current.innerHTML = svgText;
          
          // Add event listeners to all paths
          const paths = mapRef.current.querySelectorAll('path');
          console.log('Found paths:', paths.length);
          
          paths.forEach((path, index) => {
            // Try to get state name from path id or use index
            const stateName = Object.keys(nigeriaStates)[index] || `State ${index + 1}`;
            
            // Set initial styles
            path.style.fill = '#10b981';
            path.style.stroke = '#ffffff';
            path.style.strokeWidth = '1';
            path.style.cursor = 'pointer';
            path.style.transition = 'all 0.3s ease';
            
            // Add click event listener
            path.addEventListener('click', (e) => {
              console.log('Path clicked:', stateName);
              handleStateClick(e, stateName);
            });
            
            // Add hover effects
            path.addEventListener('mouseenter', () => {
              if (!path.classList.contains('active')) {
                path.style.fill = '#059669';
                path.style.stroke = '#06b6d4';
                path.style.strokeWidth = '2';
              }
            });
            
            path.addEventListener('mouseleave', () => {
              if (!path.classList.contains('active')) {
                path.style.fill = '#10b981';
                path.style.stroke = '#ffffff';
                path.style.strokeWidth = '1';
              }
            });
          });
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        // Fallback: create a simple interactive placeholder
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <svg viewBox="0 0 400 300" class="w-full h-auto">
              <rect x="50" y="50" width="300" height="200" fill="#10b981" stroke="#ffffff" stroke-width="2" rx="10" class="interactive-rect"/>
              <text x="200" y="150" text-anchor="middle" fill="white" font-size="16">Nigeria Map</text>
              <text x="200" y="170" text-anchor="middle" fill="white" font-size="12">Click to see water effects</text>
            </svg>
          `;
          
          const rect = mapRef.current.querySelector('.interactive-rect');
          if (rect) {
            rect.style.cursor = 'pointer';
            rect.addEventListener('click', (e) => {
              console.log('Fallback rect clicked');
              handleStateClick(e, 'Nigeria');
            });
          }
        }
      }
    };

    loadSVG();
  }, []);

  return (
    <div className="map-container relative">
      {/* Header */}
      <header className="header-gradient fixed top-0 left-0 right-0 z-50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">
            Interactive Nigeria Map
          </h1>
          <p className="text-white/80 hidden md:block">
            Click on any state to explore with water effects
          </p>
        </div>
      </header>

      {/* Main Map Container */}
      <div className="flex items-center justify-center min-h-screen pt-20 px-4">
        <div className="relative max-w-4xl w-full">
          {/* SVG Map Container */}
          <div 
            ref={mapRef}
            className="nigeria-map w-full h-auto relative"
            style={{ maxHeight: '80vh' }}
          />
          
          {/* Water Effects */}
          {effects.map(effect => (
            <div key={effect.id} style={{ left: effect.x, top: effect.y }}>
              <div className="water-droplet" />
              <div className="ripple" />
              <div className="ripple" />
              <div className="ripple" />
            </div>
          ))}
        </div>
      </div>

      {/* Info Panel */}
      {showPanel && selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="info-panel slide-in p-6 max-w-md w-full text-white relative">
            <button
              onClick={closePanel}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-bold mb-4 text-cyan-300">
              {selectedState}
            </h2>
            
            {nigeriaStates[selectedState] && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Capital</p>
                    <p className="font-semibold">{nigeriaStates[selectedState].capital}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Population</p>
                    <p className="font-semibold">{nigeriaStates[selectedState].population}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Calendar className="text-cyan-400" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Founded</p>
                    <p className="font-semibold">{nigeriaStates[selectedState].founded}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-white/80">
                Click on other states to explore more regions of Nigeria with beautiful water droplet effects!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
        <div className="info-panel p-4 text-white text-sm">
          <h3 className="font-semibold mb-2 text-cyan-300">How to Use</h3>
          <p className="text-white/80">
            Click or tap on any state on the map to see the water droplet effect and learn more about that region.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

