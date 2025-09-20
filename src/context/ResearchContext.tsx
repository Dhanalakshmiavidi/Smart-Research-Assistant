import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ResearchResult {
  id: number;
  title: string;
  snippet: string;
  source: string;
  type: 'document' | 'live';
  relevance: number;
  citations: string[];
}

interface Report {
  id: number;
  title: string;
  query: string;
  results: ResearchResult[];
  generatedAt: Date;
  status: 'completed' | 'processing';
}

interface ResearchContextType {
  reports: Report[];
  addReport: (report: Report) => void;
}

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Market Analysis Report: AI Technology Trends',
      query: 'What are the current trends in AI technology adoption across industries?',
      results: [
        {
          id: 1,
          title: 'AI Adoption in Healthcare',
          snippet: 'Healthcare sector shows 67% increase in AI implementation...',
          source: 'Healthcare Innovation Journal',
          type: 'live',
          relevance: 0.92,
          citations: ['healthcare_ai_study.pdf']
        },
        {
          id: 2,
          title: 'Financial Services AI Integration',
          snippet: 'Banks and financial institutions are leveraging AI for fraud detection...',
          source: 'Financial Technology Report',
          type: 'document',
          relevance: 0.88,
          citations: ['fintech_analysis.docx']
        }
      ],
      generatedAt: new Date(Date.now() - 3600000),
      status: 'completed'
    },
    {
      id: 2,
      title: 'Competitive Analysis: SaaS Market Landscape',
      query: 'Analyze the competitive landscape for SaaS companies in 2024',
      results: [
        {
          id: 3,
          title: 'SaaS Market Growth Patterns',
          snippet: 'The SaaS market is projected to reach $623 billion by 2025...',
          source: 'Market Research Database',
          type: 'live',
          relevance: 0.94,
          citations: ['saas_market_report.pdf']
        }
      ],
      generatedAt: new Date(Date.now() - 7200000),
      status: 'completed'
    }
  ]);

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  return (
    <ResearchContext.Provider value={{ reports, addReport }}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (context === undefined) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};