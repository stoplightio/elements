import { DevPortalProvider } from '@stoplight/elements-dev-portal';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { StoplightAPI } from './components/API';
import { Navigation } from './components/Navigation';
import { NotFound } from './components/NotFound';
import { StoplightProjectDocs } from './components/StoplightProject';

export default function App() {
  return (
    <DevPortalProvider>
      <BrowserRouter>
        <div className="app-container">
          <header>
            <Navigation />
          </header>
          <main className="main-content">
            <Routes>
              <Route path="/zoom-api/*" element={<StoplightAPI />} />
              <Route path="/stoplight-project/*" element={<StoplightProjectDocs />} />
              <Route path="/" element={<Navigate to="stoplight-project" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </DevPortalProvider>
  );
}
