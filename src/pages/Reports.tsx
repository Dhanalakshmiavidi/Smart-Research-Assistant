import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Share2, 
  Eye, 
  Calendar,
  Clock,
  FileText,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useResearch } from '../context/ResearchContext';

const Reports: React.FC = () => {
  const { reports } = useResearch();
  const [expandedReport, setExpandedReport] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.query.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReport = (reportId: number) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  const generateMockContent = (report: any) => {
    return {
      executiveSummary: `This comprehensive research report addresses the question: "${report.query}". Based on analysis of multiple sources, including uploaded documents and live data feeds, we have identified key trends and insights that provide a thorough understanding of the topic.`,
      keyFindings: [
        "Market growth is accelerating at 23% annually across all sectors",
        "Technology adoption varies significantly by geographic region",
        "Regulatory frameworks are evolving to address emerging challenges",
        "Consumer behavior patterns show increased preference for digital solutions"
      ],
      detailedAnalysis: `The research reveals significant developments in the field, with particular emphasis on emerging trends and their potential impact. Data from multiple sources indicates a clear trajectory toward increased integration and adoption of new methodologies.

Key stakeholders are adapting their strategies to align with these developments, suggesting a fundamental shift in how the industry approaches these challenges. The analysis of uploaded documents reveals historical context that supports current trends, while live data sources provide real-time validation of projected outcomes.`,
      recommendations: [
        "Implement immediate strategic adjustments to capitalize on market opportunities",
        "Develop comprehensive training programs to address skill gaps",
        "Establish partnerships with key technology providers",
        "Monitor regulatory developments and prepare compliance strategies"
      ],
      methodology: "This report was generated using advanced AI analysis of multiple data sources, including uploaded research documents, industry reports, and real-time data feeds. The system employed semantic search and natural language processing to identify relevant information and synthesize insights.",
      limitations: "While this analysis provides comprehensive insights based on available data, readers should consider that market conditions are dynamic and may change rapidly. Additional primary research may be needed for specific implementation decisions."
    };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Reports</h1>
        <p className="text-lg text-gray-600">
          View and manage your AI-generated research reports with comprehensive citations
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
          <p className="text-gray-600">
            {reports.length === 0 
              ? "Generate your first research report to see it here."
              : "Try adjusting your search terms."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReports.map((report) => {
            const mockContent = generateMockContent(report);
            const isExpanded = expandedReport === report.id;
            
            return (
              <div key={report.id} className="bg-white rounded-lg border border-gray-200">
                {/* Report Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-gray-600 mb-4">{report.query}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {report.generatedAt.toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {report.generatedAt.toLocaleTimeString()}
                        </div>
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {report.results.length} sources
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => toggleReport(report.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Report Content */}
                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="max-w-4xl space-y-8">
                      {/* Executive Summary */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Executive Summary</h4>
                        <p className="text-gray-700 leading-relaxed">{mockContent.executiveSummary}</p>
                      </div>

                      {/* Key Findings */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Findings</h4>
                        <ul className="space-y-2">
                          {mockContent.keyFindings.map((finding, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-gray-700">{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Detailed Analysis */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Detailed Analysis</h4>
                        <div className="text-gray-700 leading-relaxed space-y-4">
                          {mockContent.detailedAnalysis.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>

                      {/* Sources and Citations */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Sources and Citations</h4>
                        <div className="space-y-3">
                          {report.results.map((result, index) => (
                            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900 mb-1">{result.title}</h5>
                                  <p className="text-sm text-gray-600 mb-2">{result.snippet}</p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span className="mr-4">Source: {result.source}</span>
                                    <span>Relevance: {Math.round(result.relevance * 100)}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Recommendations</h4>
                        <div className="space-y-3">
                          {mockContent.recommendations.map((rec, index) => (
                            <div key={index} className="bg-blue-50 rounded-lg p-4">
                              <div className="flex items-start">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700">{rec}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Methodology */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Methodology</h4>
                        <p className="text-gray-700 leading-relaxed">{mockContent.methodology}</p>
                      </div>

                      {/* Limitations */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Limitations</h4>
                        <p className="text-gray-700 leading-relaxed">{mockContent.limitations}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reports;