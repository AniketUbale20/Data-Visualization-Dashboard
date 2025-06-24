import React from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { DataRow } from '../types';

interface FileUploadProps {
  onDataLoaded: (data: DataRow[]) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          onDataLoaded(results.data as DataRow[]);
        },
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 dark:border-gray-600 dark:hover:border-blue-400"
      >
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Upload CSV file
          </span>
        </div>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};