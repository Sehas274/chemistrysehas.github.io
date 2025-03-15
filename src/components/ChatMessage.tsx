
import React, { useEffect, useRef } from 'react';
import { Message } from '../utils/sampleData';
import { formatDistanceToNow } from 'date-fns';
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
      <div className="font-sinhala leading-relaxed whitespace-pre-line">
        {message.text}
      </div>
      <div className="text-xs mt-2 opacity-60">
        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
      </div>
    </div>
  );
};

export default ChatMessage;
