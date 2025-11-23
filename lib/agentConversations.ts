export interface Message {
  id: number;
  sender: 'agent' | 'user';
  content: string;
  timestamp: string;
  quickReplies?: string[];
  actionButtons?: { label: string; action: string; nextMessageId?: number }[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export const cmoAgentConversation: Message[] = [
  {
    id: 1,
    sender: 'agent',
    content: "Hi! I'm your CMO Agent. I help you craft high-level competitive positioning, messaging strategies, and go-to-market plays. What would you like to work on today?",
    timestamp: 'just now',
    quickReplies: [
      'Help me position against a competitor',
      'Review our messaging strategy',
      'Suggest a campaign idea'
    ]
  },
  {
    id: 2,
    sender: 'user',
    content: 'Help me position against a competitor',
    timestamp: 'just now'
  },
  {
    id: 3,
    sender: 'agent',
    content: "Perfect! I see you're tracking HubSpot, Marketo, and Pardot. Which competitor would you like to focus on?",
    timestamp: 'just now',
    quickReplies: ['HubSpot', 'Marketo', 'Pardot']
  },
  {
    id: 4,
    sender: 'user',
    content: 'HubSpot',
    timestamp: 'just now'
  },
  {
    id: 5,
    sender: 'agent',
    content: "Great choice. I've analyzed HubSpot's recent moves and your ICP (B2B SaaS, 50-200 employees, VP Marketing). Here's what I found:\n\n**Key Opportunity:**\nHubSpot just launched an AI content assistant, but it's getting mixed reviews—especially around accuracy and over-promising. Your ICP cares deeply about ROI and attribution, which HubSpot's new feature doesn't address well.\n\n**Recommended Positioning:**\n\"Unlike tools that add AI for AI's sake, we focus on what B2B marketers actually need: proven attribution and lead quality—not content generation gimmicks.\"\n\nWould you like me to draft a competitive battlecard or a campaign brief based on this?",
    timestamp: 'just now',
    actionButtons: [
      { label: '📄 Draft Battlecard', action: 'battlecard', nextMessageId: 6 },
      { label: '📢 Create Campaign Brief', action: 'campaign', nextMessageId: 8 }
    ]
  },
  {
    id: 6,
    sender: 'user',
    content: 'Draft Battlecard',
    timestamp: 'just now'
  },
  {
    id: 7,
    sender: 'agent',
    content: "Here's your competitive battlecard for HubSpot:\n\n**COMPETITIVE BATTLECARD: HubSpot**\n\n**Their Strength:**\n• All-in-one platform appeal\n• Strong brand recognition\n• Large ecosystem of integrations\n\n**Their Weakness:**\n• New AI features lack depth\n• Complex pricing tiers\n• Over-engineering for mid-market\n\n**Our Advantage:**\n• Purpose-built for attribution & ROI\n• Transparent, predictable pricing\n• Fast time-to-value for 50-200 employee teams\n\n**Key Message:**\n\"HubSpot adds features. We solve problems.\"\n\n**Objection Handling:**\nIf they say: \"But HubSpot does everything...\"\nYou say: \"That's true—but for your ICP, 'everything' often means complexity and hidden costs. Our customers see ROI in weeks, not quarters.\"\n\nWould you like me to export this to a doc or create social content around this positioning?",
    timestamp: 'just now',
    actionButtons: [
      { label: 'Export as PDF', action: 'export' },
      { label: 'Generate Social Content', action: 'social' }
    ]
  },
  {
    id: 8,
    sender: 'user',
    content: 'Create Campaign Brief',
    timestamp: 'just now'
  },
  {
    id: 9,
    sender: 'agent',
    content: "**CAMPAIGN BRIEF: \"Real Results, Not AI Hype\"**\n\n**Objective:**\nPosition against HubSpot's AI feature launch by emphasizing proven ROI over experimental AI\n\n**Target Audience:**\nVP Marketing at B2B SaaS companies (50-200 employees) evaluating marketing automation platforms\n\n**Key Message:**\n\"Stop chasing AI trends. Start tracking real attribution.\"\n\n**Channels:**\n• LinkedIn thought leadership posts (3x/week)\n• Comparison landing page\n• Reddit AMAs in r/marketing\n• Email nurture sequence for trial users\n\n**Content Themes:**\n1. \"Why AI content generation ≠ better marketing\"\n2. \"The hidden costs of 'all-in-one' platforms\"\n3. Customer stories: ROI in 30 days vs. 6-month implementations\n\n**Success Metrics:**\n• 25% increase in demo requests from HubSpot comparison page\n• 3x engagement on anti-hype content vs. standard posts\n\nReady to launch? I can route this to your content agent to start drafting posts.",
    timestamp: 'just now',
    actionButtons: [
      { label: 'Send to Content Agent', action: 'route-content' },
      { label: 'Refine Messaging', action: 'refine' }
    ]
  }
];

export const seoAgentConversation: Message[] = [
  {
    id: 1,
    sender: 'agent',
    content: "Hey! I'm your SEO Expert. I analyze competitor content, find keyword gaps, and suggest SEO-driven topics and optimizations. What can I help you optimize today?",
    timestamp: 'just now',
    quickReplies: [
      'Find keyword opportunities',
      'Analyze competitor content',
      'Review my content SEO'
    ]
  },
  {
    id: 2,
    sender: 'user',
    content: 'Find keyword opportunities',
    timestamp: 'just now'
  },
  {
    id: 3,
    sender: 'agent',
    content: "I've analyzed the top 50 pages from HubSpot, Marketo, and Pardot. Here are the keyword gaps where you can outrank them:\n\n**High-Value Opportunities (Low Competition, High Intent):**",
    timestamp: 'just now',
    table: {
      headers: ['Keyword', 'Volume', 'Difficulty', 'Competitor Rank', 'Your Rank'],
      rows: [
        ['B2B attribution tools', '1.2K', 'Medium', 'HubSpot #8', 'Not ranking'],
        ['marketing automation ROI', '890', 'Low', 'Marketo #12', 'Not ranking'],
        ['lead scoring best practices', '2.1K', 'Medium', 'Pardot #15', '#42']
      ]
    }
  },
  {
    id: 4,
    sender: 'agent',
    content: "**Recommended Action:**\nCreate a pillar page on \"B2B attribution tools\" targeting your ICP. I estimate you can rank in the top 5 within 60 days with:\n\n• 2,500-word comprehensive guide\n• Comparison table (your solution vs. HubSpot/Marketo)\n• Interactive ROI calculator\n• 3 supporting blog posts\n\nWant me to draft an outline or analyze what's already ranking?",
    timestamp: 'just now',
    actionButtons: [
      { label: 'Draft Content Outline', action: 'outline', nextMessageId: 5 },
      { label: 'Show Top Ranking Content', action: 'analyze', nextMessageId: 7 }
    ]
  },
  {
    id: 5,
    sender: 'user',
    content: 'Draft Content Outline',
    timestamp: 'just now'
  },
  {
    id: 6,
    sender: 'agent',
    content: "**CONTENT OUTLINE: \"The Complete Guide to B2B Attribution Tools (2025)\"**\n\n**Target Keyword:** B2B attribution tools (1.2K monthly searches)\n**Secondary Keywords:** marketing attribution software, multi-touch attribution, ROI tracking\n\n**H1:** The Complete Guide to B2B Attribution Tools (2025)\n\n**Introduction (300 words)**\n• Why attribution matters for B2B marketers\n• The cost of guessing which channels work\n• What this guide covers\n\n**H2: What is B2B Marketing Attribution? (400 words)**\n• Definition and core concepts\n• Single-touch vs. multi-touch models\n• Common misconceptions\n\n**H2: Top Attribution Models Explained (600 words)**\n• First-touch attribution\n• Last-touch attribution\n• Linear attribution\n• Time-decay attribution\n• W-shaped and U-shaped\n• Custom models\n\n**H2: Comparing the Best B2B Attribution Tools (800 words)**\n[Include comparison table with 6-8 tools]\n• Your Solution (detailed)\n• HubSpot (emphasize limitations)\n• Marketo (pricing complexity)\n• Bizible, Dreamdata, etc.\n\n**H2: How to Choose the Right Attribution Tool (400 words)**\n• Team size considerations\n• Integration requirements\n• Budget and ROI timeline\n\n**H2: Implementation Best Practices (500 words)**\n• Data hygiene requirements\n• Common pitfalls to avoid\n• Timeline expectations\n\n**Conclusion + CTA (200 words)**\n• Summary of key takeaways\n• Interactive ROI calculator CTA\n• Free trial/demo CTA\n\n**SEO Optimizations:**\n✅ Include FAQ schema for \"What is attribution?\" etc.\n✅ Add comparison table with structured data\n✅ Internal links to 3 supporting posts\n✅ External links to authoritative sources (Gartner, Forrester)\n✅ Optimize meta description for CTR\n\nReady to route this to your content agent for drafting?",
    timestamp: 'just now',
    actionButtons: [
      { label: 'Send to Content Agent', action: 'route-content' },
      { label: 'Refine Outline', action: 'refine' }
    ]
  },
  {
    id: 7,
    sender: 'user',
    content: 'Show Top Ranking Content',
    timestamp: 'just now'
  },
  {
    id: 8,
    sender: 'agent',
    content: "**TOP RANKING CONTENT ANALYSIS: \"B2B attribution tools\"**\n\n**Position #1: G2.com - \"Best Marketing Attribution Software\" (3,200 words)**\n• Why it ranks: Comprehensive comparison, 50+ user reviews, regular updates\n• Weakness: Generic, not B2B-focused\n• Your edge: Focus on B2B-specific use cases\n\n**Position #2: HubSpot Blog - \"Marketing Attribution Models Explained\" (2,100 words)**\n• Why it ranks: Strong domain authority, visual diagrams\n• Weakness: Light on tool comparisons, self-promotional\n• Your edge: Unbiased comparison with real ROI data\n\n**Position #3: Marketo Guide - \"The Definitive Guide to Attribution\" (4,500 words)**\n• Why it ranks: Depth, gated asset with backlinks\n• Weakness: Outdated (2021), technical jargon\n• Your edge: 2025 updates, accessible language for VP-level audience\n\n**Content Gap Opportunity:**\nNone of the top 10 results include:\n• Interactive ROI calculator\n• Side-by-side feature comparison table\n• Implementation timeline estimator\n\nIf you add these, you'll have a unique angle that can outrank them. Want me to draft the comparison table?",
    timestamp: 'just now',
    actionButtons: [
      { label: 'Draft Comparison Table', action: 'table' },
      { label: 'Start Outline with Gaps', action: 'outline-gaps' }
    ]
  }
];

export const brandAgentConversation: Message[] = [
  {
    id: 1,
    sender: 'agent',
    content: "Hi! I'm your Brand Strategist. I help you maintain consistent voice, refine messaging, and ensure your content aligns with your brand personality. What would you like to work on?",
    timestamp: 'just now',
    quickReplies: [
      'Review brand voice consistency',
      'Suggest messaging improvements',
      'Audit recent content'
    ]
  }
];

export const conversationFlows: Record<string, Message[]> = {
  cmo: cmoAgentConversation,
  seo: seoAgentConversation,
  brand: brandAgentConversation
};
