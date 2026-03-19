import React from 'react';

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="w-full h-full bg-transparent flex items-center justify-center p-8 overflow-hidden font-sans">
      <div className="w-full max-w-[800px] aspect-[1000/600] relative torn-paper-bg p-4 shadow-xl">
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full relative z-10"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#8c7355" />
            </marker>
            <filter id="boxShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* --- Labels --- */}
          <text x="50" y="130" className="text-[12px] fill-[#8c7355] font-bold uppercase tracking-[0.2em]">Input Layer</text>
          <text x="835" y="130" className="text-[12px] fill-[#8c7355] font-bold uppercase tracking-[0.2em]">Output Layer</text>

          {/* --- Groups --- */}
          
          {/* Input Layer Dashed Box */}
          <rect x="50" y="150" width="225" height="300" rx="15" fill="none" stroke="#8c7355" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" />
          
          {/* Output Layer Dashed Box */}
          <rect x="655" y="150" width="285" height="520" rx="15" fill="none" stroke="#8c7355" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.4" />

          {/* --- Connections --- */}
          
          {/* Users to Sensors */}
          <line x1="150" y1="470" x2="150" y2="315" stroke="#8c7355" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="165" y="400" className="text-[12px] fill-[#8c7355] font-bold uppercase tracking-widest">Interact With</text>

          {/* Sensors to ESP32 */}
          <line x1="255" y1="240" x2="360" y2="240" stroke="#8c7355" strokeWidth="2" markerEnd="url(#arrowhead)" />

          {/* ESP32 to Unity Engine */}
          <line x1="550" y1="240" x2="710" y2="240" stroke="#8c7355" strokeWidth="2" markerEnd="url(#arrowhead)" />
          <text x="570" y="225" className="text-[12px] fill-[#8c7355] font-bold uppercase tracking-widest">Send Message</text>

          {/* ESP32 to Physical Fan */}
          <path d="M460 330 L460 550 L710 550" stroke="#8c7355" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
          <text x="475" y="535" className="text-[12px] fill-[#8c7355] font-bold uppercase tracking-widest">Send Message</text>

          {/* --- Boxes --- */}

          {/* Sensors Box */}
          <g filter="url(#boxShadow)">
            <rect x="65" y="180" width="190" height="120" rx="12" fill="white" stroke="#e5e1d8" strokeWidth="1" />
            <text x="160" y="235" textAnchor="middle" className="text-[20px] font-black fill-[#4a4a4a]">Sensors</text>
            <text x="160" y="260" textAnchor="middle" className="text-[12px] italic fill-[#8c7355] opacity-60">(Buttons, Potentiometer)</text>
          </g>

          {/* Users Box */}
          <g filter="url(#boxShadow)">
            <rect x="75" y="470" width="165" height="100" rx="12" fill="white" stroke="#e5e1d8" strokeWidth="1" />
            <text x="157" y="525" textAnchor="middle" className="text-[20px] font-black fill-[#4a4a4a]">Users</text>
          </g>

          {/* ESP32 Box */}
          <g filter="url(#boxShadow)">
            <rect x="370" y="210" width="180" height="120" rx="15" fill="white" stroke="#e5e1d8" strokeWidth="1" />
            {/* Controller Badge */}
            <rect x="420" y="195" width="85" height="28" rx="10" fill="#8c7355" />
            <text x="462" y="213" textAnchor="middle" className="text-[10px] font-bold fill-white uppercase tracking-widest">Controller</text>
            
            <text x="460" y="270" textAnchor="middle" className="text-[28px] font-black fill-[#4a4a4a]">ESP32</text>
            <text x="460" y="300" textAnchor="middle" className="text-[12px] italic fill-[#8c7355] opacity-60">(Arduino Framework)</text>
          </g>

          {/* Unity Engine Box */}
          <g filter="url(#boxShadow)">
            <rect x="725" y="190" width="175" height="100" rx="12" fill="white" stroke="#e5e1d8" strokeWidth="1" />
            <text x="812" y="245" textAnchor="middle" className="text-[20px] font-black fill-[#4a4a4a]">Unity Engine</text>
          </g>

          {/* Physical Fan Box */}
          <g filter="url(#boxShadow)">
            <rect x="725" y="500" width="175" height="100" rx="12" fill="white" stroke="#e5e1d8" strokeWidth="1" />
            <text x="812" y="555" textAnchor="middle" className="text-[20px] font-black fill-[#4a4a4a]">Physical Fan</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
