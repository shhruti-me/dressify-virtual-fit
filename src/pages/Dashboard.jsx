
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfileForm from '@/components/UserProfileForm';
import OutfitExplorer from '@/components/OutfitExplorer';
import { User, Shirt, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
  };

  if (!user) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">DressFit</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/user-profile')}>
              <Settings className="h-4 w-4 mr-2" />
              My Profile
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                My Measurements
              </TabsTrigger>
              <TabsTrigger value="explore" className="flex items-center gap-2">
                <Shirt className="h-4 w-4" />
                Explore Outfits
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Welcome to Your Virtual Fitting Room</h2>
                <p className="text-muted-foreground">
                  Enter your measurements to get the most accurate virtual try-on experience.
                  All your data is stored securely in your account.
                </p>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-medium text-primary">How to take measurements</h3>
                  <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                    <li>Use a flexible measuring tape</li>
                    <li>Measure over minimal clothing for accuracy</li>
                    <li>Keep the tape snug but not tight</li>
                    <li>Stand in a relaxed position while measuring</li>
                  </ul>
                </div>
              </div>
              <UserProfileForm />
            </div>
          </TabsContent>

          <TabsContent value="explore">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">Explore Outfits</h2>
                <p className="text-muted-foreground">
                  Browse our collection and try on outfits virtually
                </p>
              </div>
              <OutfitExplorer />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
