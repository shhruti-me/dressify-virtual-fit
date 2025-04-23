
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Shirt } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const OutfitCard = ({ outfit }) => {
  const handleTryOn = () => {
    toast({
      title: "Virtual try-on initiated",
      description: `Starting virtual try-on for ${outfit.name}`,
    });
    // In a real app, this would launch the AR/VR try-on experience
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative pt-[100%] bg-secondary/20">
        {outfit.image ? (
          <img
            src={outfit.image}
            alt={outfit.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Shirt className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-4">
        <h3 className="font-semibold text-lg">{outfit.name}</h3>
        <p className="text-primary font-medium">{outfit.price}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs bg-secondary px-2 py-1 rounded-full">{outfit.category}</span>
          <span className="text-xs bg-secondary px-2 py-1 rounded-full">{outfit.style}</span>
          <span className="text-xs bg-secondary px-2 py-1 rounded-full">{outfit.color}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleTryOn}>
          <Shirt className="mr-2 h-4 w-4" />
          Try On
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OutfitCard;
