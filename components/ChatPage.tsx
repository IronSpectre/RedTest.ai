import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { 
  Send, 
  MessageCircle, 
  Bot,
  User,
  FileText,
  Lightbulb,
  AlertCircle,
  Clock,
  Mic,
  Paperclip,
  Trash2,
  Download,
  Settings,
  RefreshCw,
  Heart,
  Activity,
  TrendingUp,
  Shield
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Array<{
    name: string;
    type: 'report' | 'image' | 'document';
  }>;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
  category: 'analysis' | 'explanation' | 'advice' | 'comparison';
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI medical assistant. I can help you understand your medical reports, explain test results, and provide general health information. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Explain my latest blood test results",
        "What do my cholesterol levels mean?",
        "Help me understand my medication schedule",
        "Compare my results over time"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      label: 'Analyze My Latest Report',
      icon: <FileText className="w-4 h-4" />,
      prompt: 'Please analyze my latest medical report and explain the key findings.',
      category: 'analysis'
    },
    {
      id: '2',
      label: 'Explain Test Results',
      icon: <Lightbulb className="w-4 h-4" />,
      prompt: 'Can you explain what my test results mean in simple terms?',
      category: 'explanation'
    },
    {
      id: '3',
      label: 'Health Recommendations',
      icon: <Heart className="w-4 h-4" />,
      prompt: 'Based on my recent results, what health recommendations do you have?',
      category: 'advice'
    },
    {
      id: '4',
      label: 'Compare Previous Results',
      icon: <TrendingUp className="w-4 h-4" />,
      prompt: 'Compare my current results with my previous tests and show trends.',
      category: 'comparison'
    }
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && selectedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      attachments: selectedFiles.map(file => ({
        name: file.name,
        type: file.type.includes('image') ? 'image' : 'document'
      }))
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setSelectedFiles([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    let content = '';
    let suggestions: string[] = [];

    if (input.includes('blood') || input.includes('test') || input.includes('result')) {
      content = `Based on your recent blood test results, I can see several key findings:

**Key Results:**
• **Hemoglobin: 13.4 g/dL** - This is slightly below the normal range (13.5-17.5). This could indicate mild anemia, which might explain any fatigue you've been feeling.

• **Blood Glucose: 110 mg/dL** - This is slightly elevated (normal <100). This suggests you may be developing insulin resistance.

• **Total Cholesterol: 195 mg/dL** - This is within the healthy range (<200).

**Recommendations:**
1. Consider iron-rich foods for the low hemoglobin
2. Reduce refined carbohydrates to help with blood sugar
3. Follow up with your doctor about the glucose levels

Would you like me to explain any of these results in more detail?`;

      suggestions = [
        "What foods can help with low hemoglobin?",
        "How can I naturally lower my blood sugar?",
        "Should I be concerned about pre-diabetes?",
        "What follow-up tests might I need?"
      ];
    } else if (input.includes('medication') || input.includes('medicine')) {
      content = `I can help you understand your medication schedule and interactions:

**Current Active Medications:**
• **Metformin 500mg** - Take twice daily with meals for blood sugar control
• **Lisinopril 10mg** - Take once daily for blood pressure
• **Atorvastatin 20mg** - Take once daily in the evening for cholesterol

**Important Notes:**
- Take Metformin with food to reduce stomach upset
- Monitor for any muscle pain with Atorvastatin
- Don't skip doses, especially for blood pressure medication

**Upcoming Doses:**
- Metformin: Next dose at 8:00 AM
- Lisinopril: Next dose at 9:00 AM
- Atorvastatin: Next dose at 8:00 PM

Would you like me to set up medication reminders or explain any side effects?`;

      suggestions = [
        "Set up medication reminders",
        "Explain side effects of my medications",
        "What happens if I miss a dose?",
        "Can I take these medications together?"
      ];
    } else if (input.includes('cholesterol') || input.includes('lipid')) {
      content = `Let me explain your cholesterol levels:

**Your Lipid Panel Results:**
• **Total Cholesterol: 195 mg/dL** ✅ Healthy (goal: <200)
• **LDL (Bad) Cholesterol: 120 mg/dL** ⚠️ Borderline high (goal: <100)
• **HDL (Good) Cholesterol: 45 mg/dL** ⚠️ Low (goal: >40 for men, >50 for women)
• **Triglycerides: 150 mg/dL** ✅ Normal (goal: <150)

**What This Means:**
Your overall cholesterol is good, but your HDL could be higher and LDL could be lower. This is why you're on Atorvastatin.

**Natural Ways to Improve:**
1. Increase omega-3 fatty acids (fish, walnuts)
2. Add soluble fiber (oats, beans)
3. Exercise regularly to boost HDL
4. Reduce saturated fats

Your medication should help, but lifestyle changes will maximize benefits.`;

      suggestions = [
        "What foods lower cholesterol naturally?",
        "How much exercise do I need?",
        "When should I retest my cholesterol?",
        "Are there any supplements that help?"
      ];
    } else {
      content = `I understand you're looking for health information. As your AI medical assistant, I can help with:

**Available Services:**
• **Report Analysis** - Interpret your medical test results
• **Medication Guidance** - Explain dosages, interactions, and schedules
• **Health Trends** - Track changes in your health metrics over time
• **Symptom Assessment** - Provide general information about symptoms
• **Preventive Care** - Suggest health screenings and lifestyle improvements

**Important Note:** I provide general health information and cannot replace professional medical advice. Always consult your healthcare provider for medical decisions.

What specific health topic would you like to explore?`;

      suggestions = [
        "Analyze my latest blood work",
        "Explain my medication schedule",
        "Show my health trends over time",
        "What preventive care do I need?"
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputMessage(action.prompt);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Medical Assistant</h1>
          <p className="text-gray-600">Chat with AI to understand your health data and get personalized insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-green-100 text-green-800">
            <Activity className="w-3 h-3 mr-1" />
            Online
          </Badge>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Chat
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="justify-start h-auto p-3 hover:bg-red-50 hover:border-red-200"
            onClick={() => handleQuickAction(action)}
          >
            <div className="flex items-center space-x-2">
              {action.icon}
              <span className="text-sm">{action.label}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <MessageCircle className="w-5 h-5 mr-2 text-red-600" />
            Chat with Medical AI
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.type === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'assistant' && (
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-3 space-y-2">
                            {message.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <FileText className="w-3 h-3" />
                                <span>{attachment.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {message.suggestions && message.suggestions.length > 0 && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs opacity-75">Suggested follow-ups:</p>
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full px-3 py-1 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="text-xs opacity-75 mt-2">
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                      
                      {message.type === 'user' && (
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            {/* File Attachments */}
            {selectedFiles.length > 0 && (
              <div className="mb-3 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Input Row */}
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                <Textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about your health data, medications, or get medical explanations..."
                  className="resize-none min-h-[60px] pr-20"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() && selectedFiles.length === 0}
                className="bg-red-600 hover:bg-red-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="flex items-center space-x-2 mt-3 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              <span>
                This AI assistant provides general health information and cannot replace professional medical advice.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}