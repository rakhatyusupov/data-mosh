"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ControlsProps {
  onLerpChange: (value: number) => void;
  onSizeChange: (value: number) => void;
  onReset: () => void;
}

export function Controls({
  onLerpChange,
  onSizeChange,
  onReset,
}: ControlsProps) {
  const [lerp, setLerp] = useState(0.1);
  const [size, setSize] = useState(50);

  const handleReset = () => {
    setLerp(0.1);
    setSize(50);
    onReset();
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
        <span className="text-xs text-muted-foreground">
          Current: {lerp.toFixed(2)}
        </span>
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
        <span className="text-xs text-muted-foreground">Current: {size}px</span>
      </div>

      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Defaults
      </Button>
    </div>
  );
}
