
export const ShootingStars = () => {
  const colors = ['#5f91ff', '#ff5f91', '#91ff5f', '#ffda5f', '#ffffff'];
  const starCount = 3 + Math.floor(Math.random() * 4); // Random between 3 and 6

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="shooting-stars">
        {[...Array(starCount)].map((_, i) => {
          const color = colors[Math.floor(Math.random() * colors.length)];
          // True chaos: randomize every physical property
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const angle = Math.random() * 360;
          const duration = 1.5 + Math.random() * 6;
          const delay = Math.random() * 20; // Longer delay spread
          const travel = 300 + Math.random() * 800;
          const size = 1 + Math.random() * 3;

          return (
            <div
              key={i}
              className="shooting-star"
              style={{
                top: `${startY}%`,
                left: `${startX}%`,
                height: `${size}px`,
                background: `linear-gradient(-45deg, ${color}, rgba(0, 0, 255, 0))`,
                filter: `drop-shadow(0 0 8px ${color})`,
                transform: `rotate(${angle}deg)`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                ['--travel-dist' as any]: `${travel}px`,
                ['--star-color' as any]: color,
                opacity: 0.3 + Math.random() * 0.7
              }}
            />
          );
        })}
      </div>
      <style>{`
        .shooting-stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        .shooting-star {
          position: absolute;
          height: 2px;
          border-radius: 999px;
          animation: tail var(--animation-duration, 3s) ease-in-out infinite, shooting var(--animation-duration, 3s) ease-in-out infinite;
        }
        @keyframes tail {
          0% { width: 0; }
          30% { width: 100px; }
          100% { width: 0; }
        }
        @keyframes shooting {
          0% { transform: translateX(0) rotate(inherit); }
          100% { transform: translateX(var(--travel-dist, 300px)) rotate(inherit); }
        }
        .shooting-star::before, .shooting-star::after {
          content: '';
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          height: 2px;
          background: linear-gradient(-45deg, rgba(0, 0, 255, 0), var(--star-color, #5f91ff), rgba(0, 0, 255, 0));
          transform: translateX(50%) rotateZ(45deg);
          border-radius: 100%;
          animation: shining 3s ease-in-out infinite;
        }
        .shooting-star::after {
          transform: translateX(50%) rotateZ(-45deg);
        }
        @keyframes shining {
          0% { width: 0; }
          50% { width: 30px; }
          100% { width: 0; }
        }
      `}</style>
    </div>
  );
};
