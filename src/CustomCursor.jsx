
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target.closest("[data-cursor-label]");
      setLabel(target?.getAttribute("data-cursor-label") || "");
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      className="custom-cursor"
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>

      {label && (
        <div className="cursor-label">{label}</div>
      )}
    </div>
  );
}
