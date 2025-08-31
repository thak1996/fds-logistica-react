import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/home/HomePage';
import ContactPage from './pages/contact/ContactPage';
import CompanyPage from './pages/company/CompanyPage';
import ServicePage from './pages/service/ServicePage';
import QuotePage from './pages/quote/QuotePage';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="company" element={<CompanyPage />} />
            <Route path="service" element={<ServicePage />} />
            <Route path="quote" element={<QuotePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
