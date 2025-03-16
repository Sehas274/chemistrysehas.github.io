
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import Header from '@/components/Header';
import { sampleMessages, Message, generateReply } from '@/utils/sampleData';
import '../styles/chatbot.css';
import { useIsMobile } from '@/hooks/use-mobile';

const Index: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending new message
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
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
  
  // Clear all chat messages
  const handleClearChat = () => {
    setMessages([]);
    setIsTyping(false);
  };
  
  return (
    <div className={`chat-container ${isMobile ? 'mobile-app' : ''}`}>
      <Header onClearChat={handleClearChat} />
      
      <div 
        ref={messageContainerRef}
        className="message-container"
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              index={index}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-lg">
              <p className="text-muted-foreground mb-2 font-sinhala">
                අලුත් සංවාදයක් ආරම්භ කරන්න
              </p>
              <p className="text-xs text-muted-foreground">
                මෙම රසායන විද්‍යා AIට ඔබේ ප්‍රශ්න යොමු කරන්න
              </p>
            </div>
          </div>
        )}
        
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
      
      <div className="sticky bottom-0 px-4 pb-4 pt-2 chat-input-container">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Index;
