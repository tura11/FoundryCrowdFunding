'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { Rocket, Plus, TrendingUp, Clock, Target, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const { campaignCount } = useCrowdFunding();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const campaignIds = campaignCount 
    ? Array.from({ length: Number(campaignCount) }, (_, i) => i)
    : [];

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      
      {/* Header */}
      <div className="border-b border-white/20 backdrop-blur-sm bg-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Rocket className="w-10 h-10 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">
                  🚀 CrowdFunding DApp
                </h1>
                <p className="text-white/80 text-sm">
                  Total Campaigns: {campaignCount?.toString() || '0'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isConnected && (
                <Link
                  href="/create"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Create Campaign
                </Link>
              )}
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        
        {/* Empty State */}
        {campaignIds.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-12 max-w-2xl mx-auto">
              <Rocket className="w-20 h-20 text-purple-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                No Campaigns Yet
              </h2>
              <p className="text-gray-600 mb-8">
                Be the first to create a crowdfunding campaign!
              </p>
              
              {/* Fixed: Always show button/message, just change content */}
              <div className="min-h-[60px] flex items-center justify-center">
                {isConnected ? (
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Create First Campaign
                  </Link>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-500 mb-4">Connect your wallet to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Campaign Grid */}
        {campaignIds.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">
              🔥 Active Campaigns
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaignIds.map((id) => (
                <CampaignCard key={id} campaignId={id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CampaignCard({ campaignId }: { campaignId: number }) {
  const { useCampaign } = useCrowdFunding();
  const { data: campaign, isLoading } = useCampaign(campaignId);

  if (isLoading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!campaign) return null;

  // Safe data extraction with fallbacks
  const campaignData = campaign as any;
  const title = campaignData.title || campaignData[0] || 'Untitled Campaign';
  const goal = campaignData.goal || campaignData[1] || BigInt(0);
  const raised = campaignData.raised || campaignData[2] || BigInt(0);
  const duration = campaignData.duration || campaignData[3] || BigInt(0);
  const description = campaignData.description || campaignData[4] || 'No description available';
  const creator = campaignData.creator || campaignData[5] || '0x0000000000000000000000000000000000000000';
  const state = campaignData.state !== undefined ? campaignData.state : (campaignData[6] !== undefined ? campaignData[6] : 0);
  
  // Validate data before formatting
  if (!goal || !raised || !duration || !creator) {
    console.error('Invalid campaign data:', campaignData);
    return null;
  }
  
  const progress = Number(raised) > 0 ? (Number(raised) / Number(goal)) * 100 : 0;
  const goalFormatted = formatUnits(goal, 6);
  const raisedFormatted = formatUnits(raised, 6);
  
  const durationDate = new Date(Number(duration) * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((durationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isActive = now < durationDate;

  const stateText = state === 0 ? 'Active' : state === 1 ? 'Successful' : 'Failed';
  const stateColor = state === 0 ? 'bg-green-500' : state === 1 ? 'bg-blue-500' : 'bg-red-500';

  return (
    <Link href={`/campaign/${campaignId}`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer overflow-hidden group">
        
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
              {title}
            </h3>
            <span className={`${stateColor} text-white text-xs px-3 py-1 rounded-full font-semibold`}>
              {stateText}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {description}
          </p>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-4 h-4" />
            <span className="font-mono">{creator.slice(0, 6)}...{creator.slice(-4)}</span>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-gray-700">{raisedFormatted} USDC</span>
              <span className="text-gray-500">{goalFormatted} USDC</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              {progress.toFixed(1)}% funded
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-xs text-gray-500">Time left</p>
                <p className="font-semibold text-sm">
                  {isActive ? `${daysLeft} days` : 'Ended'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-700">
              <Target className="w-4 h-4 text-pink-500" />
              <div>
                <p className="text-xs text-gray-500">Goal</p>
                <p className="font-semibold text-sm">{goalFormatted} USDC</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-purple-600 font-semibold group-hover:text-purple-700 flex items-center gap-2">
            View Details
            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}