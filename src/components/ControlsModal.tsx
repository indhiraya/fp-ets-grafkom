import React, { useEffect, useState } from "react";

interface ControlsModalProps {
  onClose(): void;
}

export default function ControlsModal({ onClose }: ControlsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const keyboardMap = [
    {
      category: "Movement",
      controls: [
        { name: "Move Forward", keys: ["↑", "W"], icon: "⬆️" },
        { name: "Move Backward", keys: ["↓", "S"], icon: "⬇️" },
        { name: "Move Left", keys: ["←", "A"], icon: "⬅️" },
        { name: "Move Right", keys: ["→", "D"], icon: "➡️" },
        { name: "Jump", keys: ["Space"], icon: "🦘" },
        { name: "Run/Sprint", keys: ["Shift"], icon: "💨" },
      ],
    },
    {
      category: "Combat",
      controls: [
        { name: "Melee Attack", keys: ["F"], icon: "👊" },
        { name: "Kick Attack", keys: ["E"], icon: "🦵" },
      ],
    },
    {
      category: "Other",
      controls: [
        { name: "Emote", keys: ["1"], icon: "😄" },
        { name: "Pause Menu", keys: ["Esc"], icon: "⏸️" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black">
      {/* Background Image with Overlay - Same as StartMenu */}
      <div className="absolute inset-0">
        {/* City Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/city-background.png')`,
            filter: "blur(2px)",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Animated Fog Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -inset-x-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen flex-col items-center justify-between px-4 py-6">
        {/* Header */}
        <div
          className={`transform transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-10 opacity-0"
          }`}
        >
          <div
            className="text-center"
            style={{ fontFamily: "Arial Black, sans-serif" }}
          >
            <h1
              className="relative mb-4"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontWeight: "900",
                lineHeight: "0.9",
                letterSpacing: "0.02em",
              }}
            >
              <span
                className="relative z-10"
                style={{
                  color: "#2563eb",
                  WebkitTextStroke: "4px white",
                  paintOrder: "stroke fill",
                  textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
                }}
              >
                CONTROLS
              </span>
            </h1>
            <p
              className="text-lg text-gray-300"
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              Master these controls to survive!
            </p>
          </div>
        </div>

        {/* Controls Grid */}
        <div
          className={`w-full max-w-6xl flex-1 transform transition-all duration-1000 delay-300  overflow-hidden ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 ">
            {keyboardMap.map((section, sectionIndex) => (
              <div
                key={section.category}
                className="space-y-3"
                style={{ animationDelay: `${sectionIndex * 100}ms` }}
              >
                <h3
                  className="text-2xl font-bold text-white mb-4"
                  style={{
                    textShadow: "3px 3px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  {section.category}
                </h3>

                <div className="space-y-2 ">
                  {section.controls.map((control, controlIndex) => (
                    <div
                      key={control.name}
                      className={`
                        group flex items-center justify-between p-3 
                        bg-gray-800/80 backdrop-blur-sm rounded-lg 
                        border-2 border-gray-600 
                        hover:border-blue-400 hover:bg-gray-700/80 
                        transition-all duration-300 transform hover:scale-[1.02]
                      `}
                      style={{
                        animationDelay: `${
                          sectionIndex * 100 + controlIndex * 50
                        }ms`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-200">
                          {control.icon}
                        </span>
                        <span className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {control.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {control.keys.map((key, keyIndex) => (
                          <React.Fragment key={key}>
                            {keyIndex > 0 && (
                              <span className="text-gray-500 text-sm">or</span>
                            )}
                            <kbd
                              className="
                              inline-flex items-center justify-center 
                              min-w-[2.5rem] h-8 px-2 
                              text-sm font-mono font-bold 
                              text-white bg-blue-600 
                              border-2 border-blue-400 
                              rounded-md shadow-lg shadow-blue-500/30
                              transform transition-transform hover:scale-105
                            "
                            >
                              {key}
                            </kbd>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div
          className={`transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
        >
          <button
            onClick={handleClose}
            className="
              relative overflow-hidden rounded-lg border-2 px-8 py-3
              border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 
              text-white shadow-lg shadow-blue-500/50
              font-bold uppercase tracking-wider transition-all duration-300 
              transform hover:scale-105 hover:border-white hover:shadow-2xl
            "
          >
            {/* Hover Effect Background */}
            <div
              className="
              absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
              transition-transform duration-500 -translate-x-full hover:translate-x-0
            "
            />

            {/* Button Text */}
            <span className="relative z-10 drop-shadow-md flex items-center gap-2">
              Back to Menu
            </span>
          </button>
        </div>
      </div>

      {/* Corner Decorations - Same as StartMenu */}
      <div className="absolute left-2 top-2 h-8 w-8 sm:left-4 sm:top-4 sm:h-12 sm:w-12 border-l-2 border-t-2 sm:border-l-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute right-2 top-2 h-8 w-8 sm:right-4 sm:top-4 sm:h-12 sm:w-12 border-r-2 border-t-2 sm:border-r-4 sm:border-t-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 left-2 h-8 w-8 sm:bottom-4 sm:left-4 sm:h-12 sm:w-12 border-b-2 border-l-2 sm:border-b-4 sm:border-l-4 border-blue-500 opacity-50" />
      <div className="absolute bottom-2 right-2 h-8 w-8 sm:bottom-4 sm:right-4 sm:h-12 sm:w-12 border-b-2 border-r-2 sm:border-b-4 sm:border-r-4 border-blue-500 opacity-50" />
    </div>
  );
}
