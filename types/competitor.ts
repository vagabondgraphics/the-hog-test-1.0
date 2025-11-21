export interface Activity {
  id: string;
  type: 'Blog Post' | 'Product Launch' | 'Video Tutorial' | 'Webinar' | 'E-book' | 'Case Study' | 'Infographic';
  title: string;
  summary: string;
  timestamp: string;
  impact: 'High' | 'Medium' | 'Low';
  tags: string[];
  url: string;
}

export interface Competitor {
  id: string;
  name: string;
  logo: string;
  website: string;
  keywords: string[];
  activities: Activity[];
}
