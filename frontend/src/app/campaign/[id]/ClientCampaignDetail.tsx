'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount, useReadContract } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Target, Clock, Users, TrendingUp, 
  Coins, Award, CheckCircle, AlertCircle, Loader, Heart, Wallet
} from 'lucide-react';

export default function ClientCampaignDetail({ campaignId }: { campaignId: number }) {
  const { address, isConnected } = useAccount();
  
  // ✅ Wszystkie funkcje z hooka w jednym wywołaniu
  const { 
    useCampaign, 
    useCampaignTiers, 
    useCampaignMilestones,
    approveUSDC,
    contribute: contributeToCampaign,
    withdraw: withdrawFunds, 
    voteMilestones: voteMilestone,
    finalizeMilestoneVoting, 
    releaseMilestoneFunds,
    refund, // ← NOWE
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
  const [step, setStep] = useState<'idle' | 'needsApproval' | 'approved' | 'contributing'>('idle');
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [mintingUSDC, setMintingUSDC] = useState(false);

  const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;

  // Get user's USDC balance
  const { data: usdcBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ name: 'account', type: 'address' }],
        outputs: [{ type: 'uint256' }],
        stateMutability: 'view'
      }
    ],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 5000
    }
  });

  // Check if user is a contributor (simplified)
  const contributions = address ? { [campaignId]: { [address]: BigInt(1) } } : {};

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  useEffect(() => {
    if (!isPending && !isConfirming && isConfirmed) {
      if (step === 'needsApproval') {
        console.log('Approval confirmed, switching to approved state');
        setStep('approved');
      } else if (step === 'contributing') {
        console.log('Contribution confirmed, refreshing...');
        setContributionAmount('');
        setSelectedTier(0);
        setStep('idle');
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }, [isConfirmed, isPending, isConfirming, step]);

  // ========== HANDLERS ==========

  const handleContribute = async () => {
    console.log('handleContribute called, current step:', step);
    
    if (!isConnected) {
      alert('Connect wallet first!');
      return;
    }

    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      alert('Enter valid amount');
      return;
    }

    if (tiers && Array.isArray(tiers) && tiers[selectedTier]) {
      const selectedTierData = tiers[selectedTier] as any;
      const minRequired = parseFloat(formatUnits(selectedTierData.minContribution, 6));
      if (parseFloat(contributionAmount) < minRequired) {
        alert(`Minimum contribution for this tier is $${minRequired}`);
        return;
      }
    }

    try {
      if (step === 'idle') {
        console.log('Starting approval...');
        setStep('needsApproval');
        await approveUSDC(contributionAmount);
      } else if (step === 'approved') {
        console.log('Starting contribution...');
        setStep('contributing');
        await contributeToCampaign(campaignId, contributionAmount, selectedTier);
      }
    } catch (err: any) {
      console.error('Transaction error:', err);
      alert(`Error: ${err.message || 'Transaction failed'}`);
      setStep('idle');
    }
  };

  const handleMintUSDC = async () => {
    if (!isConnected || !address) {
      alert('Connect wallet first!');
      return;
    }

    try {
      setMintingUSDC(true);
      
      const amount = (BigInt(10000) * BigInt(1000000)).toString(16).padStart(64, '0');
      const addressPadded = address.slice(2).padStart(64, '0');

      const tx = await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: address,
          to: USDC_ADDRESS,
          data: '0x40c10f19' + addressPadded + amount
        }]
      });

      console.log('Mint transaction:', tx);
      alert('✅ Success! 10,000 USDC minted to your wallet');
      
    } catch (err: any) {
      console.error('Mint error:', err);
      alert(`Error: ${err.message || 'Minting failed'}`);
    } finally {
      setMintingUSDC(false);
    }
  };

  const handleWithdraw = async () => {
    if (!isConnected || !isCreator) {
      alert('Only campaign creator can withdraw!');
      return;
    }

    try {
      await withdrawFunds(campaignId);
      alert('✅ Withdrawal initiated! Check your wallet.');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Withdraw error:', err);
      alert(`Error: ${err.message || 'Withdrawal failed'}`);
    }
  };

  const handleVoteMilestone = async (milestoneId: number, vote: boolean) => {
    if (!isConnected) {
      alert('Connect wallet first!');
      return;
    }

    try {
      await voteMilestone(campaignId, milestoneId, vote);
      alert(`✅ Vote ${vote ? 'YES' : 'NO'} submitted!`);
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Vote error:', err);
      alert(`Error: ${err.message || 'Vote failed'}`);
    }
  };

  const handleFinalizeMilestone = async (milestoneId: number) => {
    if (!isConnected) {
      alert('Connect wallet first!');
      return;
    }

    try {
      await finalizeMilestoneVoting(campaignId, milestoneId);
      alert('✅ Voting finalized!');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Finalize error:', err);
      alert(`Error: ${err.message || 'Finalization failed'}`);
    }
  };

  const handleReleaseFunds = async (milestoneId: number) => {
    if (!isConnected || !isCreator) {
      alert('Only creator can release funds!');
      return;
    }

    try {
      await releaseMilestoneFunds(campaignId, milestoneId);
      alert('✅ Funds released! Check your wallet.');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Release error:', err);
      alert(`Error: ${err.message || 'Release failed'}`);
    }
  };

  const handleRefund = async () => {
    if (!isConnected) {
      alert('Connect wallet first!');
      return;
    }

    try {
      await refund(campaignId);
      alert('✅ Refund successful! Check your wallet.');
      
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error('Refund error:', err);
      alert(`Error: ${err.message || 'Refund failed'}`);
    }
  };

  // ========== LOADING & ERROR STATES ==========

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
  const hasFailed = !isActive && progress < 100;

  return (
    <div className="min-h-screen bg-gray-50">
      
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
            <div className="flex items-center gap-4">
              {isConnected && usdcBalance !== undefined && (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                  <Wallet className="w-4 h-4 text-green-600" />
                  <div className="text-sm">
                    <span className="font-bold text-green-900">
                      ${Number(formatUnits(usdcBalance, 6)).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-green-600 ml-1">USDC</span>
                  </div>
                </div>
              )}
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            
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
              {hasFailed && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ❌ Failed
                </div>
              )}
            </div>

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

            <div className="border-t border-gray-200"></div>

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

            <div className="border-t border-gray-200"></div>

            {/* Milestones with Voting */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Milestones & Voting</h2>
              
              <div className="space-y-6">
                {milestones && Array.isArray(milestones) && milestones.length > 0 ? (
                  (milestones as any[]).map((milestone: any, idx: number) => {
                    const { desc, percentage, deadline, votesFor, votesAgainst, approved, fundsReleased } = milestone;
                    const deadlineDate = new Date(Number(deadline) * 1000);
                    const now = new Date();
                    const VOTING_PERIOD = 7 * 24 * 60 * 60 * 1000;
                    const votingEndDate = new Date(deadlineDate.getTime() + VOTING_PERIOD);
                    
                    const isVotingOpen = !isActive && now >= deadlineDate && now < votingEndDate && !approved && !fundsReleased;
                    const isVotingEnded = now >= votingEndDate && !approved;
                    const canRelease = isCreator && approved && !fundsReleased;
                    
                    const totalVotes = Number(votesFor) + Number(votesAgainst);
                    const approvalRate = totalVotes > 0 ? (Number(votesFor) / totalVotes) * 100 : 0;
                    
                    const timeUntilVoting = deadlineDate.getTime() - now.getTime();
                    const timeLeftInVoting = votingEndDate.getTime() - now.getTime();
                    
                    const daysUntilVoting = Math.ceil(timeUntilVoting / (1000 * 60 * 60 * 24));
                    const daysLeftVoting = Math.ceil(timeLeftInVoting / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div 
                        key={idx}
                        className={`border-2 rounded-xl p-6 bg-white transition-all ${
                          isVotingOpen ? 'border-blue-300 shadow-lg' : 
                          fundsReleased ? 'border-green-300' :
                          approved ? 'border-green-200' :
                          'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">Milestone {idx + 1}</h3>
                            <p className="text-sm text-green-600 font-medium mt-1">
                              {percentage}% of funds (${(Number(raisedFormatted) * percentage / 100).toFixed(0)})
                            </p>
                          </div>
                          
                          {fundsReleased ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Released
                            </span>
                          ) : approved ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Approved
                            </span>
                          ) : isVotingOpen ? (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full animate-pulse">
                              🗳️ Voting Open
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full">
                              Pending
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4">{desc}</p>

                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Deadline:</span>
                            <span className="font-medium text-gray-900">{deadlineDate.toLocaleDateString()}</span>
                          </div>
                          
                          {isVotingOpen && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-blue-600">⏳ Voting ends in:</span>
                              <span className="font-bold text-blue-700">{daysLeftVoting} days</span>
                            </div>
                          )}
                          
                          {!isActive && now < deadlineDate && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Voting opens in:</span>
                              <span className="font-medium text-gray-700">{daysUntilVoting} days</span>
                            </div>
                          )}
                        </div>

                        {totalVotes > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Votes</span>
                              <span className="font-medium text-gray-900">
                                {totalVotes} total • {approvalRate.toFixed(0)}% approval
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-green-600 w-12">YES</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full transition-all"
                                    style={{ width: `${approvalRate}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-green-700 w-8">{votesFor}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-red-600 w-12">NO</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-red-500 h-2 rounded-full transition-all"
                                    style={{ width: `${100 - approvalRate}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-red-700 w-8">{votesAgainst}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {isVotingOpen && !isCreator && contributions?.[campaignId]?.[address || ''] && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleVoteMilestone(idx, true)}
                              disabled={isPending || isConfirming}
                              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                              👍 Vote YES
                            </button>
                            <button
                              onClick={() => handleVoteMilestone(idx, false)}
                              disabled={isPending || isConfirming}
                              className="flex-1 bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                              👎 Vote NO
                            </button>
                          </div>
                        )}

                        {isVotingEnded && !approved && (
                          <button
                            onClick={() => handleFinalizeMilestone(idx)}
                            disabled={isPending || isConfirming}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 disabled:opacity-50 transition-all"
                          >
                            ✅ Finalize Voting
                          </button>
                        )}

                        {canRelease && (
                          <button
                            onClick={() => handleReleaseFunds(idx)}
                            disabled={isPending || isConfirming}
                            className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                          >
                            💰 Release Funds
                          </button>
                        )}

                        {!isActive && now < deadlineDate && (
                          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
                            ⏳ Voting will open on {deadlineDate.toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">No milestones set</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  pledged of ${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })} goal
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

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

                {progress > 100 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <h3 className="font-bold text-gray-900 mb-2">🎉 Funding Breakdown</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Goal:</span>
                        <span className="font-medium text-gray-900">${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Raised:</span>
                        <span className="font-medium text-green-600">${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between border-t border-blue-200 pt-1 mt-1">
                        <span className="text-gray-600">Extra funds:</span>
                        <span className="font-bold text-blue-600">
                          +${(Number(raisedFormatted) - Number(goalFormatted)).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3 italic">
                      💡 Extra funds will be used for stretch goals and enhanced features
                    </p>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 mb-6"></div>

                 {!isActive && hasFailed && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-800 text-sm font-medium mb-3">
                    😔 Campaign did not reach its goal
                  </p>
                  <button
                    onClick={handleRefund}
                    disabled={isPending || isConfirming}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 disabled:opacity-50 transition-all"
                  >
                    {isPending || isConfirming ? '⏳ Processing...' : '💸 Get Refund'}
                  </button>
                  <p className="text-xs text-gray-600 text-center mt-2">
                    Get your contribution back
                  </p>
                </div>
              )}

              {isCreator && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 text-sm font-medium mb-3">
                    ℹ️ You can't back your own project
                  </p>
                  <button
                    onClick={handleWithdraw}
                    disabled={isPending || isConfirming || !isActive}
                    className="w-full bg-purple-500 text-white py-3 rounded-lg font-bold hover:bg-purple-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isPending || isConfirming ? '⏳ Processing...' : '💰 Withdraw Funds'}
                  </button>
                  {!isActive && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Campaign must be active to withdraw
                    </p>
                  )}
                </div>
              )}

              {isConnected && (
                <div className="mb-4">
                  <button
                    onClick={handleMintUSDC}
                    disabled={mintingUSDC}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {mintingUSDC ? '⏳ Minting...' : '🎁 Get 10,000 Test USDC'}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    For testing purposes only (Anvil network)
                  </p>
                </div>
              )}

              {isActive && !isCreator && (
                <>
                  {step === 'approved' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-800">USDC Approved!</p>
                        <p className="text-sm text-green-700">Click the button below to complete your contribution</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Pledge amount (USDC)
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
                      {tiers && Array.isArray(tiers) && tiers[selectedTier] && (
                        <p className="text-xs text-gray-500 mt-1">
                          Minimum for this tier: ${formatUnits((tiers[selectedTier] as any).minContribution, 6)}
                        </p>
                      )}
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
                        {Array.isArray(tiers) && tiers.map((tier: any, idx: number) => {
                          const spotsLeft = Number(tier.maxBackers) - Number(tier.currentBackers);
                          return (
                            <option key={idx} value={idx} disabled={spotsLeft <= 0}>
                              {tier.name} - ${formatUnits(tier.minContribution, 6)}+ {spotsLeft <= 0 ? '(Full)' : `(${spotsLeft} left)`}
                            </option>
                          );
                        })}
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
                    {isPending && '⏳ Confirm in wallet...'}
                    {!isPending && isConfirming && step === 'needsApproval' && '⏳ Approving USDC...'}
                    {!isPending && isConfirming && step === 'contributing' && '⏳ Contributing...'}
                    {!isPending && !isConfirming && step === 'approved' && '✓ Click to contribute'}
                    {!isPending && !isConfirming && step === 'idle' && !isConnected && '🔒 Connect wallet'}
                    {!isPending && !isConfirming && step === 'idle' && isConnected && 'Back this project'}
                    {!isPending && !isConfirming && step === 'needsApproval' && 'Approve USDC'}
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