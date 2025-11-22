export interface Channel {
  id: string;
  name: string;
  status: 'Hot' | 'Warm' | 'Cold';
  opportunityScore: number; // 0-100
  activeOpportunities: number;
  estimatedValue: string;
  lastActivity: string;
  category: string;
  description: string;
}
