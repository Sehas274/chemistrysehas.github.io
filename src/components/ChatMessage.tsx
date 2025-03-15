
import React, { useEffect, useRef } from 'react';
import { Message } from '../utils/sampleData';
import { format } from 'date-fns';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
  index: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, index }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = messageRef.current;
    if (element) {
      element.style.opacity = '0';
      element.style.transform = message.isUser ? 'translateX(20px)' : 'translateX(-20px)';
      
      // Stagger animation based on index for realistic chat feeling
      const timeout = setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateX(0)';
      }, index * 50);
      
      return () => clearTimeout(timeout);
    }
  }, [index, message.isUser]);

  // Format chemistry formulas with subscripts and superscripts
  const formatChemistry = (text: string) => {
    // Replace subscript numbers after chemical symbols
    const withSubscripts = text.replace(/([A-Za-z])(\d+)/g, '$1<sub>$2</sub>');
    
    // Replace superscript charges like Na+, Cl-
    const withCharges = withSubscripts.replace(/([A-Za-z])<sub>(\d+)<\/sub>(\+|\-)/g, '$1<sub>$2</sub><sup>$3</sup>');
    const finalText = withCharges.replace(/([A-Za-z])(\+|\-)/g, '$1<sup>$2</sup>');
    
    return finalText;
  };

  return (
    <div
      ref={messageRef}
      className={cn(
        'message transition-all duration-300 ease-out',
        message.isUser ? 'message-user' : 'message-bot'
      )}
      style={{ 
        transitionDelay: `${index * 50}ms`,
        animationDelay: `${index * 50}ms`
      }}
    >
      <div 
        className="font-sinhala leading-relaxed whitespace-pre-line chem-formulas"
        dangerouslySetInnerHTML={{ __html: formatChemistry(message.text) }}
      />
      <div className="text-[10px] mt-1 opacity-60 flex items-center justify-end gap-1">
        {format(message.timestamp, 'HH:mm')}
        {message.isUser && (
          <span className="text-[#00a884]">
            <Check size={14} className="-mr-1" />
            <Check size={14} />
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
