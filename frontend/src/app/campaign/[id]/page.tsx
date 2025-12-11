'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Target, Clock, Users, TrendingUp, 
  Coins, Award, CheckCircle, AlertCircle, Loader 
} from 'lucide-react';

export default function CampaignDetail({ params }: { params: { id: string } }) {
  const campaignId = parseInt(params.id);
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

  useEffect(() => {
    if (isConfirmed) {
      setContributionAmount('');
      setStep('idle');
      alert('✅ Contribution successful!');
    }
  }, [isConfirmed]);

  if (campaignLoading || tiersLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <div className="bg-white/95 rounded-2xl p-8 shadow-2xl">
          <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center">
        <div className="bg-white/95 rounded-2xl p-8 shadow-2xl text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Campaign not found</p>
          <Link href="/" className="text-purple-600 hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const [title, goal, raised, duration, description, creator, state] = campaign as any[];
  
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
      // Step 1: Approve
      setStep('approving');
      await approveUSDC(contributionAmount);
      
      // Step 2: Contribute
      setStep('contributing');
      await contribute(campaignId, contributionAmount, selectedTier);
      
    } catch (err: any) {
      console.error('Contribution error:', err);
      setStep('idle');
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
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Campaign Info */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Campaign Header */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    {title}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">
                      Created by{' '}
                      <span className="font-mono">{creator.slice(0, 6)}...{creator.slice(-4)}</span>
                    </span>
                    {isCreator && (
                      <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                        YOU
                      </span>
                    )}
                  </div>
                </div>
                
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  state === 0 ? 'bg-green-100 text-green-700' :
                  state === 1 ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {state === 0 ? '🟢 Active' : state === 1 ? '✅ Successful' : '❌ Failed'}
                </span>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {description}
              </p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-lg font-bold mb-3">
                  <span className="text-purple-600">{raisedFormatted} USDC</span>
                  <span className="text-gray-500">{goalFormatted} USDC goal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-right text-sm text-gray-600 mt-2">
                  {progress.toFixed(1)}% funded
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Goal</p>
                  <p className="text-xl font-bold text-gray-800">{goalFormatted}</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-pink-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Raised</p>
                  <p className="text-xl font-bold text-gray-800">{raisedFormatted}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Time Left</p>
                  <p className="text-xl font-bold text-gray-800">
                    {isActive ? `${daysLeft}d` : 'Ended'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tiers */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Reward Tiers</h2>
              </div>
              
              <div className="space-y-4">
                {tiers && Array.isArray(tiers) && tiers.length > 0 ? (
                  (tiers as any[]).map((tier: any, idx: number) => {
                    const [name, desc, minContribution, maxBackers, currentBackers] = tier;
                    const minFormatted = formatUnits(minContribution, 6);
                    const spotsLeft = Number(maxBackers) - Number(currentBackers);
                    
                    return (
                      <div 
                        key={idx}
                        className="border-2 border-gray-200 rounded-xl p-4 hover:border-purple-400 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-gray-800">{name}</h3>
                          <span className="text-sm font-semibold text-purple-600">
                            {minFormatted} USDC min
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{desc}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{Number(currentBackers)} / {Number(maxBackers)} backers</span>
                          {spotsLeft > 0 ? (
                            <span className="text-green-600 font-medium">{spotsLeft} spots left</span>
                          ) : (
                            <span className="text-red-600 font-medium">Full</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">No tiers available</p>
                )}
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Milestones</h2>
              </div>
              
              <div className="space-y-4">
                {milestones && Array.isArray(milestones) && milestones.length > 0 ? (
                  (milestones as any[]).map((milestone: any, idx: number) => {
                    const [desc, percentage, deadline, votesFor, votesAgainst, approved, fundsReleased] = milestone;
                    const deadlineDate = new Date(Number(deadline) * 1000);
                    
                    return (
                      <div 
                        key={idx}
                        className="border-2 border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-800">Milestone {idx + 1}</h3>
                          <span className="text-sm font-semibold text-purple-600">
                            {percentage}% of funds
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{desc}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Deadline: {deadlineDate.toLocaleDateString()}</span>
                          {fundsReleased ? (
                            <span className="text-green-600 font-medium">✅ Released</span>
                          ) : approved ? (
                            <span className="text-blue-600 font-medium">✓ Approved</span>
                          ) : (
                            <span className="text-gray-400">Pending</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">No milestones</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contribute */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <Coins className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Contribute</h2>
              </div>

              {!isActive && (
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-4 mb-4">
                  <p className="text-gray-600 text-sm text-center">
                    Campaign has ended
                  </p>
                </div>
              )}

              {isCreator && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
                  <p className="text-blue-700 text-sm">
                    ℹ️ You can't contribute to your own campaign
                  </p>
                </div>
              )}

              {isActive && !isCreator && (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Amount (USDC)
                      </label>
                      <input
                        type="number"
                        placeholder="10"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900"
                        min="10"
                        step="0.01"
                        disabled={isPending || isConfirming}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Select Tier
                      </label>
                      <select
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900"
                        disabled={isPending || isConfirming}
                      >
                        {Array.isArray(tiers) && tiers.map((tier: any, idx: number) => (
                          <option key={idx} value={idx}>
                            {tier[0]} - {formatUnits(tier[2], 6)} USDC min
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4">
                      <p className="text-red-600 text-xs">{error.message}</p>
                    </div>
                  )}

                  <button
                    onClick={handleContribute}
                    disabled={!isConnected || isPending || isConfirming || !contributionAmount}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {step === 'approving' && '⏳ Approving USDC...'}
                    {step === 'contributing' && '⏳ Contributing...'}
                    {step === 'idle' && !isConnected && '🔒 Connect Wallet'}
                    {step === 'idle' && isConnected && (
                      <>
                        <Coins className="w-5 h-5" />
                        Contribute Now
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}