
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import { sampleMessages, Message, generateReply } from '@/utils/sampleData';
import { Sparkles } from 'lucide-react';

const Index: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle sending new message
  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Add bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: generateReply(text),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="chat-container">
      <Header />
      
      <div 
        ref={messageContainerRef}
        className="message-container flex-1 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            index={index}
          />
        ))}
        
        {isTyping && (
          <div className="message message-bot max-w-[60%] animate-pulse">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="px-4 py-2 text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
        <Sparkles size={12} className="animate-bounce-light" />
        <span>
          රසායන විද්‍යා උපකාරක AI අත්හදා බලන්න
        </span>
        <Sparkles size={12} className="animate-bounce-light" style={{ animationDelay: '1s' }} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Index;
