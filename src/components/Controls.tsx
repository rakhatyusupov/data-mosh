"use client";
import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Resolution {
  width: number;
  height: number;
}

const SIZE_PRESETS = [
  { label: "1:1 (1920×1920)", key: "1:1", width: 1920, height: 1920 },
  { label: "2:1 (3840×1920)", key: "2:1", width: 3840, height: 1920 },
  { label: "2:3 (1920×2880)", key: "2:3", width: 1920, height: 2880 },
  { label: "Custom", key: "custom" },
];

interface ControlsProps {
  activeEffects: string[];
  onLerpChange: (value: number) => void;
  onSizeChange: (value: number) => void;
  onEffectChange: (effects: string[]) => void;
  onExport: () => void;
  onResolutionChange: (resolution: Resolution) => void;
}

export function Controls({
  activeEffects,
  onLerpChange,
  onSizeChange,
  onEffectChange,
  onExport,
  onResolutionChange,
}: ControlsProps) {
  const [lerp, setLerp] = useState(0.1);
  const [size, setSize] = useState(50);
  const [selectedSize, setSelectedSize] = useState("1:1");
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1920);

  useEffect(() => {
    if (selectedSize === "custom") {
      onResolutionChange({ width: customWidth, height: customHeight });
    } else {
      const preset = SIZE_PRESETS.find((p) => p.key === selectedSize);
      if (preset && preset.width) {
        onResolutionChange({ width: preset.width, height: preset.height });
      }
    }
  }, [selectedSize, customWidth, customHeight, onResolutionChange]);

  const toggleEffect = (effect: string) => {
    const newEffects = activeEffects.includes(effect)
      ? activeEffects.filter((e) => e !== effect)
      : [...activeEffects, effect];
    onEffectChange(newEffects);
  };

  return (
    <div className="p-4 space-y-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="space-y-2">
        <Label>Canvas Resolution</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger>
            <SelectValue placeholder="Select resolution" />
          </SelectTrigger>
          <SelectContent>
            {SIZE_PRESETS.map((preset) => (
              <SelectItem key={preset.key} value={preset.key}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedSize === "custom" && (
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Width"
              value={customWidth}
              onChange={(e) =>
                setCustomWidth(Math.max(1, parseInt(e.target.value) || 1920))
              }
              min="1"
            />
            <Input
              type="number"
              placeholder="Height"
              value={customHeight}
              onChange={(e) =>
                setCustomHeight(Math.max(1, parseInt(e.target.value) || 1920))
              }
              min="1"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="smoothness">Smoothness</Label>
        <Slider
          id="smoothness"
          value={[lerp]}
          onValueChange={([value]) => {
            setLerp(value);
            onLerpChange(value);
          }}
          min={0.01}
          max={1}
          step={0.01}
        />
        <div className="text-xs text-muted-foreground">
          Current: {lerp.toFixed(2)}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Ball Size</Label>
        <Slider
          id="size"
          value={[size]}
          onValueChange={([value]) => {
            setSize(value);
            onSizeChange(value);
          }}
          min={10}
          max={200}
          step={1}
        />
        <div className="text-xs text-muted-foreground">Current: {size}px</div>
      </div>

      <div className="space-y-2">
        <Label>Drawing Effects</Label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeEffects.length === 0 ? "default" : "outline"}
            size="sm"
            onClick={() => onEffectChange([])}
          >
            None
          </Button>
          <Button
            variant={activeEffects.includes("circle") ? "default" : "outline"}
            size="sm"
            onClick={() => toggleEffect("circle")}
          >
            Circle
          </Button>
          <Button
            variant={
              activeEffects.includes("rectangle") ? "default" : "outline"
            }
            size="sm"
            onClick={() => toggleEffect("rectangle")}
          >
            Rectangle
          </Button>

          <Button
            variant={
              activeEffects.includes("particles") ? "default" : "outline"
            }
            size="sm"
            onClick={() => toggleEffect("particles")}
          >
            Particles
          </Button>
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onExport}>
        Export as JPG (or press 'e')
      </Button>
    </div>
  );
}
