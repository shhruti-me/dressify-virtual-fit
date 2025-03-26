
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserMeasurements = {
  height: string;
  weight: string;
  chest: string;
  waist: string;
  hips: string;
  gender: string;
};

const UserProfileForm = () => {
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: '',
    weight: '',
    chest: '',
    waist: '',
    hips: '',
    gender: '',
  });

  const handleChange = (key: keyof UserMeasurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save measurements to local storage for persistence
    localStorage.setItem('userMeasurements', JSON.stringify(measurements));
    toast({
      title: "Profile updated",
      description: "Your measurements have been saved successfully.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Measurements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={measurements.gender} 
              onValueChange={value => handleChange('gender', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={measurements.height}
                onChange={e => handleChange('height', e.target.value)}
                placeholder="Height in cm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={measurements.weight}
                onChange={e => handleChange('weight', e.target.value)}
                placeholder="Weight in kg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chest">Chest (cm)</Label>
              <Input
                id="chest"
                type="number"
                value={measurements.chest}
                onChange={e => handleChange('chest', e.target.value)}
                placeholder="Chest circumference"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waist">Waist (cm)</Label>
              <Input
                id="waist"
                type="number"
                value={measurements.waist}
                onChange={e => handleChange('waist', e.target.value)}
                placeholder="Waist circumference"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hips">Hips (cm)</Label>
              <Input
                id="hips"
                type="number"
                value={measurements.hips}
                onChange={e => handleChange('hips', e.target.value)}
                placeholder="Hip circumference"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">Save Measurements</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
