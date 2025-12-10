'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected, address } = useAccount();
  const { 
    campaignCount,
    createCampaign,
    isPending,
    isConfirming,
    isConfirmed,
    error 
  } = useCrowdFunding();


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('30');


  useEffect(() => {
    if (isConfirmed) {
      setTitle('');
      setDescription('');
      setGoal('');
      setDuration('30');
      alert('✅ Campaign created successfully!');
    }
  }, [isConfirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Connect your wallet first!');
      return;
    }

    try {

      const defaultTiers = [
        {
          name: 'Bronze',
          description: 'Basic supporter',
          minContribution: '10', // 10 USDC
          maxBackers: 100
        }
      ];

      const now = Math.floor(Date.now() / 1000);
      const campaignEndTime = now + (parseInt(duration) * 24 * 60 * 60);
      
      const defaultMilestones = [
        {
          description: 'First milestone',
          percentage: 50,
          deadline: campaignEndTime + (30 * 24 * 60 * 60) // 30 dni po końcu
        },
        {
          description: 'Final milestone',
          percentage: 50,
          deadline: campaignEndTime + (60 * 24 * 60 * 60) // 60 dni po końcu
        }
      ];

      await createCampaign(
        title,
        goal,
        description,
        parseInt(duration),
        defaultTiers,
        defaultMilestones
      );
    } catch (err: any) {
      console.error('Error creating campaign:', err);
      alert('Error: ' + (err?.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">
              🚀 CrowdFunding DApp
            </h1>
            <p className="text-white/80 text-lg">
              Total Campaigns: {campaignCount?.toString() || '0'}
            </p>
            {isConnected && (
              <p className="text-white/60 text-sm mt-1">
                Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
            )}
          </div>
          <ConnectButton />
        </div>

        {/* Create Campaign Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            ✨ Create New Campaign
          </h2>
          
          {!isConnected && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
              <p className="text-yellow-800 font-medium">
                ⚠️ Please connect your wallet to create a campaign
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campaign Title *
              </label>
              <input
                type="text"
                placeholder="My Awesome Project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900 transition-colors"
                required
                disabled={isPending || isConfirming}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {title.length}/200 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                placeholder="Tell people about your project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none text-gray-900 transition-colors"
                rows={4}
                required
                disabled={isPending || isConfirming}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length}/200 characters
              </p>
            </div>

            {/* Goal & Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Goal (USDC) *
                </label>
                <input
                  type="number"
                  placeholder="1000"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900 transition-colors"
                  required
                  min="100"
                  step="0.01"
                  disabled={isPending || isConfirming}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: 100 USDC
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration (days) *
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900 transition-colors"
                  required
                  min="1"
                  max="365"
                  disabled={isPending || isConfirming}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Max: 365 days
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-blue-800 text-sm">
                ℹ️ <strong>Note:</strong> This will create a campaign with default Bronze tier (10 USDC min) 
                and 2 milestones (50% each). You can customize tiers later.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-600 text-sm font-medium">
                  ❌ Error: {error.message}
                </p>
              </div>
            )}

            {/* Success */}
            {isConfirmed && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <p className="text-green-600 text-sm font-medium">
                  ✅ Campaign created successfully!
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isConnected || isPending || isConfirming}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {isPending && '⏳ Preparing transaction...'}
              {isConfirming && '⏳ Confirming on blockchain...'}
              {!isPending && !isConfirming && !isConnected && '🔒 Connect Wallet First'}
              {!isPending && !isConfirming && isConnected && '🚀 Create Campaign'}
            </button>
          </form>
        </div>

        {/* Debug Info (tylko dla development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-800 rounded-xl p-4 text-white text-xs font-mono">
            <p><strong>Debug Info:</strong></p>
            <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
            <p>Address: {address || 'N/A'}</p>
            <p>Campaign Count: {campaignCount?.toString() || 'Loading...'}</p>
            <p>Contract: {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}</p>
            <p>USDC: {process.env.NEXT_PUBLIC_USDC_ADDRESS}</p>
          </div>
        )}

      </div>
    </div>
  );
}