import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Trash2, 
  Bot, 
  User, 
  Lightbulb, 
  ArrowRight
} from 'lucide-react';
import { LocationData, FamilyProfile, ChatMessage } from '../types';
import { askGeminiSmogAssistant, getStoredApiKey } from '../services/geminiService';

interface ChatAssistantProps {
  location: LocationData;
  familyProfile: FamilyProfile;
  onOpenSettingsModal: () => void;
  onSelectTab: (tab: string) => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  location,
  familyProfile,
  onOpenSettingsModal,
  onSelectTab: _onSelectTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello ${familyProfile.name}! I am **AeroWise AI**, your personal atmospheric health scientist and winter smog copilot.

I am analyzing live conditions in **${location.name}** (Current AQI: **${location.aqi}** — **${location.inversionRisk}**).

Because your household includes **${familyProfile.membersCount} people**${
        familyProfile.hasInfants || familyProfile.hasAsthmaOrRespiratory
          ? ' with **vulnerable family members (infants/asthmatics)**'
          : ''
      }, here is how I can protect your family:

* **🏫 School & Pediatric Protocols:** Should kids go outdoors, what masks actually work, and when to invoke hybrid schooling.
* **🛠️ DIY High-CADR Air Hacks:** Step-by-step Corsi-Rosenthal Box builds, window sealing, and negative-pressure chimney traps.
* **⏱️ Smog-Smart Daily Routines:** Avoiding toxic morning inversion traps and optimizing your commute.
* **🌿 Sustainable Alternatives:** Low-emission home heating, zero-NO2 cooking shifts, and community action.

How can I help you breathe easier today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: [
        'Is it safe to send my child to school with current AQI?',
        'How do I build a Corsi-Rosenthal box under $45?',
        'Why does my kitchen exhaust suck outside smog into bedrooms?',
        'Optimize our family 24-hr winter smog routine',
        'What are the mandatory GRAP Stage 4 restrictions?',
      ],
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasCustomApiKey = Boolean(getStoredApiKey());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await askGeminiSmogAssistant(textToSend, location, familyProfile);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: [
          'What sustainable heating alternative replaces wood burning?',
          'Calculate our family’s lung particulate exposure avoided',
          'Show me the DIY Window Sealing and Dollar Bill Test'
        ]
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (_err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'I encountered an unexpected issue while consulting the environmental engine. Please try asking again or check your settings.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeechToggle = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }

    if (isSpeaking === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
    } else {
      window.speechSynthesis.cancel();
      const cleanText = text
        .replace(/[*#_`]/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(null);
      utterance.onerror = () => setIsSpeaking(null);
      setIsSpeaking(id);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear current conversation history?')) {
      window.speechSynthesis?.cancel();
      setIsSpeaking(null);
      setMessages([
        {
          id: 'welcome-reset',
          sender: 'assistant',
          text: `Chat cleared. What air quality or routine question can I help ${familyProfile.name} solve?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedPrompts: [
            'Is it safe to send my child to school with current AQI?',
            'How do I build a Corsi-Rosenthal box under $45?',
            'Optimize our family 24-hr winter smog routine',
          ],
        },
      ]);
    }
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="text-slate-100 font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* macOS-style Assistant Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/70 border border-white/10 rounded-2xl px-4 py-2.5 text-xs backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="mac-traffic-lights mr-1 hidden sm:flex">
            <span className="mac-dot mac-dot-close" />
            <span className="mac-dot mac-dot-minimize" />
            <span className="mac-dot mac-dot-maximize" />
          </div>
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-300">GenAI Smog Copilot:</span>
          {hasCustomApiKey ? (
            <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full font-mono text-[11px]">
              Gemini 1.5 Flash Connected
            </span>
          ) : (
            <span className="text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded-full font-mono text-[11px]">
              Built-in Smog AI Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSettingsModal}
            className="text-slate-400 hover:text-cyan-300 text-xs underline underline-offset-2 transition-colors"
          >
            {hasCustomApiKey ? 'Configure Key' : 'Add Gemini Key'}
          </button>
          <div className="h-3 w-px bg-white/10" />
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 text-xs transition-colors px-2 py-1 rounded-lg hover:bg-white/5 active:scale-95"
            title="Reset Chat"
          >
            <Trash2 className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="glass-panel border border-white/10 rounded-[24px] p-4 sm:p-6 min-h-[520px] max-h-[640px] overflow-y-auto flex flex-col space-y-4 shadow-2xl">
        {messages.map((msg) => {
          const isAi = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
                isAi ? 'self-start' : 'self-end flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-md border border-white/10 ${
                  isAi
                    ? 'bg-gradient-to-tr from-cyan-600 to-teal-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  isAi
                    ? 'bg-slate-900/90 border border-white/10 text-slate-200'
                    : 'bg-cyan-600 text-white font-medium border border-cyan-400/30'
                }`}
              >
                {/* Text Content */}
                <div className="prose prose-invert prose-sm max-w-none space-y-2">
                  {msg.text.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-base font-bold text-cyan-300 mt-2 mb-1">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={pIdx} className="text-sm font-bold text-teal-300 mt-2 mb-1">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                      const bullets = paragraph.split('\n');
                      return (
                        <ul key={pIdx} className="list-disc list-inside space-y-1 text-slate-300 my-1">
                          {bullets.map((b, bIdx) => (
                            <li key={bIdx}>
                              {renderFormattedText(b.replace(/^[*|-]\s*/, ''))}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-slate-300">
                        {renderFormattedText(paragraph)}
                      </p>
                    );
                  })}
                </div>

                {/* Bottom Actions for AI messages */}
                {isAi && (
                  <div className="mt-3 pt-2 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono text-[10px]">{msg.timestamp}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCopyText(msg.id, msg.text)}
                        className="hover:text-cyan-300 flex items-center gap-1 transition-colors active:scale-95"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleSpeechToggle(msg.id, msg.text)}
                        className={`flex items-center gap-1 transition-colors active:scale-95 ${
                          isSpeaking === msg.id ? 'text-cyan-300 animate-pulse' : 'hover:text-cyan-300'
                        }`}
                        title="Read aloud"
                      >
                        {isSpeaking === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Suggested Follow-up Prompts */}
                {isAi && msg.suggestedPrompts && (
                  <div className="mt-3 pt-2 flex flex-wrap gap-1.5">
                    {msg.suggestedPrompts.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[11px] bg-slate-800/80 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-200 px-2.5 py-1 rounded-full transition-all text-left flex items-center gap-1 active:scale-95"
                      >
                        <ArrowRight className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 text-slate-950 font-bold flex items-center justify-center shrink-0 border border-white/10">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-900 border border-white/10 rounded-2xl px-4 py-3 text-sm text-slate-400 flex items-center gap-2">
              <span className="flex space-x-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
              </span>
              <span>AeroWise AI is synthesizing environmental models...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form & Quick Prompt Chips */}
      <div className="space-y-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-slate-900/90 border border-white/10 rounded-2xl p-1.5 shadow-lg focus-within:border-cyan-400/60 transition-all backdrop-blur-xl"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask AeroWise AI anything about smog, masks, DIY filters, or school protocols in ${location.name}...`}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all shadow-md shadow-cyan-600/20 active:scale-95"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Quick Question Launchers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs text-slate-400">
          <span className="shrink-0 flex items-center gap-1 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            Quick Guides:
          </span>
          <button
            onClick={() => handleSendMessage('Explain the Corsi-Rosenthal DIY Box and CADR rating')}
            className="shrink-0 px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-slate-300 hover:text-cyan-300 text-[11px] transition-all active:scale-95"
          >
            🛠️ Corsi Box DIY
          </button>
          <button
            onClick={() => handleSendMessage('Why is running morning outdoor cardio dangerous during severe smog?')}
            className="shrink-0 px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-slate-300 hover:text-cyan-300 text-[11px] transition-all active:scale-95"
          >
            🏃 Morning Cardio Hazard
          </button>
          <button
            onClick={() => handleSendMessage('How do I seal our bedroom bubble and what air changes do I need?')}
            className="shrink-0 px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-slate-300 hover:text-cyan-300 text-[11px] transition-all active:scale-95"
          >
            🛏️ Bedroom Clean Bubble
          </button>
          <button
            onClick={() => handleSendMessage('What are the best indoor plants and do they actually filter PM2.5?')}
            className="shrink-0 px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/5 hover:border-white/15 text-slate-300 hover:text-cyan-300 text-[11px] transition-all active:scale-95"
          >
            🪴 Plant Myths vs Reality
          </button>
        </div>
      </div>
    </div>
  );
};
