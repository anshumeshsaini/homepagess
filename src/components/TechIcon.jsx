const TechIcon = ({ activity, icon, description, delay }) => (
  <div 
    className="cyber-icon-box group cursor-pointer" 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="cyber-icon">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform"
      >
        <path d={icon} />
      </svg>
    </div>
    <span className="text-sm mt-3 text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
      {activity}
    </span>
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-max max-w-xs p-2 rounded bg-black/90 border border-cyan-500/20 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-4">
      {description}
    </div>
  </div>
);

export default TechIcon;
