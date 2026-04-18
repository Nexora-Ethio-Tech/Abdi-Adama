
export const ShootingStars = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="shooting-stars">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="shooting-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      <style>{`
        .shooting-stars {
          position: absolute;
          width: 100%;
          height: 100%;
          transform: rotate(-45deg);
        }
        .shooting-star {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 2px;
          background: linear-gradient(-45deg, #5f91ff, rgba(0, 0, 255, 0));
          border-radius: 999px;
          filter: drop-shadow(0 0 6px #699bff);
          animation: tail 3s ease-in-out infinite, shooting 3s ease-in-out infinite;
        }
        @keyframes tail {
          0% { width: 0; }
          30% { width: 100px; }
          100% { width: 0; }
        }
        @keyframes shooting {
          0% { transform: translateX(0); }
          100% { transform: translateX(300px); }
        }
        .shooting-star::before, .shooting-star::after {
          content: '';
          position: absolute;
          top: calc(50% - 1px);
          right: 0;
          height: 2px;
          background: linear-gradient(-45deg, rgba(0, 0, 255, 0), #5f91ff, rgba(0, 0, 255, 0));
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
