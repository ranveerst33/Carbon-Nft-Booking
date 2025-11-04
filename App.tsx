// Fix: Add type definition for window.ethereum to solve TypeScript errors on lines 47 and 49.
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
  }
}

import React, { useState, useEffect } from 'react';
import { BookingForm } from './components/BookingForm';
import { Header } from './components/Header';
import { NftDisplay } from './components/NftDisplay';
import { Loader } from './components/Loader';
import { MyNfts } from './components/MyNfts';
import { SuccessModal } from './components/SuccessModal';
import { LoginModal } from './components/LoginModal';
import { NftDetailModal } from './components/NftDetailModal';
import type { BookingData, NftData } from './types';
import { generateCarbonNft } from './services/geminiService';

/**
 * Creates a deterministic, simulated wallet address from a username.
 * This allows users to "log back in" to the same simulated account.
 * @param username The username provided by the user.
 * @returns A 42-character hex-like string to be used as a wallet address.
 */
const createDummyAddress = (username: string): string => {
  const sanitized = username.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const base = `0xsim_${sanitized}`;
  // Pad the string to resemble a real address length for UI consistency
  return base.padEnd(42, '0');
};


const App: React.FC = () => {
  const [nftData, setNftData] = useState<NftData | null>(null);
  const [allMintedNfts, setAllMintedNfts] = useState<Record<string, NftData[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [formKey, setFormKey] = useState(0); // Key to force re-mounting of the form
  const [selectedNft, setSelectedNft] = useState<NftData | null>(null); // State for the detail modal

  // Load data from local storage on initial render
  useEffect(() => {
    try {
      const connectedWallet = localStorage.getItem('connectedWallet');
      if (connectedWallet) {
        setWalletAddress(connectedWallet);
      }
      
      const storedNfts = localStorage.getItem('allMintedNfts');
      if (storedNfts) {
        setAllMintedNfts(JSON.parse(storedNfts));
      }
    } catch (e) {
      console.error("Failed to parse data from localStorage", e);
    }
  }, []);

  // Save all minted NFTs to local storage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem('allMintedNfts', JSON.stringify(allMintedNfts));
    } catch (e) {
      console.error("Failed to save NFTs to localStorage", e);
    }
  }, [allMintedNfts]);

  const handleConnectWallet = () => {
    // Instead of using prompt, we now open our custom modal
    setIsLoginModalOpen(true);
  };
  
  const handleLogin = (username: string) => {
    // This logic is now triggered by the modal submission
    if (username) {
        try {
            const dummyAddress = createDummyAddress(username);
            setWalletAddress(dummyAddress);
            localStorage.setItem('connectedWallet', dummyAddress);
            setError(null);
            setIsLoginModalOpen(false); // Close the modal on successful login
        } catch (err) {
            console.error("Error in simulated wallet connection", err);
            setError("Failed to simulate wallet connection.");
        }
    }
  };

  const handleLogout = () => {
    setWalletAddress(null);
    setNftData(null); // Clear any pending NFT preview
    localStorage.removeItem('connectedWallet');
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    setIsLoading(true);
    setError(null);
    setNftData(null);

    try {
      const result = await generateCarbonNft(bookingData);
      setNftData({
        ...result,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMintNft = async () => {
    if (!nftData || !walletAddress) return;

    setIsMinting(true);
    setError(null);

    try {
      // Simulate a 2-second minting delay for the college project
      await new Promise(resolve => setTimeout(resolve, 2000));

      // On successful simulation, add the NFT to the user's collection
      setAllMintedNfts(prevAllNfts => {
        const userNfts = prevAllNfts[walletAddress] || [];
        return {
          ...prevAllNfts,
          [walletAddress]: [nftData, ...userNfts]
        };
      });
      
      setNftData(null); // Clear the preview
      setShowSuccessModal(true);
      setFormKey(prevKey => prevKey + 1); // Reset the form by changing its key

    } catch (err: any) {
      console.error("Minting simulation failed:", err);
      setError("An error occurred during the simulation. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };
  
  const handleViewDetails = (nft: NftData) => {
    setSelectedNft(nft);
  };

  const userNfts = walletAddress ? allMintedNfts[walletAddress] || [] : [];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans antialiased">
      <Header onConnect={handleConnectWallet} onLogout={handleLogout} walletAddress={walletAddress} />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">Create & Mint Your Carbon NFT</h2>
            <p className="text-slate-400 mb-6">Enter your carbon offset details to generate a unique digital collectible. Once generated, you can mint it to the blockchain.</p>
            <BookingForm 
              key={formKey} 
              onSubmit={handleBookingSubmit} 
              isLoading={isLoading} 
              walletConnected={!!walletAddress} 
            />
          </div>

          <div className="w-full flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            {isLoading && <Loader />}
            {error && !isLoading && !isMinting && <p className="text-red-400 text-center">{error}</p>}
            {nftData && !isLoading && (
              <>
                <NftDisplay 
                  nftData={nftData} 
                  isPreview={true}
                  isMinting={isMinting}
                  onMint={handleMintNft}
                  onViewDetails={handleViewDetails}
                />
                {error && isMinting && <p className="text-red-400 text-center mt-4">{error}</p>}
              </>
            )}
            {!isLoading && !error && !nftData && (
              <div className="text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4">Your generated NFT preview will appear here.</p>
              </div>
            )}
          </div>
        </div>

        {walletAddress && (
          <MyNfts nfts={userNfts} onViewDetails={handleViewDetails} />
        )}

      </main>
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      <NftDetailModal nft={selectedNft} onClose={() => setSelectedNft(null)} />
    </div>
  );
};

export default App;