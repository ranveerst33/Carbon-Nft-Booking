import React from 'react';
import type { NftData } from '../types';

interface NftDetailModalProps {
  nft: NftData | null;
  onClose: () => void;
}

export const NftDetailModal: React.FC<NftDetailModalProps> = ({ nft, onClose }) => {
  if (!nft) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg m-4 transform transition-all animate-pop-in flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 flex-shrink-0">
            <img 
                src={nft.imageUrl} 
                alt={nft.projectName}
                className="w-full aspect-square object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            />
        </div>
        <div className="p-6 flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-white">{nft.projectName}</h2>
            <p className="text-md text-slate-400 mt-1">{nft.location}</p>
            <p className="text-xs text-slate-500 mt-2">Minted on: {formatDate(nft.timestamp)}</p>

            <div className="my-4 flex justify-between items-center bg-slate-900/70 p-3 rounded-md border border-slate-700">
              <span className="text-sm font-medium text-slate-400">CO₂ Offset</span>
              <span className="text-xl font-bold text-emerald-400">{nft.co2Tons} Tons</span>
            </div>

            <h3 className="text-sm font-semibold text-emerald-400 tracking-wider uppercase mt-6 mb-2">Description</h3>
            <p className="text-slate-300 leading-relaxed text-base whitespace-pre-wrap">{nft.description}</p>
          </div>
          <div className="mt-6 flex-shrink-0">
             <button
              onClick={onClose}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out forwards; }
        @keyframes pop-in { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-pop-in { animation: pop-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};