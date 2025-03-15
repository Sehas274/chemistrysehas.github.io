
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Chemistry question suggestions
  const chemistryQuestions = [
    "කාබනික රසායන විද්‍යාවේ ව්‍යුහයන් ගැන විස්තර කරන්න",
    "ඇල්කේන ව්‍යුහය මොකක්ද?",
    "IUPAC නාමකරණය කොහොමද?",
    "ජෛව රසායන විද්‍යාව ගැන පහදන්න"
  ];

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '0px';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = scrollHeight + 'px';
    }
  }, [message]);

  // Show suggestions based on input
  useEffect(() => {
    if (message.length > 0) {
      const filtered = chemistryQuestions.filter(q => 
        q.toLowerCase().includes(message.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 2));
    } else {
      setSuggestions([]);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setSuggestions([]);
      
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle speech recognition
  };

  const selectSuggestion = (suggestion: string) => {
    setMessage(suggestion);
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      {suggestions.length > 0 && (
        <div className="suggestion-container mb-2 flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="secondary"
              className="text-xs py-1 px-2 h-auto"
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="input-container flex items-end gap-2">
        <textarea
          ref={inputRef}
          className="glass-input resize-none w-full rounded-xl p-3 max-h-32 min-h-[46px]"
          placeholder="ඔබේ ප්‍රශ්නය මෙහි ලියන්න... (කාබනික ව්‍යුහ ගැන විමසන්න)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          rows={1}
        />
        
        <Button 
          type="button"
          variant="outline"
          size="icon"
          className={`rounded-full transition-all duration-300 glass-effect h-[46px] w-[46px] ${
            isRecording ? 'bg-red-500/20 text-red-500' : ''
          }`}
          onClick={toggleRecording}
        >
          <Mic className={isRecording ? 'animate-pulse' : ''} size={20} />
        </Button>
        
        <Button 
          type="submit" 
          className="rounded-full bg-primary glass-effect h-[46px] w-[46px] flex items-center justify-center"
          disabled={!message.trim()}
        >
          <SendHorizonal size={20} />
        </Button>
      </form>
    </>
  );
};

export default ChatInput;
