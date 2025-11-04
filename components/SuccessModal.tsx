import React, { Fragment } from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-slate-800 border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-900/50 w-full max-w-md m-4 text-center p-8 transform transition-all animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto text-emerald-400">
            <CheckCircleIcon className="w-20 h-20 mx-auto animate-pulse-slow" />
        </div>
        <h2 className="text-2xl font-bold text-white mt-6">Mint Successful!</h2>
        <p className="text-slate-400 mt-2">Your Carbon NFT has been successfully minted and added to your collection.</p>
        <button 
          onClick={onClose}
          className="mt-8 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-md transition duration-300"
        >
          View My Collection
        </button>
      </div>
      <style>{`
        @keyframes fade-in-fast {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.3s ease-out forwards; }

        @keyframes pop-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-pop-in { animation: pop-in 0.4s ease-out forwards 0.1s; }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-pulse-slow { animation: pulse-slow 2.5s infinite; }
      `}</style>
    </div>
  );
};
