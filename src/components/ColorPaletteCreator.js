"use client";
import { useState } from "react";

export function ColorPaletteCreator() {
  const [colors, setColors] = useState(["#FAFAFA", "#F5F5F5", "#323232"]);

  const updateColor = (index, value) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const addColor = () => {
    setColors([...colors, "#FFFFFF"]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Color Palette</h3>

      <div className="space-y-2">
        {colors.map((color, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="h-10 w-10 rounded"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
              className="flex-1 border border-input rounded-md px-3 py-2 text-sm"
            />
            <button
              onClick={() => removeColor(index)}
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
