"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2, CheckCircle, AlertCircle, Wrench, Package } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  functionCalls?: { name: string; result: string }[];
}

const suggestedQuestions = [
  "What is the maintenance schedule for my equipment?",
  "The hydraulic system seems slow, what should I check?",
  "I need to order replacement filters for EX-001",
  "Create a service request for engine noise on EX-001",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm UELMS AI, your equipment assistant. I can help you with:\n\n• Maintenance schedules and equipment status\n• Troubleshooting and fault codes\n• Creating service requests\n• Ordering replacement parts\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for API
      const conversationHistory = messages
        .filter((m) => m.id !== "1") // Exclude initial greeting
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      conversationHistory.push({
        role: "user",
        content: input,
      });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        functionCalls: data.function_calls,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I apologize, but I encountered an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const renderFunctionCallBadge = (functionCall: { name: string; result: string }) => {
    const result = JSON.parse(functionCall.result);
    const isSuccess = result.success;

    let icon = <CheckCircle size={14} />;
    let label = "Action completed";
    let bgColor = "bg-green-50 border-green-200 text-green-700";

    switch (functionCall.name) {
      case "create_service_request":
        icon = <Wrench size={14} />;
        label = isSuccess ? `Service Request ${result.request_id} created` : "Failed to create request";
        bgColor = isSuccess ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700";
        break;
      case "request_parts_replacement":
        icon = <Package size={14} />;
        label = isSuccess ? `Parts Request ${result.request_id} submitted` : "Failed to submit request";
        bgColor = isSuccess ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700";
        break;
      case "get_equipment_status":
        icon = <AlertCircle size={14} />;
        label = `Equipment status retrieved`;
        bgColor = "bg-gray-50 border-gray-200 text-gray-700";
        break;
      case "get_maintenance_schedule":
        icon = <AlertCircle size={14} />;
        label = `Maintenance schedule retrieved`;
        bgColor = "bg-gray-50 border-gray-200 text-gray-700";
        break;
    }

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${bgColor}`}>
        {icon}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-accent text-white rounded-br-md"
                  : "bg-gray-100 text-gray-900 rounded-bl-md border border-gray-200"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-xs font-medium text-accent">UELMS AI</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              
              {/* Function call badges */}
              {message.functionCalls && message.functionCalls.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                  {message.functionCalls.map((fc, index) => (
                    <div key={index}>
                      {renderFunctionCallBadge(fc)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-md p-4 border border-gray-200">
              <div className="flex items-center gap-2">
                <Loader2 size={16} className="text-accent animate-spin" />
                <span className="text-sm text-gray-500">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-gray-500 mb-2">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 hover:border-accent transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your equipment..."
            className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-accent transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
