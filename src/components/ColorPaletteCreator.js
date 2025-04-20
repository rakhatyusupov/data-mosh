"use client";
import { useState } from "react";

export const globalColors = {
  color1: "#FAFAFA",
  color2: "#F5F5F5",
  color3: "#323232",
};

export function ColorPaletteCreator() {
  const [colors, setColors] = useState(globalColors);

  const updateColor = (key, value) => {
    const updated = { ...colors, [key]: value };
    setColors(updated);
    globalColors[key] = value; // Also update the global object
  };

  const addColor = () => {
    const newKey = `color${Object.keys(colors).length + 1}`;
    const updated = { ...colors, [newKey]: "#FFFFFF" };
    setColors(updated);
    globalColors[newKey] = "#FFFFFF";
  };

  const removeColor = (key) => {
    const { [key]: _, ...rest } = colors;
    setColors(rest);
    delete globalColors[key];
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Color Palette</h3>

      <div className="space-y-2">
        {Object.entries(colors).map(([key, color]) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(key, e.target.value)}
              className="h-10 w-10 rounded"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => updateColor(key, e.target.value)}
              className="flex-1 border border-input rounded-md px-3 py-2 text-sm"
            />
            <button
              onClick={() => removeColor(key)}
              className="text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addColor}
        className="text-sm text-blue-600 hover:underline"
      >
        + Add Color
      </button>
    </div>
  );
}

export function logGlobalColors() {
  console.log("Current global colors:", globalColors);
}
