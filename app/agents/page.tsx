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
      description: 'Active now • 12 msgs'
    },
    {
      id: 'seo',
      name: 'SEO Expert',
      role: 'Content Optimization',
      avatar: '🔍',
      status: 'active',
      description: 'Active now • 8 msgs'
    },
    {
      id: 'brand',
      name: 'Brand Strategist',
      role: 'Voice & Messaging',
      avatar: '✨',
      status: 'active',
      description: 'Last chat: 2 weeks ago'
    },
    {
      id: 'data',
      name: 'Data Analyst',
      role: 'Data insights & reporting',
      avatar: '📊',
      status: 'coming-soon',
      description: 'Data insights & reporting'
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
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 flex overflow-hidden">
          {/* Agent Selector - Left Column */}
          <div className="w-[280px] bg-white border-r border-gray-100 flex flex-col overflow-hidden">
            <div className="h-[72px] px-6 flex flex-col justify-center border-b border-gray-100 shrink-0">
              <h2 className="text-base font-bold text-gray-900 mb-0.5">AI Agents</h2>
              <p className="text-xs text-neutral">Choose your assistant</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {agents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => handleAgentSwitch(agent.id)}
                  disabled={agent.status === 'coming-soon'}
                  className={`w-full p-4 rounded-md border transition-all text-left ${
                    selectedAgent === agent.id
                      ? 'border-2 border-primary bg-blue-50'
                      : agent.status === 'coming-soon'
                      ? 'border border-gray-100 opacity-50 cursor-not-allowed'
                      : 'border border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl flex-shrink-0">{agent.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-bold text-sm truncate ${
                          agent.status === 'coming-soon' ? 'text-gray-500' : 'text-gray-900'
                        }`}>
                          {agent.name}
                        </h3>
                        {agent.status === 'active' && (
                          <>
                            <span className="sr-only">Active</span>
                            <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" aria-hidden="true"></div>
                          </>
                        )}
                        {agent.status === 'coming-soon' && (
                          <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded font-semibold flex-shrink-0">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className={`text-xs truncate ${
                        agent.status === 'coming-soon' ? 'text-gray-400' : 'text-gray-600'
                      }`}>{agent.role}</p>
                      <p className={`text-xs mt-1 ${
                        agent.status === 'coming-soon' ? 'text-gray-400' : 'text-gray-500'
                      }`}>{agent.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area - Center Column */}
          <div className="flex-1 flex flex-col bg-surface-light">
            {/* Chat Header */}
            <div className="h-[72px] bg-white border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{currentAgent?.avatar}</div>
                <div>
                  <h2 className="text-base font-bold text-gray-900 leading-tight mb-0">{currentAgent?.name}</h2>
                  <p className="text-xs text-neutral leading-tight">{currentAgent?.role}</p>
                </div>
              </div>
              <button
                className="text-neutral hover:text-gray-900"
                aria-label="Agent options"
              >
                <DotsThree size={24} />
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
            <div className="bg-white border-t border-gray-100 p-6 flex-shrink-0">
              <div className="flex items-end gap-3">
                <label htmlFor="chat-input" className="sr-only">
                  Message {currentAgent?.name}
                </label>
                <textarea
                  id="chat-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder={`Ask ${currentAgent?.name} anything...`}
                  rows={2}
                  className="flex-1 px-3 py-3 border border-gray-200 rounded-md resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-primary text-white p-3 rounded-md hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <PaperPlaneTilt size={20} weight="fill" />
                </button>
              </div>
            </div>
          </div>

          {/* Context Panel - Right Column */}
          <div className="w-[320px] bg-white border-l border-gray-100 flex flex-col overflow-hidden">

            {/* Context Header */}
            <div className="h-[72px] px-6 flex items-center justify-between border-b border-gray-100 shrink-0">
              <h2 className="text-base font-bold text-gray-900">Context</h2>
            </div>

            {/* Scrollable Context Cards */}
            <div className="flex-1 overflow-y-auto">
              {/* Your ICP Card */}
            <div className="bg-white border-b border-gray-100">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900">Your ICP</h3>
                <button
                  className="text-sm text-primary hover:underline"
                  aria-label="Edit ICP settings"
                >
                  Edit
                </button>
              </div>
              <div className="px-6 py-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral">Industry:</span>
                  <span className="font-semibold text-gray-900">B2B SaaS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">Company Size:</span>
                  <span className="font-semibold text-gray-900">50-200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">Role:</span>
                  <span className="font-semibold text-gray-900">VP Marketing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral">Pain Points:</span>
                  <span className="font-semibold text-gray-900 text-right">Lead gen, Attribution</span>
                </div>
              </div>
            </div>

            {/* Competitors Card */}
            <div className="bg-white border-b border-gray-100">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900">Competitors (3)</h3>
                <button
                  className="text-sm text-primary hover:underline"
                  aria-label="Manage competitors"
                >
                  Manage
                </button>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center text-sm font-bold text-purple-600">
                    H
                  </div>
                  <span className="text-sm text-gray-900">HubSpot</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center text-sm font-bold text-blue-600">
                    M
                  </div>
                  <span className="text-sm text-gray-900">Marketo</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center text-sm font-bold text-green-600">
                    P
                  </div>
                  <span className="text-sm text-gray-900">Pardot</span>
                </div>
              </div>
            </div>

            {/* Recent Campaigns Card */}
            <div className="bg-white border-b border-gray-100">
              <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
                <h3 className="font-bold text-base text-gray-900">Recent Campaigns</h3>
                <button
                  className="text-sm text-primary hover:underline"
                  aria-label="View all campaigns"
                >
                  View All
                </button>
              </div>
              <div className="px-6 py-4 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-neutral mt-1">•</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Q4 Product Launch</div>
                    <div className="text-xs text-neutral">LinkedIn • 12 posts</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral mt-1">•</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Thought Leadership</div>
                    <div className="text-xs text-neutral">Twitter • 24 threads</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-neutral mt-1">•</span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">Community Engagement</div>
                    <div className="text-xs text-neutral">Reddit • 8 comments</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Opportunity Card - Clean White Design */}
            <div className="bg-white border-b border-gray-100">
              <div className="px-6 py-4 flex items-center gap-2 border-b border-gray-100">
                <Sparkle size={18} className="text-neutral" weight="regular" />
                <h3 className="font-bold text-base text-gray-900">Top Opportunity</h3>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-neutral mb-4 leading-relaxed">
                  HubSpot's new AI feature getting negative feedback on Reddit
                </p>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="px-2 py-1 bg-red-100 text-danger font-semibold rounded">
                    <span className="sr-only">Urgency level:</span>
                    High Urgency
                  </span>
                  <span className="text-neutral"><span className="sr-only">Opportunity score:</span>Score: 9.2/10</span>
                </div>
                <button
                  className="w-full border border-gray-200 text-primary bg-white font-semibold py-2.5 px-4 rounded-sm hover:bg-gray-50 transition-colors text-sm"
                  aria-label="View opportunity details: HubSpot AI feature backlash"
                >
                  View Details
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
