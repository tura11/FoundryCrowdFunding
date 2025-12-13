'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Target, Clock, Users, TrendingUp, 
  Coins, Award, CheckCircle, AlertCircle, Loader, Heart
} from 'lucide-react';

export default function ClientCampaignDetail({ campaignId }: { campaignId: number }) {
  const { address, isConnected } = useAccount();
  
  const { 
    useCampaign, 
    useCampaignTiers, 
    useCampaignMilestones,
    approveUSDC,
    contribute,
    isPending,
    isConfirming,
    isConfirmed,
    error
  } = useCrowdFunding();
  
  const { data: campaign, isLoading: campaignLoading } = useCampaign(campaignId);
  const { data: tiers, isLoading: tiersLoading } = useCampaignTiers(campaignId);
  const { data: milestones, isLoading: milestonesLoading } = useCampaignMilestones(campaignId);

  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(0);
  const [step, setStep] = useState<'idle' | 'approving' | 'contributing'>('idle');
  const [savedImage, setSavedImage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  useEffect(() => {
    if (isConfirmed) {
      setContributionAmount('');
      setStep('idle');
      alert('✅ Contribution successful!');
    }
  }, [isConfirmed]);

  if (campaignLoading || tiersLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <Loader className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 border border-gray-200 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Campaign not found</p>
          <Link href="/" className="text-green-600 hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { title, goal, raised, duration, description, creator, state } = campaign as any;
  
  const progress = Number(raised) > 0 ? (Number(raised) / Number(goal)) * 100 : 0;
  const goalFormatted = formatUnits(goal, 6);
  const raisedFormatted = formatUnits(raised, 6);
  
  const durationDate = new Date(Number(duration) * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((durationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isActive = now < durationDate;
  const isCreator = address?.toLowerCase() === creator.toLowerCase();

  const handleContribute = async () => {
    if (!isConnected) {
      alert('Connect wallet first!');
      return;
    }

    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      alert('Enter valid amount');
      return;
    }

    try {
      setStep('approving');
      await approveUSDC(contributionAmount);
      
      setStep('contributing');
      await contribute(campaignId, contributionAmount, selectedTier);
      
    } catch (err: any) {
      console.error('Contribution error:', err);
      setStep('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to projects
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Campaign Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Hero Image */}
            <div className="relative h-96 rounded-lg overflow-hidden bg-gradient-to-br from-green-400 to-emerald-600">
              {savedImage ? (
                <img 
                  src={savedImage} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-9xl font-bold opacity-20">
                    {title.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              {state === 1 && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ✓ Funded
                </div>
              )}
            </div>

            {/* Campaign Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {description}
              </p>

              <div className="flex items-center gap-3 text-gray-600">
                <Users className="w-5 h-5" />
                <span>
                  By{' '}
                  <span className="font-mono font-medium">{creator.slice(0, 6)}...{creator.slice(-4)}</span>
                </span>
                {isCreator && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                    YOU
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Tiers */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rewards</h2>
              
              <div className="space-y-4">
                {tiers && Array.isArray(tiers) && tiers.length > 0 ? (
                  (tiers as any[]).map((tier: any, idx: number) => {
                    const { name, desc, minContribution, maxBackers, currentBackers } = tier;
                    const minFormatted = formatUnits(minContribution, 6);
                    const spotsLeft = Number(maxBackers) - Number(currentBackers);
                    
                    return (
                      <div 
                        key={idx}
                        className="border border-gray-200 rounded-lg p-6 hover:border-green-500 hover:shadow-md transition-all bg-white"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                            <p className="text-green-600 font-bold text-xl mt-1">
                              ${Number(minFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })} or more
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{desc}</p>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>{Number(currentBackers)} backers</span>
                          {spotsLeft > 0 ? (
                            <span className="text-green-600 font-medium">{spotsLeft} left</span>
                          ) : (
                            <span className="text-red-600 font-medium">All claimed</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">No rewards available</p>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Milestones */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Milestones</h2>
              
              <div className="space-y-4">
                {milestones && Array.isArray(milestones) && milestones.length > 0 ? (
                  (milestones as any[]).map((milestone: any, idx: number) => {
                    const { desc, percentage, deadline, votesFor, votesAgainst, approved, fundsReleased } = milestone;
                    const deadlineDate = new Date(Number(deadline) * 1000);
                    
                    return (
                      <div 
                        key={idx}
                        className="border border-gray-200 rounded-lg p-6 bg-white"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-900">Milestone {idx + 1}</h3>
                            <p className="text-sm text-green-600 font-medium mt-1">
                              {percentage}% of funds
                            </p>
                          </div>
                          {fundsReleased ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                              ✓ Released
                            </span>
                          ) : approved ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                              Approved
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                              Pending
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mb-3">{desc}</p>
                        <p className="text-sm text-gray-500">
                          Deadline: {deadlineDate.toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">No milestones set</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Funding Box */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              
              {/* Funding Stats */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  pledged of ${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })} goal
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

                {/* Stats Grid */}
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{progress.toFixed(0)}%</div>
                    <div className="text-sm text-gray-600">funded</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{daysLeft}</div>
                    <div className="text-sm text-gray-600">{isActive ? 'days to go' : 'ended'}</div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mb-6"></div>

              {/* Contribute Section */}
              {!isActive && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 text-sm text-center font-medium">
                    This project has ended
                  </p>
                </div>
              )}

              {isCreator && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 text-sm font-medium">
                    ℹ️ You can't back your own project
                  </p>
                </div>
              )}

              {isActive && !isCreator && (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Pledge amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-gray-500 font-medium">$</span>
                        <input
                          type="number"
                          placeholder="25"
                          value={contributionAmount}
                          onChange={(e) => setContributionAmount(e.target.value)}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                          min="10"
                          step="1"
                          disabled={isPending || isConfirming}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Minimum: $10</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Choose your reward
                      </label>
                      <select
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
                        disabled={isPending || isConfirming}
                      >
                        {Array.isArray(tiers) && tiers.map((tier: any, idx: number) => (
                          <option key={idx} value={idx}>
                            {tier.name} - ${formatUnits(tier.minContribution, 6)}+
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Error</p>
                        <p className="text-sm text-red-700">{error.message}</p>
                      </div>
                    </div>
                  )}

                  {isConfirmed && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Success!</p>
                        <p className="text-sm text-green-700">Your pledge has been recorded</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleContribute}
                    disabled={!isConnected || isPending || isConfirming || !contributionAmount}
                    className="w-full bg-green-500 text-white py-4 rounded-full font-bold text-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {step === 'approving' && '⏳ Approving...'}
                    {step === 'contributing' && '⏳ Confirming...'}
                    {step === 'idle' && !isConnected && '🔒 Connect wallet'}
                    {step === 'idle' && isConnected && 'Back this project'}
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    By continuing, you agree to our Terms of Service
                  </p>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}