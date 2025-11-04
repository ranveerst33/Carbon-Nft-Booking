import React from 'react';
import type { NftData } from '../types';
import { NftDisplay } from './NftDisplay';

interface MyNftsProps {
  nfts: NftData[];
  onViewDetails: (nftData: NftData) => void;
}

export const MyNfts: React.FC<MyNftsProps> = ({ nfts, onViewDetails }) => {
  return (
    <section className="mt-16 md:mt-24">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-emerald-400">My NFT Dashboard</h2>
        <p className="text-slate-400 mt-1">A collection of your unique environmental contributions.</p>
      </div>
      {nfts.length === 0 ? (
        <div className="text-center bg-slate-800/50 border border-slate-700 rounded-lg py-12 px-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-4 text-slate-400">You haven't minted any NFTs yet.</p>
          <p className="text-sm text-slate-500">Create one above to start your collection!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {nfts.map((nft) => (
            <NftDisplay key={nft.timestamp} nftData={nft} onViewDetails={onViewDetails} />
          ))}
        </div>
      )}
    </section>
  );
};