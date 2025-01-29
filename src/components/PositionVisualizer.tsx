import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const positionOptions = [
  { value: 'static', label: 'Static (Default)' },
  { value: 'relative', label: 'Relative' },
  { value: 'absolute', label: 'Absolute' },
  { value: 'fixed', label: 'Fixed' },
  { value: 'sticky', label: 'Sticky' },
];

const PositionVisualizer = () => {
  const [selectedPosition, setSelectedPosition] = useState('static');
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const getExplanation = (position: string) => {
    const explanations: Record<string, string> = {
      static: 'Default position. Elements are placed in the normal document flow.',
      relative: 'Positioned relative to its normal position. Creates a positioning context for absolute children.',
      absolute: 'Positioned relative to its closest positioned ancestor. Removed from normal document flow.',
      fixed: 'Positioned relative to the viewport. Stays in place during scrolling.',
      sticky: 'Toggles between relative and fixed depending on scroll position.',
    };
    return explanations[position];
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
            CSS Position Property
          </span>
          <h1 className="text-4xl font-semibold tracking-tight mt-4">
            Position Property Visualizer
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore how CSS position properties work through this interactive visualization.
            Adjust the position and offset values to see real-time changes.
          </p>
        </div>

        <Card className="p-6">
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Position Property</Label>
              <Select
                value={selectedPosition}
                onValueChange={setSelectedPosition}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position property" />
                </SelectTrigger>
                <SelectContent>
                  {positionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPosition !== 'static' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Top Offset: {top}px</Label>
                  <Slider
                    value={[top]}
                    onValueChange={(value) => setTop(value[0])}
                    min={-50}
                    max={50}
                    step={1}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Left Offset: {left}px</Label>
                  <Slider
                    value={[left]}
                    onValueChange={(value) => setLeft(value[0])}
                    min={-50}
                    max={50}
                    step={1}
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Live Preview</h3>
              <div className="preview-container relative bg-gray-100 h-[300px] rounded-lg p-4 overflow-hidden">
                <div className="reference-box absolute top-0 left-0 w-full h-full border-2 border-dashed border-gray-300" />
                <div
                  className="demo-box bg-primary/20 border-2 border-primary p-4 rounded-md w-32 h-32 flex items-center justify-center text-sm text-center transition-all duration-300"
                  style={{
                    position: selectedPosition as any,
                    top: selectedPosition !== 'static' ? `${top}px` : undefined,
                    left: selectedPosition !== 'static' ? `${left}px` : undefined,
                  }}
                >
                  position: {selectedPosition}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h3 className="font-medium mb-2">Explanation</h3>
              <p className="text-muted-foreground">{getExplanation(selectedPosition)}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PositionVisualizer;