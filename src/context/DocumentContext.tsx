import React, { createContext, useContext, useState, ReactNode } from 'react';
import { apiService, DocumentContent } from '../services/api';

interface Document {
  id: number;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  status: 'processing' | 'processed';
  pages: number;
  content?: DocumentContent;
}

interface DocumentContextType {
  documents: Document[];
  uploadDocument: (file: File) => void;
  deleteDocument: (id: number) => void;
  getDocumentContent: (id: number) => DocumentContent | undefined;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      name: 'AI_Market_Research_2024.pdf',
      type: 'application/pdf',
      size: 2048576,
      uploadedAt: new Date(Date.now() - 86400000),
      status: 'processed',
      pages: 45
    },
    {
      id: 2,
      name: 'Healthcare_Innovation_Study.docx',
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 1536000,
      uploadedAt: new Date(Date.now() - 172800000),
      status: 'processed',
      pages: 28
    },
    {
      id: 3,
      name: 'Industry_Analysis_Q1.csv',
      type: 'text/csv',
      size: 512000,
      uploadedAt: new Date(Date.now() - 259200000),
      status: 'processed',
      pages: 12
    }
  ]);

  const uploadDocument = (file: File) => {
    const newDocument: Document = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      status: 'processing',
      pages: Math.floor(Math.random() * 50) + 10
    };

    setDocuments(prev => [...prev, newDocument]);

    // Process document with API service
    apiService.processDocument(file).then(content => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDocument.id 
            ? { 
                ...doc, 
                status: 'processed' as const,
                pages: content.metadata.pages,
                content
              }
            : doc
        )
      );
    }).catch(error => {
      console.error('Document processing failed:', error);
      // Remove failed document
      setDocuments(prev => prev.filter(doc => doc.id !== newDocument.id));
    });
  };

  const deleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getDocumentContent = (id: number): DocumentContent | undefined => {
    return apiService.getDocumentContent(id);
  };
  return (
    <DocumentContext.Provider value={{ documents, uploadDocument, deleteDocument, getDocumentContent }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};