
import React, { useState } from 'react';
import OutfitCard from './OutfitCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Filter, Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample outfit data
const outfitData = [
  {
    id: '1',
    name: 'Casual Summer Dress',
    image: '/placeholder.svg',
    price: '$49.99',
    category: 'Dresses',
    style: 'Casual',
    color: 'Blue'
  },
  {
    id: '2',
    name: 'Business Suit',
    image: '/placeholder.svg',
    price: '$199.99',
    category: 'Formal',
    style: 'Business',
    color: 'Black'
  },
  {
    id: '3',
    name: 'Denim Jacket',
    image: '/placeholder.svg',
    price: '$79.99',
    category: 'Outerwear',
    style: 'Casual',
    color: 'Blue'
  },
  {
    id: '4',
    name: 'Evening Gown',
    image: '/placeholder.svg',
    price: '$249.99',
    category: 'Dresses',
    style: 'Formal',
    color: 'Red'
  },
  {
    id: '5',
    name: 'Athleisure Set',
    image: '/placeholder.svg',
    price: '$129.99',
    category: 'Sportswear',
    style: 'Casual',
    color: 'Gray'
  },
  {
    id: '6',
    name: 'Vintage T-Shirt',
    image: '/placeholder.svg',
    price: '$29.99',
    category: 'Tops',
    style: 'Vintage',
    color: 'White'
  }
];

// Extract unique values for filters
const categories = Array.from(new Set(outfitData.map(outfit => outfit.category)));
const styles = Array.from(new Set(outfitData.map(outfit => outfit.style)));
const colors = Array.from(new Set(outfitData.map(outfit => outfit.color)));

const OutfitExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    style: '',
    color: '',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      style: '',
      color: '',
    });
  };

  // Apply filters and search
  const filteredOutfits = outfitData.filter(outfit => {
    const matchesSearch = outfit.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category ? outfit.category === filters.category : true;
    const matchesStyle = filters.style ? outfit.style === filters.style : true;
    const matchesColor = filters.color ? outfit.color === filters.color : true;
    
    return matchesSearch && matchesCategory && matchesStyle && matchesColor;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search outfits..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Collapsible 
          open={isFilterOpen} 
          onOpenChange={setIsFilterOpen}
          className="md:w-72"
        >
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </CollapsibleTrigger>
            {(filters.category || filters.style || filters.color) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <CollapsibleContent className="mt-4 space-y-4 p-4 border rounded-md">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={filters.category} 
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Select 
                value={filters.style} 
                onValueChange={(value) => handleFilterChange('style', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All styles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-styles">All styles</SelectItem>
                  {styles.map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Select 
                value={filters.color} 
                onValueChange={(value) => handleFilterChange('color', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All colors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-colors">All colors</SelectItem>
                  {colors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {filteredOutfits.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No outfits found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredOutfits.map(outfit => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OutfitExplorer;
