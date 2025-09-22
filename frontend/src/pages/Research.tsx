import React, { useState } from 'react';
import { Search, Send, FileText, Globe, Clock, CheckCircle } from 'lucide-react';
import { useResearch } from '../context/ResearchContext';
import { useBilling } from '../context/BillingContext';
import { useDocuments } from '../context/DocumentContext';
import { apiService, SearchResult } from '../services/api';

const Research: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchProgress, setSearchProgress] = useState<string>('');
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | ''>('');
  const { addReport } = useResearch();
  const { useCredits } = useBilling();
  const { documents } = useDocuments();

  const handleSearch = async () => {
    if (!query.trim() || isSearching) return;

    setIsSearching(true);
    setSearchResults([]);
    setSearchProgress('Analyzing your research question...');
    useCredits(5); // Deduct credits for search

    try {
      // Get processed document IDs
      let processedDocs: number[] = [];
      if (selectedDocumentId !== '') {
        processedDocs = [selectedDocumentId as number];
      } else {
        processedDocs = documents
          .filter(doc => doc.status === 'processed' && doc.content)
          .map(doc => doc.content!.id);
      }

      setSearchProgress('Searching uploaded documents...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSearchProgress('Querying live data sources...');
      await new Promise(resolve => setTimeout(resolve, 800));

      setSearchProgress('Synthesizing results and generating citations...');
    
      // Perform dynamic search using API service
      const results = await apiService.searchDocuments(query, processedDocs);

      setSearchResults(results);
      setIsSearching(false);
      setSearchProgress('');
    } catch (error) {
      console.error('Search failed:', error);
      setIsSearching(false);
      setSearchProgress('');
      // You could add error handling UI here
    }
  };

  const generateReport = () => {
    const report = {
      id: Date.now(),
      title: `Research Report: ${query}`,
      query,
      results: searchResults,
      generatedAt: new Date(),
      status: 'completed' as const
    };
    
    addReport(report);
    useCredits(10); // Deduct credits for report generation
    
    // Reset form
    setQuery('');
    setSearchResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Document Selection */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label htmlFor="document-select" className="block text-sm font-medium text-gray-700 mb-2">Select Document for Research</label>
        <select
          id="document-select"
          value={selectedDocumentId}
          onChange={e => {
            const val = e.target.value;
            setSelectedDocumentId(val === '' ? '' : Number(val));
          }}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Processed Documents</option>
          {documents.filter(doc => doc.status === 'processed' && doc.content).map(doc => (
            <option key={doc.content!.id} value={doc.content!.id}>
              {doc.name || `Document ${doc.content!.id}`}
            </option>
          ))}
        </select>
      </div>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Research Assistant</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ask complex research questions and get comprehensive, cited reports from your documents and live data sources.
        </p>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="space-y-6">
          <div className="relative">
            <div className="flex">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your research question... (e.g., 'What are the latest trends in AI adoption across healthcare industries?')"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none min-h-[120px] text-lg"
                  rows={4}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={!query.trim() || isSearching}
                className="ml-4 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-medium transition-all"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Researching...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Research
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Data Sources Info */}
          <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                <span>{documents.length} Documents</span>
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-green-600" />
                <span>Live Data Sources</span>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Cost: 5 credits per search + 10 credits per report
            </div>
          </div>
        </div>
      </div>

      {/* Search Progress */}
      {isSearching && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="flex items-center text-blue-600">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              <span className="font-medium">Analyzing your research question...</span>
            </div>
            <div className="space-y-2 ml-8">
              <div className="flex items-center text-gray-600">
                {searchProgress.includes('Analyzing') ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                )}
                <span className="text-sm">Searching uploaded documents</span>
              </div>
              <div className="flex items-center text-gray-600">
                {searchProgress.includes('Querying') ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                ) : searchProgress.includes('Synthesizing') || searchProgress.includes('Analyzing') ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                )}
                <span className="text-sm">Querying live data sources</span>
              </div>
              <div className="flex items-center text-gray-400">
                {searchProgress.includes('Synthesizing') ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                ) : (
                  <Clock className="h-4 w-4 mr-2" />
                )}
                <span className="text-sm">Synthesizing results and generating citations</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Research Results ({searchResults.length})
            </h2>
            <button
              onClick={generateReport}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              Generate Report
            </button>
          </div>

          <div className="space-y-4">
            {searchResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {result.type === 'document' ? (
                        <FileText className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Globe className="h-4 w-4 text-green-600" />
                      )}
                      <span className="text-sm font-medium text-gray-500">{result.source}</span>
                      <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                        <span className="text-xs font-medium text-blue-700">
                          {Math.round(result.relevance * 100)}% relevance
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{result.title}</h3>
                    <p className="text-gray-600 mb-3">{result.snippet}</p>
                    <div className="flex flex-wrap gap-2">
                      {result.citations.map((citation: string, index: number) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded">
                          {result.pageNumber && (
                            <span className="mr-1 text-blue-600">p.{result.pageNumber}</span>
                          )}
                          {citation}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!isSearching && query && searchResults.length === 0 && (
        <div className="text-center py-8">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">Try uploading relevant documents or adjusting your search query.</p>
        </div>
      )}
    </div>
  );
};

export default Research;