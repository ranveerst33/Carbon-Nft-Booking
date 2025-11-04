import React, { useState } from 'react';
import type { BookingData } from '../types';

interface BookingFormProps {
  onSubmit: (data: BookingData) => void;
  isLoading: boolean;
  walletConnected: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, isLoading, walletConnected }) => {
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [co2Tons, setCo2Tons] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!walletConnected) {
      setError('Please connect your wallet first.');
      return;
    }
    if (!projectName || !location || co2Tons === '' || co2Tons <= 0) {
      setError('All fields are required and CO2 tons must be positive.');
      return;
    }
    setError('');
    onSubmit({ projectName, location, co2Tons: Number(co2Tons) });
  };

  const isDisabled = isLoading || !walletConnected;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!walletConnected && (
        <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-md text-sm" role="alert">
          Please connect your wallet to enable NFT generation.
        </div>
      )}
      <div>
        <label htmlFor="projectName" className="block text-sm font-medium text-slate-300 mb-2">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g., Amazon Reforestation Initiative"
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200 disabled:opacity-50"
          disabled={isDisabled}
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Brazil"
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200 disabled:opacity-50"
          disabled={isDisabled}
        />
      </div>
      <div>
        <label htmlFor="co2Tons" className="block text-sm font-medium text-slate-300 mb-2">
          CO₂ Tons Offset
        </label>
        <input
          type="number"
          id="co2Tons"
          value={co2Tons}
          onChange={(e) => setCo2Tons(e.target.value === '' ? '' : Number(e.target.value))}
          placeholder="e.g., 10"
          min="0.1"
          step="0.1"
          className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200 disabled:opacity-50"
          disabled={isDisabled}
        />
      </div>
      
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="pt-2">
        <button
          type="submit"
          disabled={isDisabled}
          className="w-full flex justify-center items-center bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:transform-none"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate NFT Preview'
          )}
        </button>
      </div>
    </form>
  );
};