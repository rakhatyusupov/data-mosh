"use client";
import { useState } from "react"; // Added this import
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ControlsProps {
  activeEffects: string[];
  onLerpChange: (value: number) => void;
  onSizeChange: (value: number) => void;
  onEffectChange: (effects: string[]) => void;
  onExport: () => void;
}

export function Controls({
  activeEffects,
  onLerpChange,
  onSizeChange,
  onEffectChange,
  onExport,
}: ControlsProps) {
  const [lerp, setLerp] = useState(0.1);
  const [size, setSize] = useState(50);

  const toggleEffect = (effect: string) => {
    const newEffects = activeEffects.includes(effect)
      ? activeEffects.filter((e) => e !== effect)
      : [...activeEffects, effect];
    onEffectChange(newEffects);
  };

  return (
    <div className="p-4 space-y-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={onExport}>
        Export as JPG (or press 'e')
      </Button>
    </div>
  );
}
