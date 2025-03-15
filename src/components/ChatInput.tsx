
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, SendHorizonal, Plus, Smile } from 'lucide-react';

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
              className="text-xs py-1 px-2 h-auto bg-white"
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="whatsapp-input-container">
        <Button 
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-gray-500"
        >
          <Plus size={20} />
        </Button>
        
        <textarea
          ref={inputRef}
          className="resize-none w-full bg-transparent p-2 focus:outline-none text-sm max-h-32 min-h-[46px] font-sinhala"
          placeholder="ඔබේ ප්‍රශ්නය මෙහි ලියන්න..."
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
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-gray-500"
        >
          <Smile size={20} />
        </Button>
        
        {message.trim() ? (
          <Button 
            type="submit" 
            className="rounded-full bg-[#00a884] h-10 w-10 flex items-center justify-center text-white"
            disabled={!message.trim()}
          >
            <SendHorizonal size={20} />
          </Button>
        ) : (
          <Button 
            type="button"
            variant="ghost"
            size="icon"
            className={`rounded-full h-10 w-10 transition-all duration-300 ${
              isRecording ? 'bg-red-500/20 text-red-500' : 'text-[#00a884]'
            }`}
            onClick={toggleRecording}
          >
            <Mic className={isRecording ? 'animate-pulse' : ''} size={20} />
          </Button>
        )}
      </form>
    </>
  );
};

export default ChatInput;
