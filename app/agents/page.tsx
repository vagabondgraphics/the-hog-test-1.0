'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { PaperPlaneTilt, DotsThree, Sparkle, Clock } from '@phosphor-icons/react';
import { conversationFlows, Message } from '@/lib/agentConversations';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'idle' | 'coming-soon';
  description: string;
}

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string>('cmo');
  const [messages, setMessages] = useState<Message[]>([conversationFlows.cmo[0]]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
    {
      id: 'cmo',
      name: 'CMO Agent',
      role: 'Strategic Positioning',
      avatar: '🎯',
      status: 'active',
      description: 'High-level strategy & positioning'
    },
    {
      id: 'seo',
      name: 'SEO Expert',
      role: 'Content Optimization',
      avatar: '🔍',
      status: 'idle',
      description: 'Keyword research & SERP analysis'
    },
    {
      id: 'brand',
      name: 'Brand Strategist',
      role: 'Voice & Messaging',
      avatar: '✨',
      status: 'coming-soon',
      description: 'Brand voice & tone guidance'
    }
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: inputValue,
      timestamp: 'just now'
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse: Message = {
        id: messages.length + 2,
        sender: 'agent',
        content: "I understand. Let me help you with that. Based on your competitive intelligence data, I can provide strategic recommendations.",
        timestamp: 'just now',
        quickReplies: ['Show me specific tactics', 'What about pricing?', 'Competitive analysis']
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    const conversation = conversationFlows[selectedAgent as keyof typeof conversationFlows];

    // Find the next message in the conversation flow
    const currentMessageIndex = messages.length - 1;
    const nextUserMessage = conversation.find(
      (msg, idx) => idx > currentMessageIndex && msg.sender === 'user' && msg.content === reply
    );

    if (nextUserMessage) {
      // Add user message
      setMessages(prev => [...prev, nextUserMessage]);
      setIsTyping(true);

      // Find the agent's response
      const nextUserMsgIndex = conversation.indexOf(nextUserMessage);
      const agentResponse = conversation[nextUserMsgIndex + 1];

      setTimeout(() => {
        setIsTyping(false);
        if (agentResponse) {
          setMessages(prev => [...prev, agentResponse]);

          // If there's another agent message right after, add it too
          const followUpMessage = conversation[nextUserMsgIndex + 2];
          if (followUpMessage && followUpMessage.sender === 'agent') {
            setTimeout(() => {
              setMessages(prev => [...prev, followUpMessage]);
            }, 1000);
          }
        }
      }, 1500);
    } else {
      // Fallback: just fill the input
      setInputValue(reply);
    }
  };

  const handleActionButton = (button: { label: string; action: string; nextMessageId?: number }) => {
    const conversation = conversationFlows[selectedAgent as keyof typeof conversationFlows];

    // Add user message (simplified version of button label)
    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: button.label.replace(/[📄📢]/g, '').trim(),
      timestamp: 'just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Find the next message by ID if provided
    let agentResponse;
    if (button.nextMessageId) {
      agentResponse = conversation.find(msg => msg.id === button.nextMessageId);
    } else {
      // Find next agent message in conversation
      const currentIdx = conversation.findIndex(msg => msg.id === messages[messages.length - 1].id);
      agentResponse = conversation.find((msg, idx) => idx > currentIdx && msg.sender === 'agent');
    }

    setTimeout(() => {
      setIsTyping(false);
      if (agentResponse) {
        setMessages(prev => [...prev, agentResponse]);
      }
    }, 1500);
  };

  const handleAgentSwitch = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent?.status === 'coming-soon') return;

    setSelectedAgent(agentId);
    setCurrentConversationIndex(0);

    // Load the first message from the agent's conversation
    const conversation = conversationFlows[agentId as keyof typeof conversationFlows];
    if (conversation && conversation.length > 0) {
      setMessages([conversation[0]]);
    }
  };

  const currentAgent = agents.find(a => a.id === selectedAgent);

  return (
    <div className="flex h-screen bg-surface-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 flex overflow-hidden">
          {/* Agent Selector - Left Column */}
          <div className="w-[240px] bg-surface-light border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">AI Agents</h2>
              <p className="text-xs text-gray-500 mt-1">Choose your assistant</p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {agents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSwitch(agent.id)}
                  disabled={agent.status === 'coming-soon'}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    selectedAgent === agent.id
                      ? 'border-primary bg-blue-50'
                      : agent.status === 'coming-soon'
                      ? 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{agent.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-gray-900 truncate">
                          {agent.name}
                        </h3>
                        {agent.status === 'active' && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        {agent.status === 'idle' && (
                          <Clock size={12} className="text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{agent.role}</p>
                      <p className="text-xs text-gray-500 mt-1">{agent.description}</p>
                      {agent.status === 'coming-soon' && (
                        <div className="mt-2 inline-block px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full font-semibold">
                          Coming Soon
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area - Center Column */}
          <div className="flex-1 max-w-[640px] flex flex-col bg-white">
            {/* Chat Header */}
            <div className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{currentAgent?.avatar}</div>
                <div>
                  <h2 className="font-bold text-gray-900">{currentAgent?.name}</h2>
                  <p className="text-xs text-gray-500">{currentAgent?.role}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <DotsThree size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'ml-12' : 'mr-12'}`}>
                    {message.sender === 'agent' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-700">{currentAgent?.name}</span>
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                      </div>
                    )}

                    <div
                      className={`rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {/* Table (if present) */}
                    {message.table && message.sender === 'agent' && (
                      <div className="mt-3 bg-white rounded-lg border border-gray-200 overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              {message.table.headers.map((header, idx) => (
                                <th key={idx} className="px-4 py-2 text-left font-semibold text-gray-900 border-b border-gray-200">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {message.table.rows.map((row, rowIdx) => (
                              <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                {row.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="px-4 py-2 text-gray-700 border-b border-gray-100">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {message.sender === 'user' && (
                      <div className="flex items-center gap-2 justify-end mt-1">
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                      </div>
                    )}

                    {/* Quick Replies */}
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.quickReplies.map((reply, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickReply(reply)}
                            className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:border-primary hover:text-primary transition-all animate-slide-up"
                            style={{ animationDelay: `${(index * 0.1) + (idx * 0.1)}s` }}
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {message.actionButtons && message.actionButtons.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.actionButtons.map((button, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleActionButton(button)}
                            className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                          >
                            {button.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] mr-12">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-700">{currentAgent?.name}</span>
                      <span className="text-xs text-gray-400">typing...</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl p-4 w-16">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Ask ${currentAgent?.name} anything...`}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <PaperPlaneTilt size={20} weight="fill" />
                </button>
              </div>
            </div>
          </div>

          {/* Context Panel - Right Column */}
          <div className="w-[280px] bg-surface-light border-l border-gray-200 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* ICP Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-gray-900">Current ICP</h3>
                  <button className="text-xs text-primary font-semibold hover:underline">
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-gray-500">Industry:</span>
                    <span className="text-gray-900 font-semibold ml-1">B2B SaaS</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Company Size:</span>
                    <span className="text-gray-900 font-semibold ml-1">50-200</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Role:</span>
                    <span className="text-gray-900 font-semibold ml-1">VP Marketing</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Pain Points:</span>
                    <span className="text-gray-900 font-semibold ml-1">Lead gen, Attribution</span>
                  </div>
                </div>
              </div>

              {/* Competitors Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-gray-900">Tracked Competitors</h3>
                  <button className="text-xs text-primary font-semibold hover:underline">
                    Manage
                  </button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-purple-100 rounded flex items-center justify-center text-xs font-bold text-purple-600">
                      H
                    </div>
                    <span className="text-xs font-semibold text-gray-900">HubSpot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center text-xs font-bold text-blue-600">
                      M
                    </div>
                    <span className="text-xs font-semibold text-gray-900">Marketo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center text-xs font-bold text-green-600">
                      P
                    </div>
                    <span className="text-xs font-semibold text-gray-900">Pardot</span>
                  </div>
                </div>
              </div>

              {/* Recent Campaigns Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Recent Campaigns</h3>
                <div className="space-y-3">
                  <div className="pb-3 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-900 mb-1">Q4 Product Launch</div>
                    <div className="text-xs text-gray-500">LinkedIn • 12 posts</div>
                  </div>
                  <div className="pb-3 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-900 mb-1">Thought Leadership</div>
                    <div className="text-xs text-gray-500">Twitter • 24 threads</div>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-900 mb-1">Community Engagement</div>
                    <div className="text-xs text-gray-500">Reddit • 8 comments</div>
                  </div>
                </div>
              </div>

              {/* Top Opportunity Card */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border-2 border-orange-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle size={16} className="text-orange-600" weight="fill" />
                  <h3 className="font-bold text-sm text-gray-900">Top Opportunity</h3>
                </div>
                <div className="text-xs text-gray-700 mb-3">
                  HubSpot's new AI feature getting negative feedback on Reddit
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-600">High Urgency</span>
                  <button className="text-xs text-primary font-semibold hover:underline">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
