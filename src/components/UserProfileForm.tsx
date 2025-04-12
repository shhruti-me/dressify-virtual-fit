
import React, { useState, useEffect } from 'react';
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
  bodyType: string;
  shoulder: string;
  chest: string;
  waist: string;
  hips: string;
  thighs: string;
  inseamLength: string;
  skinTone: string;
  gender: string;
};

const UserProfileForm = () => {
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: '',
    weight: '',
    bodyType: '',
    shoulder: '',
    chest: '',
    waist: '',
    hips: '',
    thighs: '',
    inseamLength: '',
    skinTone: '',
    gender: '',
  });

  // Load measurements from localStorage on component mount
  useEffect(() => {
    const savedMeasurements = localStorage.getItem('userMeasurements');
    if (savedMeasurements) {
      try {
        setMeasurements(JSON.parse(savedMeasurements));
      } catch (e) {
        console.error("Error parsing saved measurements", e);
      }
    }
  }, []);

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

  const bodyTypes = ["Hourglass", "Rectangle", "Triangle", "Inverted Triangle", "Apple", "Pear", "Athletic"];
  const skinTones = ["Fair", "Light", "Medium", "Olive", "Tan", "Deep", "Dark"];

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

          <div className="space-y-2">
            <Label htmlFor="bodyType">Body Type</Label>
            <Select 
              value={measurements.bodyType} 
              onValueChange={value => handleChange('bodyType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select body type" />
              </SelectTrigger>
              <SelectContent>
                {bodyTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skinTone">Skin Tone</Label>
            <Select 
              value={measurements.skinTone} 
              onValueChange={value => handleChange('skinTone', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select skin tone" />
              </SelectTrigger>
              <SelectContent>
                {skinTones.map(tone => (
                  <SelectItem key={tone} value={tone.toLowerCase()}>{tone}</SelectItem>
                ))}
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
              <Label htmlFor="shoulder">Shoulder (cm)</Label>
              <Input
                id="shoulder"
                type="number"
                value={measurements.shoulder}
                onChange={e => handleChange('shoulder', e.target.value)}
                placeholder="Shoulder width"
              />
            </div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <div className="space-y-2">
              <Label htmlFor="thighs">Thighs (cm)</Label>
              <Input
                id="thighs"
                type="number"
                value={measurements.thighs}
                onChange={e => handleChange('thighs', e.target.value)}
                placeholder="Thigh circumference"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inseamLength">Inseam Length (cm)</Label>
              <Input
                id="inseamLength"
                type="number"
                value={measurements.inseamLength}
                onChange={e => handleChange('inseamLength', e.target.value)}
                placeholder="Inseam length"
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
