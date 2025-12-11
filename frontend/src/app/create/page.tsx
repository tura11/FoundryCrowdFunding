'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

export default function CreateCampaign() {
  const router = useRouter();
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
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [isConfirmed, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Connect your wallet first!');
      return;
    }

    try {
      const defaultTiers = [
        {
          name: 'Bronze Supporter',
          description: 'Basic supporter tier',
          minContribution: '10',
          maxBackers: 100
        }
      ];

      const now = Math.floor(Date.now() / 1000);
      const campaignEndTime = now + (parseInt(duration) * 24 * 60 * 60);
      
      const defaultMilestones = [
        {
          description: 'First milestone - 50%',
          percentage: 50,
          deadline: campaignEndTime + (30 * 24 * 60 * 60)
        },
        {
          description: 'Final milestone - 50%',
          percentage: 50,
          deadline: campaignEndTime + (60 * 24 * 60 * 60)
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
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      
      {/* Header */}
      <div className="border-b border-white/20 backdrop-blur-sm bg-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Campaigns</span>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Campaign
            </h1>
          </div>
          
          {!isConnected && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-800 font-medium">
                  ⚠️ Please connect your wallet to create a campaign
                </p>
              </div>
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
                rows={5}
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
                ℹ️ <strong>Default Configuration:</strong>
                <br />• Bronze tier (10 USDC minimum, max 100 backers)
                <br />• 2 milestones (50% each, 30 and 60 days after campaign ends)
                <br />• 3% platform fee on successful campaigns
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-600 text-sm font-medium">
                    ❌ Error: {error.message}
                  </p>
                </div>
              </div>
            )}

            {/* Success */}
            {isConfirmed && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-600 text-sm font-medium">
                    ✅ Campaign created successfully! Redirecting...
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isConnected || isPending || isConfirming}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
            >
              {isPending && '⏳ Preparing transaction...'}
              {isConfirming && '⏳ Confirming on blockchain...'}
              {!isPending && !isConfirming && !isConnected && '🔒 Connect Wallet First'}
              {!isPending && !isConfirming && isConnected && (
                <>
                  <Sparkles className="w-5 h-5" />
                  Create Campaign
                </>
              )}
            </button>
          </form>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 bg-gray-800 rounded-xl p-4 text-white text-xs font-mono">
            <p><strong>Debug Info:</strong></p>
            <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
            <p>Address: {address || 'N/A'}</p>
            <p>Campaign Count: {campaignCount?.toString() || 'Loading...'}</p>
          </div>
        )}

      </div>
    </div>
  );
}