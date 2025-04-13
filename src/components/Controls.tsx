"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ControlsProps {
  onLerpChange: (value: number) => void;
  onSizeChange: (value: number) => void;
  onEffectChange: (effect: string) => void;
  onExport: () => void;
}

export function Controls({
  onLerpChange,
  onSizeChange,
  onEffectChange,
  onExport,
}: ControlsProps) {
  const [lerp, setLerp] = useState(0.1);
  const [size, setSize] = useState(50);
  const [effect, setEffect] = useState("none");

  const handleEffectChange = (value: string) => {
    setEffect(value);
    onEffectChange(value);
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
        <Label>Drawing Effect</Label>
        <Select value={effect} onValueChange={handleEffectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select effect" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="circle">Circle</SelectItem>
            <SelectItem value="rectangle">Rectangle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" className="w-full" onClick={onExport}>
        Export as JPG (or press 'e')
      </Button>
    </div>
  );
}
