import React, { useState, useEffect, useRef } from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { WalletIcon } from './icons/WalletIcon';
import { LogoutIcon } from './icons/LogoutIcon';

interface HeaderProps {
  onConnect: () => void;
  onLogout: () => void;
  walletAddress: string | null;
}

export const Header: React.FC<HeaderProps> = ({ onConnect, onLogout, walletAddress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getShortAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-slate-900/60 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <LeafIcon className="h-8 w-8 text-emerald-400" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Carbon NFT Booking
          </h1>
        </div>
        <div className="relative" ref={menuRef}>
          {!walletAddress ? (
            <button
              onClick={onConnect}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              <WalletIcon className="h-5 w-5 text-emerald-400" />
              <span>Connect Wallet</span>
            </button>
          ) : (
            <div>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                <WalletIcon className="h-5 w-5 text-emerald-400" />
                <span className="hidden md:inline">Welcome, </span>
                <span>{getShortAddress(walletAddress)}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-md shadow-lg py-1 z-30 animate-fade-in-fast">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    <LogoutIcon className="h-5 w-5 mr-3 text-red-400"/>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-fast {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
      `}</style>
    </header>
  );
};