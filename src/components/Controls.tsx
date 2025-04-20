"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColorPaletteCreator } from "./ColorPaletteCreator";

const SIZE_PRESETS = [
  { label: "1:1 (1920×1920)", key: "1:1", width: 1920, height: 1920 },
  { label: "2:1 (3840×1920)", key: "2:1", width: 3840, height: 1920 },
  { label: "2:3 (1920×2880)", key: "2:3", width: 1920, height: 2880 },
  { label: "Custom", key: "custom" },
];

export function Controls({
  activeEffects,
  onLerpChange,
  onSizeChange,
  onEffectChange,
  onExport,
  onResolutionChange,
  onClearBackgroundChange,
}) {
  const [selectedSize, setSelectedSize] = useState("1:1");
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1920);
  const [clearBackground, setClearBackground] = useState(true);

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

  useEffect(() => {
    onClearBackgroundChange(clearBackground);
  }, [clearBackground, onClearBackgroundChange]);

  const toggleEffect = (effect) => {
    const newEffects = activeEffects.includes(effect)
      ? activeEffects.filter((e) => e !== effect)
      : [...activeEffects, effect];
    onEffectChange(newEffects);
  };

  return (
    <>
      {/* Floating Resolution Controls */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="absolute top-4 left-4 z-50 w-10 h-10 p-0 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
              <path d="M12 2v2" />
              <path d="M12 22v-2" />
              <path d="m17 17 1.4 1.4" />
              <path d="m4.6 19.4 1.4-1.4" />
              <path d="M22 12h-2" />
              <path d="M2 12h2" />
              <path d="m7 7 1.4-1.4" />
              <path d="m18.4 5.6-1.4 1.4" />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-3 rounded-lg border shadow-sm space-y-2"
          align="start"
          side="right"
        >
          <div className="space-y-2">
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <Label>Resolution</Label>
              <SelectTrigger className="w-full">
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
              <div className="flex gap-2 mt-2">
                <Input
                  type="number"
                  placeholder="Width"
                  value={customWidth}
                  onChange={(e) =>
                    setCustomWidth(
                      Math.max(1, parseInt(e.target.value) || 1920)
                    )
                  }
                  min="1"
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Height"
                  value={customHeight}
                  onChange={(e) =>
                    setCustomHeight(
                      Math.max(1, parseInt(e.target.value) || 1920)
                    )
                  }
                  min="1"
                  className="flex-1"
                />
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="clear-background">Clear Background</Label>
            <Switch
              id="clear-background"
              checked={clearBackground}
              onCheckedChange={setClearBackground}
            />
          </div>
        </PopoverContent>
      </Popover>

      <div className="p-4">
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
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
                  variant={
                    activeEffects.includes("circle") ? "default" : "outline"
                  }
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
          </TabsContent>

          <TabsContent value="assets">
            <ColorPaletteCreator />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
