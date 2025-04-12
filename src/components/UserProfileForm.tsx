
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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type UserMeasurements = {
  height: string;
  weight: string;
  body_type: string;
  shoulder: string;
  chest: string;
  waist: string;
  hips: string;
  thighs: string;
  inseam_length: string;
  skin_tone: string;
  gender: string;
};

const UserProfileForm = () => {
  const { user } = useAuth();
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: '',
    weight: '',
    body_type: '',
    shoulder: '',
    chest: '',
    waist: '',
    hips: '',
    thighs: '',
    inseam_length: '',
    skin_tone: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);

  // Load measurements from Supabase on component mount
  useEffect(() => {
    const fetchMeasurements = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('user_measurements')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which is fine for new users
          console.error('Error fetching measurements:', error);
          return;
        }

        if (data) {
          setMeasurements({
            height: data.height || '',
            weight: data.weight || '',
            body_type: data.body_type || '',
            shoulder: data.shoulder || '',
            chest: data.chest || '',
            waist: data.waist || '',
            hips: data.hips || '',
            thighs: data.thighs || '',
            inseam_length: data.inseam_length || '',
            skin_tone: data.skin_tone || '',
            gender: data.gender || '',
          });
        }
      } catch (error) {
        console.error('Error fetching measurements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeasurements();
  }, [user]);

  const handleChange = (key: keyof UserMeasurements, value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save your measurements.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setLoading(true);
      
      // Check if the user already has a record
      const { data: existingData } = await supabase
        .from('user_measurements')
        .select('id')
        .eq('id', user.id)
        .single();
      
      let result;
      
      if (existingData) {
        // Update existing record
        result = await supabase
          .from('user_measurements')
          .update(measurements)
          .eq('id', user.id);
      } else {
        // Insert new record
        result = await supabase
          .from('user_measurements')
          .insert({
            id: user.id,
            ...measurements
          });
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Profile updated",
        description: "Your measurements have been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error saving measurements:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save measurements",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
              value={measurements.body_type} 
              onValueChange={value => handleChange('body_type', value)}
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
              value={measurements.skin_tone} 
              onValueChange={value => handleChange('skin_tone', value)}
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
                value={measurements.inseam_length}
                onChange={e => handleChange('inseam_length', e.target.value)}
                placeholder="Inseam length"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Measurements"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
