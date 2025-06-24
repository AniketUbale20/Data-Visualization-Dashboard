import React, { useState, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { DataTable } from './components/DataTable';
import { Charts } from './components/Charts';
import { ThemeToggle } from './components/ThemeToggle';
import { DataRow } from './types';
import { BarChart3 } from 'lucide-react';

function App() {
  const [data, setData] = useState<DataRow[]>([]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleDataLoaded = (newData: DataRow[]) => {
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Data Visualization Dashboard
            </h1>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        {data.length === 0 ? (
          <div className="mb-8">
            <FileUpload onDataLoaded={handleDataLoaded} />
          </div>
        ) : (
          <div className="space-y-8">
            <DataTable data={data} />
            <Charts data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;