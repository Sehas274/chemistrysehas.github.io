
import React from 'react';
import { ChevronLeft, MoreVertical } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

const Header: React.FC = () => {
  return (
    <div className="bg-background/80 backdrop-blur-md border-b border-border/10 py-3 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <button className="p-1 rounded-full hover:bg-secondary/80 transition-colors">
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/10">
            <img 
              src="https://api.dicebear.com/7.x/bottts/svg?seed=chemistry&backgroundColor=b6e3f4"
              alt="Chemistry Bot"
              className="object-cover"
            />
          </Avatar>
          
          <div className="flex flex-col">
            <h2 className="text-base font-medium">රසායන AI උපකාරකයා</h2>
            <p className="text-xs text-muted-foreground">
              සජීවී - පැය 24 පුරාම පිළිතුරු සපයයි
            </p>
          </div>
        </div>
      </div>
      
      <button className="p-1 rounded-full hover:bg-secondary/80 transition-colors">
        <MoreVertical size={24} />
      </button>
    </div>
  );
};

export default Header;
