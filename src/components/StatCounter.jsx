const StatCounter = ({ value, label }) => (
  <div className="text-center p-4 backdrop-blur-sm bg-black/20 rounded-lg border border-cyan-500/20 hover:border-cyan-400/30 transition-all">
    <div className="text-4xl font-bold text-cyan-400 cyber-glow mb-2">{value}</div>
    <div className="text-sm text-gray-400 tracking-wide">{label}</div>
  </div>
);

export default StatCounter;
