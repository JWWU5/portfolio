import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../../types';

interface SystemArchitectureProps {
  project: Project;
  theme: any;
}

export const SystemArchitecture: React.FC<SystemArchitectureProps> = ({ project, theme }) => {
  if (!project.architecture) return null;

  const isVirtualLand = project.id === 'virtualland';

  return (
    <section className={`flex flex-col justify-center py-20 border-t ${theme.border} relative z-10 mx-4 sm:mx-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12 w-full">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-[24px] uppercase tracking-[0.2em] ${theme.accent} font-normal`}
          >
            03 System Architecture
          </motion.h2>
        </div>

        {isVirtualLand ? (
          <div className="relative w-full flex justify-center py-12">
            <div className="w-full max-w-[1000px] h-[600px] relative">
              <ArchitectureDiagram theme={theme} />
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-12 rounded-3xl border bg-white ${theme.border} shadow-sm`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {['hw', 'bridge', 'sw'].map((type, i) => (
                <motion.div 
                  key={type} 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                >
                  <span className={`text-[10px] uppercase tracking-widest ${theme.muted}`}>
                    {type === 'hw' ? 'Hardware Layer' : type === 'bridge' ? 'Communication' : 'Software Layer'}
                  </span>
                  <div className="space-y-3">
                    {project.architecture?.nodes.filter(n => n.type === type).map(node => (
                      <div key={node.id} className={`p-4 rounded-xl border bg-[#f5f2ed] ${theme.border} ${theme.text} text-sm font-normal flex items-center gap-3 hover:bg-[#e5e1d8] transition-colors duration-300`}>
                        <div className={`w-1.5 h-1.5 rounded-full bg-[#8c7355]`} />
                        {node.label}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

const ArchitectureDiagram: React.FC<{ theme: any }> = ({ theme }) => {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  const descriptions: Record<string, string> = {
    sensors: "Sensors capture user interactions and convert them into electrical signals that are transmitted to the ESP32 microcontroller.",
    esp32: "The ESP32 receives and processes the sensor data, then sends the corresponding messages to Unity to trigger appropriate responses in the virtual environment.",
    unity: "Unity is used to simulate the forest environment for this product",
    fan: "Fan is controlled by ESP32 to simulate windy environment"
  };

  return (
    <div className="relative w-full h-full">
      {/* SVG for Arrows */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#8c7355" />
          </marker>
        </defs>
        
        {/* Users to Sensors */}
        <motion.line 
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          x1="200" y1="365" x2="200" y2="220" stroke="#8c7355" strokeWidth="2" markerEnd="url(#arrowhead)" 
        />
        <text x="215" y="295" className={`text-[11px] fill-[#8c7355] font-sans uppercase tracking-widest font-medium`}>interact with</text>

        {/* Sensors to ESP32 */}
        <motion.line 
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          x1="300" y1="170" x2="410" y2="170" stroke="#8c7355" strokeWidth="2" markerEnd="url(#arrowhead)" 
        />

        {/* ESP32 to Unity */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1 }}
          d="M590 170 L750 170" stroke="#8c7355" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" 
        />
        <text x="615" y="160" className={`text-[11px] fill-[#8c7355] font-sans uppercase tracking-widest font-medium`}>send message</text>

        {/* ESP32 to Fan */}
        <motion.path 
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.4 }}
          d="M500 220 L500 410 L750 410" stroke="#8c7355" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" 
        />
        <text x="515" y="400" className={`text-[11px] fill-[#8c7355] font-sans uppercase tracking-widest font-medium`}>send message</text>
      </svg>

      {/* Input Group */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute top-[70px] left-[100px] w-[220px] h-[170px] border-2 border-dashed border-[#8c7355]/30 rounded-2xl bg-[#fdfcf8]/50"
      >
        <span className={`absolute -top-7 left-2 font-bold ${theme.accent} text-[10px] uppercase tracking-[0.2em]`}>Input Layer</span>
        <motion.div 
          onMouseEnter={() => setHoveredId('sensors')}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(140, 115, 85, 0.15)" }}
          className="absolute inset-4 rounded-xl border border-[#8c7355]/20 bg-white flex flex-col items-center justify-center text-center p-4 shadow-sm transition-colors hover:border-[#8c7355]/50 group cursor-help"
        >
          <span className={`font-medium ${theme.text} text-lg tracking-tight group-hover:text-[#8c7355] transition-colors`}>Sensors</span>
          <span className={`text-[10px] ${theme.muted} mt-2 font-light italic`}>(Buttons, Potentiometer)</span>
        </motion.div>
      </motion.div>

      {/* Users */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-[365px] left-[125px] w-[160px] h-[90px] rounded-xl border border-[#8c7355]/20 bg-white flex items-center justify-center shadow-sm"
      >
        <span className={`font-medium ${theme.text} text-lg tracking-tight`}>Users</span>
      </motion.div>

      {/* ESP32 */}
      <motion.div 
        onMouseEnter={() => setHoveredId('esp32')}
        onMouseLeave={() => setHoveredId(null)}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -5, boxShadow: "0 25px 50px rgba(140, 115, 85, 0.2)" }}
        className="absolute top-[120px] left-[410px] w-[180px] h-[100px] rounded-xl border-2 border-[#8c7355]/40 bg-[#fdfcf8] flex flex-col items-center justify-center text-center p-4 shadow-md transition-all hover:border-[#8c7355] group z-10 cursor-help"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#8c7355] rounded-full">
          <span className="text-[8px] text-white font-bold uppercase tracking-widest">Controller</span>
        </div>
        <span className={`font-bold ${theme.text} text-xl tracking-tight group-hover:text-[#8c7355] transition-colors`}>ESP32</span>
        <span className={`text-[10px] ${theme.muted} mt-2 font-light`}>(Arduino Framework)</span>
      </motion.div>

      {/* Output Group */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="absolute top-[70px] left-[690px] w-[280px] h-[420px] border-2 border-dashed border-[#8c7355]/30 rounded-2xl bg-[#fdfcf8]/50"
      >
        <span className={`absolute -top-7 right-2 font-bold ${theme.accent} text-[10px] uppercase tracking-[0.2em]`}>Output Layer</span>
        
        {/* Unity */}
        <motion.div 
          onMouseEnter={() => setHoveredId('unity')}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(140, 115, 85, 0.15)" }}
          className="absolute top-[60px] left-[65px] w-[150px] h-[90px] rounded-xl border border-[#8c7355]/20 bg-white flex items-center justify-center shadow-sm transition-colors hover:border-[#8c7355]/50 group cursor-help"
        >
          <span className={`font-medium ${theme.text} text-lg tracking-tight group-hover:text-[#8c7355] transition-colors`}>Unity Engine</span>
        </motion.div>

        {/* Fan */}
        <motion.div 
          onMouseEnter={() => setHoveredId('fan')}
          onMouseLeave={() => setHoveredId(null)}
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(140, 115, 85, 0.15)" }}
          className="absolute top-[270px] left-[65px] w-[150px] h-[90px] rounded-xl border border-[#8c7355]/20 bg-white flex items-center justify-center shadow-sm transition-colors hover:border-[#8c7355]/50 group cursor-help"
        >
          <span className={`font-medium ${theme.text} text-lg tracking-tight group-hover:text-[#8c7355] transition-colors`}>Physical Fan</span>
        </motion.div>
      </motion.div>

      {/* Hover UI Overlay */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-full max-w-[600px] z-[50] pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-md border border-[#8c7355]/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#8c7355] animate-pulse" />
                <span className={`text-[10px] uppercase tracking-[0.3em] ${theme.accent} font-bold`}>
                  {hoveredId} Details
                </span>
                <div className="w-2 h-2 rounded-full bg-[#8c7355] animate-pulse" />
              </div>
              <p className={`text-sm leading-relaxed ${theme.text} font-light italic`}>
                {descriptions[hoveredId]}
              </p>
              
              {hoveredId === 'esp32' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full mt-4 p-4 rounded-xl bg-[#fdfcf8] border border-[#8c7355]/10"
                >
                  <span className="text-[9px] uppercase tracking-widest text-[#8c7355]/60 mb-3 block">Circuit Schematic</span>
                  <div className="relative w-full aspect-[2/1] bg-white rounded-lg border border-[#8c7355]/5 p-4 overflow-hidden">
                    {/* Simplified SVG Circuit Diagram based on user image */}
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      {/* ESP32 Main Box */}
                      <rect x="50" y="20" width="300" height="60" fill="none" stroke="#4a4a4a" strokeWidth="2" />
                      <text x="200" y="55" textAnchor="middle" className="text-xl font-bold fill-[#4a4a4a]">ESP32</text>
                      
                      {/* Connections */}
                      {/* Button/Switch */}
                      <line x1="100" y1="80" x2="100" y2="100" stroke="#4a4a4a" strokeWidth="1.5" />
                      <path d="M90 120 L110 120 M100 120 L100 140" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <path d="M95 140 L105 140 M97 145 L103 145 M99 150 L101 150" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <text x="70" y="145" className="text-[8px] fill-[#4a4a4a]">GND</text>
                      <path d="M100 100 L115 110" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <circle cx="100" cy="100" r="2" fill="#4a4a4a" />
                      <circle cx="115" cy="110" r="2" fill="#4a4a4a" />

                      {/* Potentiometer */}
                      <line x1="200" y1="80" x2="200" y2="100" stroke="#4a4a4a" strokeWidth="1.5" />
                      <path d="M180 120 L190 120 L195 110 L205 130 L210 120 L220 120" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <path d="M200 100 L200 115" fill="none" stroke="#4a4a4a" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                      <text x="165" y="135" className="text-[8px] fill-[#4a4a4a]">GND</text>
                      <text x="225" y="135" className="text-[8px] fill-[#4a4a4a]">VCC</text>

                      {/* Motor Driver & Motor */}
                      <line x1="300" y1="80" x2="300" y2="100" stroke="#4a4a4a" strokeWidth="1.5" />
                      <rect x="270" y="100" width="60" height="40" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <text x="300" y="120" textAnchor="middle" className="text-[8px] font-bold fill-[#4a4a4a]">Motor Driver</text>
                      <circle cx="370" cy="120" r="15" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <text x="370" y="124" textAnchor="middle" className="text-sm font-bold fill-[#4a4a4a]">M</text>
                      <path d="M330 110 L355 110 M330 130 L355 130" fill="none" stroke="#4a4a4a" strokeWidth="1.5" />
                      <line x1="300" y1="140" x2="300" y2="160" stroke="#4a4a4a" strokeWidth="1.5" />
                      <text x="310" y="165" className="text-[8px] fill-[#4a4a4a]">5V</text>
                    </svg>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
