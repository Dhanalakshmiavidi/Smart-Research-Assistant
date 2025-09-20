import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Research from './pages/Research';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Billing from './pages/Billing';
import { DocumentProvider } from './context/DocumentContext';
import { ResearchProvider } from './context/ResearchContext';
import { BillingProvider } from './context/BillingContext';

function App() {
  return (
    <BillingProvider>
      <DocumentProvider>
        <ResearchProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/research" element={<Research />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/billing" element={<Billing />} />
              </Routes>
            </Layout>
          </Router>
        </ResearchProvider>
      </DocumentProvider>
    </BillingProvider>
  );
}

export default App;