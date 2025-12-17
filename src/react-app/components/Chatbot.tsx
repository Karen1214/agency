import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Calendar, Mail, ArrowRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

interface QuickAction {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'bot',
        content: "Hi! I'm your digital assistant. I'm here to help you learn about our services and get started with your project. How can I help you today?",
        timestamp: new Date(),
        quickActions: [
          {
            label: 'Our Services',
            action: () => handleQuickMessage('Tell me about your services'),
            icon: <ArrowRight size={14} />
          },
          {
            label: 'Schedule Call',
            action: () => handleScheduleCall(),
            icon: <Calendar size={14} />
          },
          {
            label: 'Get Quote',
            action: () => handleGetQuote(),
            icon: <Mail size={14} />
          }
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleScheduleCall = () => {
    setIsOpen(false);
    // Navigate to booking page
    window.location.href = '/booking';
  };

  const handleGetQuote = () => {
    setIsOpen(false);
    // Scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickMessage = (message: string) => {
    addUserMessage(message);
    generateBotResponse(message);
  };

  const addUserMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
  };

  const addBotMessage = (content: string, quickActions?: QuickAction[]) => {
    const botMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      timestamp: new Date(),
      quickActions
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const generateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        addBotMessage(
          "We offer a full range of digital services: Website Design & Development, Social Media Content Creation, AI Agents & Automation, Chatbot Development, Brand Identity Design, and Digital Marketing. Which service interests you most?",
          [
            { label: 'Website Design', action: () => handleQuickMessage('Tell me about website design') },
            { label: 'Social Media', action: () => handleQuickMessage('Tell me about social media') },
            { label: 'AI Solutions', action: () => handleQuickMessage('Tell me about AI solutions') },
            { label: 'View All Services', action: () => { setIsOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); } }
          ]
        );
      } else if (lowerMessage.includes('website') || lowerMessage.includes('web design')) {
        addBotMessage(
          "Our website design service includes custom, responsive websites that convert visitors into customers. We create everything from landing pages to complex web applications with modern UI/UX, SEO optimization, and fast loading speeds.",
          [
            { label: 'See Portfolio', action: () => { setIsOpen(false); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); } },
            { label: 'Get Quote', action: () => handleGetQuote() },
            { label: 'Schedule Call', action: () => handleScheduleCall() }
          ]
        );
      } else if (lowerMessage.includes('social media') || lowerMessage.includes('content')) {
        addBotMessage(
          "We create professional video and photo content for TikTok, Instagram, Facebook, and other platforms. Our social media services include content strategy, community management, analytics & reporting, and paid advertising campaigns.",
          [
            { label: 'See Our Work', action: () => { setIsOpen(false); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); } },
            { label: 'Get Quote', action: () => handleGetQuote() },
            { label: 'Schedule Call', action: () => handleScheduleCall() }
          ]
        );
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('chatbot') || lowerMessage.includes('automation')) {
        addBotMessage(
          "Our AI solutions include intelligent chatbots like this one, process automation, data analysis, and custom AI models. We help businesses streamline operations and enhance customer experience with 24/7 availability and natural language processing.",
          [
            { label: 'AI Examples', action: () => { setIsOpen(false); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); } },
            { label: 'Get Quote', action: () => handleGetQuote() },
            { label: 'Schedule Call', action: () => handleScheduleCall() }
          ]
        );
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        addBotMessage(
          "Our pricing varies based on your specific needs and project scope. We offer custom solutions tailored to your budget. I'd be happy to connect you with our team for a free consultation and personalized quote.",
          [
            { label: 'Get Free Quote', action: () => handleGetQuote() },
            { label: 'Schedule Consultation', action: () => handleScheduleCall() },
            { label: 'Contact Info', action: () => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } }
          ]
        );
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
        addBotMessage(
          "You can reach us at hello@nexusdigital.com or call +1 (555) 123-4567. We're available Monday-Friday, 8am-6pm. You can also schedule a free consultation or send us a message through our contact form.",
          [
            { label: 'Schedule Call', action: () => handleScheduleCall() },
            { label: 'Send Message', action: () => handleGetQuote() },
            { label: 'View Contact Info', action: () => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); } }
          ]
        );
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        addBotMessage(
          "Hello! Great to meet you! I'm here to help you learn about our digital services and get your project started. What brings you to NexusDigital today?",
          [
            { label: 'Our Services', action: () => handleQuickMessage('Tell me about your services') },
            { label: 'Get Started', action: () => handleGetQuote() },
            { label: 'Schedule Call', action: () => handleScheduleCall() }
          ]
        );
      } else if (lowerMessage.includes('help')) {
        addBotMessage(
          "I'm here to help! I can tell you about our services, pricing, portfolio, or connect you with our team. What would you like to know?",
          [
            { label: 'Our Services', action: () => handleQuickMessage('Tell me about your services') },
            { label: 'Pricing Info', action: () => handleQuickMessage('What are your prices?') },
            { label: 'See Portfolio', action: () => { setIsOpen(false); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); } },
            { label: 'Contact Team', action: () => handleGetQuote() }
          ]
        );
      } else {
        addBotMessage(
          "That's a great question! I'd love to connect you with one of our experts who can give you detailed information. You can schedule a free consultation or send us a message with your specific needs.",
          [
            { label: 'Schedule Consultation', action: () => handleScheduleCall() },
            { label: 'Send Message', action: () => handleGetQuote() },
            { label: 'View Services', action: () => { setIsOpen(false); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); } }
          ]
        );
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      addUserMessage(inputValue.trim());
      generateBotResponse(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle size={24} className="group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-semibold">NexusDigital Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                      {message.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={`px-3 py-2 rounded-lg ${message.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  {message.quickActions && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={action.action}
                          className="inline-flex items-center px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded text-xs hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                        >
                          {action.label}
                          {action.icon && <span className="ml-1">{action.icon}</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={12} />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
