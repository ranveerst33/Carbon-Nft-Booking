import React from 'react';
import type { NftData } from '../types';

interface NftDisplayProps {
  nftData: NftData;
  isPreview?: boolean;
  isMinting?: boolean;
  onMint?: () => void;
  onViewDetails?: (nftData: NftData) => void;
}

const DESCRIPTION_TRUNCATE_LENGTH = 120;

export const NftDisplay: React.FC<NftDisplayProps> = ({ nftData, isPreview = false, isMinting = false, onMint, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-fade-in">
      <div className="bg-slate-900 rounded-xl shadow-lg shadow-emerald-500/10 overflow-hidden border border-slate-700 group">
        <div className="aspect-square overflow-hidden">
          <img 
            src={nftData.imageUrl} 
            alt="Generated Carbon NFT" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-white truncate">{nftData.projectName}</h3>
          <p className="text-sm text-slate-400 mt-1 truncate">{nftData.location}</p>
          <p className="text-xs text-slate-500 mt-2">{formatDate(nftData.timestamp)}</p>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">{nftData.description}</p>
            {nftData.description.length > DESCRIPTION_TRUNCATE_LENGTH && onViewDetails && (
              <button 
                onClick={() => onViewDetails(nftData)} 
                className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold mt-2 transition-colors duration-200"
              >
                Read More...
              </button>
            )}
            <div className="mt-4 flex justify-between items-center bg-slate-800/50 p-3 rounded-md">
              <span className="text-xs font-medium text-slate-400">CO₂ Offset</span>
              <span className="text-lg font-bold text-emerald-400">{nftData.co2Tons} Tons</span>
            </div>
          </div>

          {isPreview && onMint && (
            <div className="mt-5">
              <button
                onClick={onMint}
                disabled={isMinting}
                className="w-full flex justify-center items-center bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              >
                {isMinting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Minting...
                  </>
                ) : 'Mint NFT'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};