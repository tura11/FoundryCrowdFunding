'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount, useReadContract, usePublicClient} from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Loader, AlertCircle, Wallet, CheckCircle, Zap, Target, Clock, Users, TrendingUp, Award
} from 'lucide-react';
import {
  toastTxSent,
  toastTxConfirming,
  toastTxSuccess,
  toastTxError,
  toastWalletNotConnected,
  toastInvalidAmount,
  toastApprovalSuccess,
  toastContributionSuccess,
  toastVoteSuccess,
  toastFundsReleased,
  toastRefundSuccess,
  toastNotCreator,
  toastValidationError
} from '../../components/lib/toasts';

export default function ClientCampaignDetail({ campaignId }: { campaignId: number }) {
  const { address, isConnected } = useAccount();
  
  const { 
    useCampaign, 
    useCampaignTiers, 
    useCampaignMilestones,
    useContribution,
    useTotalContributors,
    approveUSDC,
    contribute: contributeToCampaign,
    voteMilestone: voteMilestone,
    finalizeMilestoneVoting, 
    releaseMilestoneFunds,
    refund,
    isPending,
    isConfirming,
    isConfirmed,
    error
  } = useCrowdFunding();
  
  const { data: campaign, isLoading: campaignLoading, refetch: refetchCampaign } = useCampaign(campaignId);
  const { data: tiers, isLoading: tiersLoading } = useCampaignTiers(campaignId);
  const { data: milestones, isLoading: milestonesLoading, refetch: refetchMilestones } = useCampaignMilestones(campaignId);
  const { data: userContribution } = useContribution(campaignId, address);
  const { data: totalContributors } = useTotalContributors(campaignId);

  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedTier, setSelectedTier] = useState(0);
  const [step, setStep] = useState<'idle' | 'needsApproval' | 'approved' | 'contributing' | 'refunding'>('idle');
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [mintingUSDC, setMintingUSDC] = useState(false);
  const [currentToastId, setCurrentToastId] = useState<string | null>(null);
  const publicClient = usePublicClient();
  const [chainTimestamp, setChainTimestamp] = useState<number>(0);

  useEffect(() => {
    if (!publicClient) return;

    const fetchTimestamp = async () => {
      try {
        const block = await publicClient.getBlock();
        setChainTimestamp(Number(block.timestamp));
      } catch (err) {
        console.error('Failed to fetch block timestamp', err);
      }
    };

    fetchTimestamp();
    const interval = setInterval(fetchTimestamp, 5000);
    return () => clearInterval(interval);
  }, [publicClient]);

  const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;

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

  const hasContributed = userContribution && Number(userContribution) > 0;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  useEffect(() => {
    if (isPending && !currentToastId) {
      const toastId = toastTxSent();
      setCurrentToastId(toastId);
    } else if (isConfirming && currentToastId) {
      toastTxConfirming(currentToastId);
    } else if (isConfirmed && currentToastId) {
      if (step === 'needsApproval') {
        toastTxSuccess(currentToastId, 'USDC approved!');
        toastApprovalSuccess();
        setStep('approved');
        setCurrentToastId(null);
      } else if (step === 'contributing') {
        toastTxSuccess(currentToastId, 'Contribution successful!');
        toastContributionSuccess(contributionAmount);
        setContributionAmount('');
        setSelectedTier(0);
        setStep('idle');
        setCurrentToastId(null);
        
        setTimeout(() => {
          refetchCampaign();
          refetchMilestones();
        }, 2000);
      } else if (step === 'refunding') {
        toastTxSuccess(currentToastId, 'Refund processed!');
        const refundAmount = userContribution ? formatUnits(userContribution as bigint, 6) : '0';
        toastRefundSuccess(refundAmount);
        setStep('idle');
        setCurrentToastId(null);
        
        setTimeout(() => {
          refetchCampaign();
        }, 2000);
      } else {
        toastTxSuccess(currentToastId, 'Transaction successful!');
        setStep('idle');
        setCurrentToastId(null);
        
        setTimeout(() => {
          refetchCampaign();
          refetchMilestones();
        }, 2000);
      }
    } else if (error && currentToastId) {
      toastTxError(currentToastId, error);
      setStep('idle');
      setCurrentToastId(null);
    }
  }, [isPending, isConfirming, isConfirmed, error, currentToastId, step, contributionAmount, userContribution]);

  const handleContribute = async () => {
    if (!isConnected) {
      toastWalletNotConnected();
      return;
    }

    if (!contributionAmount || parseFloat(contributionAmount) <= 0) {
      toastInvalidAmount();
      return;
    }

    if (tiers && Array.isArray(tiers) && tiers[selectedTier]) {
      const selectedTierData = tiers[selectedTier] as any;
      const minRequired = parseFloat(formatUnits(selectedTierData.minContribution, 6));
      if (parseFloat(contributionAmount) < minRequired) {
        toastValidationError(`Minimum contribution for this tier is $${minRequired}`);
        return;
      }
    }

    try {
      if (step === 'idle') {
        setStep('needsApproval');
        await approveUSDC(contributionAmount);
      } else if (step === 'approved') {
        setStep('contributing');
        await contributeToCampaign(campaignId, contributionAmount, selectedTier);
      }
    } catch (err: any) {
      console.error('Transaction error:', err);
      setStep('idle');
    }
  };

  const handleMintUSDC = async () => {
    if (!isConnected || !address) {
      toastWalletNotConnected();
      return;
    }

    const mintToastId = toastTxSent();

    try {
      setMintingUSDC(true);
      
      const amount = (BigInt(10000) * BigInt(1000000)).toString(16).padStart(64, '0');
      const addressPadded = address.slice(2).padStart(64, '0');

      await (window as any).ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: address,
          to: USDC_ADDRESS,
          data: '0x40c10f19' + addressPadded + amount
        }]
      });

      toastTxSuccess(mintToastId, 'USDC minted!');
      
    } catch (err: any) {
      console.error('Mint error:', err);
      toastTxError(mintToastId, err);
    } finally {
      setMintingUSDC(false);
    }
  };

  const handleVoteMilestone = async (milestoneId: number, vote: boolean) => {
    if (!isConnected) {
      toastWalletNotConnected();
      return;
    }

    try {
      await voteMilestone(campaignId, milestoneId, vote);
      toastVoteSuccess(vote);
      
      setTimeout(() => {
        refetchMilestones();
      }, 2000);
    } catch (err: any) {
      console.error('Vote error:', err);
    }
  };

  const handleFinalizeMilestone = async (milestoneId: number) => {
    if (!isConnected) {
      toastWalletNotConnected();
      return;
    }

    try {
      await finalizeMilestoneVoting(campaignId, milestoneId);
      
      setTimeout(() => {
        refetchMilestones();
      }, 2000);
    } catch (err: any) {
      console.error('Finalize error:', err);
    }
  };

  const handleReleaseFunds = async (milestoneId: number) => {
    if (!isConnected || !isCreator) {
      toastNotCreator();
      return;
    }

    try {
      await releaseMilestoneFunds(campaignId, milestoneId);
      
      if (milestones && Array.isArray(milestones)) {
        const milestone = milestones[milestoneId] as any;
        const campaignData = campaign as any;
        const amount = (Number(formatUnits(campaignData.originalGoal, 6)) * milestone.percentage / 100).toFixed(0);
        toastFundsReleased(amount);
      }
      
      setTimeout(() => {
        refetchCampaign();
        refetchMilestones();
      }, 2000);
    } catch (err: any) {
      console.error('Release error:', err);
    }
  };

  const handleRefund = async () => {
    if (!isConnected) {
      toastWalletNotConnected();
      return;
    }

    if (!hasContributed) {
      toastValidationError('You have not contributed to this campaign');
      return;
    }

    try {
      setStep('refunding');
      await refund(campaignId);
    } catch (err: any) {
      console.error('Refund error:', err);
      setStep('idle');
    }
  };

  if (campaignLoading || tiersLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 shadow-2xl">
          <Loader className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-200 text-center shadow-2xl">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Campaign not found</p>
          <Link href="/" className="text-green-600 hover:underline mt-4 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { title, raised, originalGoal, duration, description, creator, state, anyMilestoneReleased } = campaign as any;
  const isCreator = !!address && creator?.toLowerCase() === address.toLowerCase();

  const fullyFunded = Number(raised) >= Number(originalGoal);
  const raisedFormatted = formatUnits(raised, 6);
  const goalFormatted = formatUnits(originalGoal, 6);
  const durationTimestamp = Number(duration);
  const currentTime = chainTimestamp || Math.floor(Date.now() / 1000);
  const progress = Number(originalGoal) > 0 ? (Number(raised) / Number(originalGoal)) * 100 : 0;

  const isActive = currentTime < durationTimestamp;
  const daysLeft = isActive ? Math.max(0, Math.ceil((durationTimestamp - currentTime) / 86400)) : 0;

  const hasFailed = currentTime > durationTimestamp && Number(raised) < Number(originalGoal);
  const canRefund = hasFailed && hasContributed && !anyMilestoneReleased;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-medium group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to projects
            </Link>
            <div className="flex items-center gap-4">
              {isConnected && usdcBalance !== undefined && (
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl group">
              {savedImage ? (
                <img 
                  src={savedImage} 
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <div className="text-white text-9xl font-bold opacity-20">
                    {title.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {state === 1 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Successful
                </div>
              )}
              {state === 2 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ❌ Failed
                </div>
              )}
              {fullyFunded && state === 0 && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2 animate-pulse">
                  <Zap className="w-4 h-4" />
                  Fully Funded
                </div>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                {description}
              </p>

              <div className="flex items-center gap-3 text-gray-600">
                <span>
                  By <span className="font-mono font-medium">{creator.slice(0, 6)}...{creator.slice(-4)}</span>
                </span>
                {isCreator && (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                    YOU
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                Rewards
              </h2>
              
              <div className="space-y-4">
                {tiers && Array.isArray(tiers) && tiers.length > 0 ? (
                  (tiers as any[]).map((tier: any, idx: number) => {
                    const { name, description: desc, minContribution, maxBackers, currentBackers } = tier;
                    const minFormatted = formatUnits(minContribution, 6);
                    const spotsLeft = Number(maxBackers) - Number(currentBackers);
                    
                    return (
                      <div 
                        key={idx}
                        className="relative border-2 border-gray-200 rounded-2xl p-6 hover:border-green-400 hover:shadow-xl transition-all bg-white/50 backdrop-blur-sm group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{name}</h3>
                              <p className="text-green-600 font-bold text-xl mt-1">
                                ${Number(minFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })} or more
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{desc}</p>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              <span className="font-bold text-gray-900">{Number(currentBackers)}</span> backers
                            </span>
                            {spotsLeft > 0 ? (
                              <span className="text-green-600 font-medium">{spotsLeft} spots left</span>
                            ) : (
                              <span className="text-red-600 font-medium">All claimed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-8">No rewards available</p>
                )}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-green-600" />
                Milestones & Voting
              </h2>
              
              {!fullyFunded && !isActive && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
                  <p className="text-yellow-800 text-sm font-medium">
                    ⚠️ Campaign didn't reach its goal. Milestones are locked.
                  </p>
                </div>
              )}
              
              <div className="space-y-6">
                {milestones && Array.isArray(milestones) && milestones.length > 0 ? (
                  (milestones as any[]).map((milestone: any, idx: number) => {
                    const { description: desc, percentage, deadline, votesFor, votesAgainst, approved, fundsReleased, votingFinalized } = milestone;

                    const deadlineTimestamp = Number(deadline);
                    const votingEndTimestamp = deadlineTimestamp + 7 * 24 * 60 * 60;

                    const isVotingOpen = !isActive && fullyFunded && currentTime >= deadlineTimestamp && currentTime < votingEndTimestamp && !votingFinalized;
                    const isVotingEnded = currentTime >= votingEndTimestamp && !votingFinalized;
                    const canRelease = isCreator && approved && !fundsReleased;

                    const isPreviousMilestoneReleased = idx === 0 || (milestones[idx - 1] as any).fundsReleased;

                    const totalVotes = Number(votesFor) + Number(votesAgainst);
                    const approvalRate = totalVotes > 0 ? (Number(votesFor) / totalVotes) * 100 : 0;

                    const daysUntilVoting = Math.max(0, Math.ceil((deadlineTimestamp - currentTime) / 86400));
                    const daysLeftVoting = Math.max(0, Math.ceil((votingEndTimestamp - currentTime) / 86400));
                    
                    return (
                      <div 
                        key={idx}
                        className={`relative border-2 rounded-2xl p-6 transition-all ${
                          isVotingOpen ? 'border-blue-400 bg-blue-50/50 shadow-xl' : 
                          fundsReleased ? 'border-green-400 bg-green-50/50' :
                          approved ? 'border-green-300 bg-green-50/30' :
                          'border-gray-200 bg-white/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">Milestone {idx + 1}</h3>
                            <p className="text-sm text-green-600 font-medium mt-1">
                              {percentage}% of goal (${(Number(goalFormatted) * percentage / 100).toFixed(0)})
                            </p>
                          </div>
                          
                          {fundsReleased ? (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Released
                            </span>
                          ) : approved ? (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              Approved
                            </span>
                          ) : isVotingOpen ? (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                              🗳️ Voting Open
                            </span>
                          ) : votingFinalized ? (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg">
                              ❌ Rejected
                            </span>
                          ) : (
                            <span className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-bold rounded-full">
                              Pending
                            </span>
                          )}
                        </div>

                        <p className="text-gray-700 mb-4">{desc}</p>

                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 mb-4 border border-gray-200">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Deadline:
                            </span>
                            <span className="font-medium text-gray-900">{new Date(deadlineTimestamp * 1000).toLocaleDateString()}</span>
                          </div>
                          
                          {isVotingOpen && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-blue-600">⏳ Voting ends in:</span>
                              <span className="font-bold text-blue-700">{daysLeftVoting} days</span>
                            </div>
                          )}
                          
                          {!isActive && fullyFunded && currentTime < deadlineTimestamp && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Voting opens in:</span>
                              <span className="font-medium text-gray-700">{daysUntilVoting} days</span>
                            </div>
                          )}
                        </div>

                        {totalVotes > 0 && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Votes ({totalContributors ? Number(totalContributors) : 0} contributors)
                              </span>
                              <span className="font-medium text-gray-900">
                                {totalVotes} voted • {approvalRate.toFixed(0)}% approval
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-green-600 w-12">YES</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${approvalRate}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-green-700 w-12 text-right">{votesFor}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-red-600 w-12">NO</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${100 - approvalRate}%` }}
                                  />
                                </div>
                                <span className="text-xs font-bold text-red-700 w-12 text-right">{votesAgainst}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {isVotingOpen && !isCreator && hasContributed && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleVoteMilestone(idx, true)}
                              disabled={isPending || isConfirming}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                              👍 Vote YES
                            </button>
                            <button
                              onClick={() => handleVoteMilestone(idx, false)}
                              disabled={isPending || isConfirming}
                              className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                              👎 Vote NO
                            </button>
                          </div>
                        )}

                        {isVotingEnded && (
                          <button
                            onClick={() => handleFinalizeMilestone(idx)}
                            disabled={isPending || isConfirming}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all"
                          >
                            ✅ Finalize Voting
                          </button>
                        )}

                        {canRelease && isPreviousMilestoneReleased && (
                          <button
                            onClick={() => handleReleaseFunds(idx)}
                            disabled={isPending || isConfirming}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                          >
                            💰 Release Funds
                          </button>
                        )}

                        {canRelease && !isPreviousMilestoneReleased && (
                          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-sm text-orange-800">
                            ⏳ Previous milestone must be released first
                          </div>
                        )}

                        {!isActive && fullyFunded && currentTime < deadlineTimestamp && (
                          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-sm text-yellow-800">
                            ⏳ Voting will open on {new Date(deadlineTimestamp * 1000).toLocaleDateString()}
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

          {/* SIDEBAR - Glassmorphism Contribution Box */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="relative bg-white/60 backdrop-blur-2xl border-2 border-white/50 rounded-3xl p-6 shadow-2xl">
                {/* Gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-3xl blur-xl -z-10" />
                
                <div className="mb-6">
                  <div className="text-4xl font-black text-gray-900 mb-2">
                    ${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    pledged of <span className="font-bold text-gray-900">${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> goal
                  </div>

                  <div className="relative w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl mb-2">
                        <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{progress.toFixed(0)}%</div>
                      <div className="text-xs text-gray-600">funded</div>
                    </div>
                    <div className="text-center">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl mb-2">
                        <Clock className="w-5 h-5 text-blue-600 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{daysLeft}</div>
                      <div className="text-xs text-gray-600">{isActive ? 'days left' : 'ended'}</div>
                    </div>
                    <div className="text-center">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-2">
                        <Users className="w-5 h-5 text-purple-600 mx-auto" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{totalContributors ? Number(totalContributors) : 0}</div>
                      <div className="text-xs text-gray-600">backers</div>
                    </div>
                  </div>

                  {fullyFunded && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4 mt-6">
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-blue-600" />
                        Fully Funded!
                      </h3>
                      <p className="text-xs text-gray-600 italic">
                        Milestone voting will begin after deadlines
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-gray-200/50 mb-6"></div>

                {!!canRefund && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4 mb-4">
                    <p className="text-red-800 text-sm font-medium mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Campaign did not reach its goal
                    </p>
                    <button
                      onClick={handleRefund}
                      disabled={isPending || isConfirming}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-xl disabled:opacity-50 transition-all"
                    >
                      {isPending || isConfirming ? '⏳ Processing...' : '💸 Get Refund'}
                    </button>
                    <p className="text-xs text-gray-600 text-center mt-2">
                      You contributed ${userContribution ? formatUnits(userContribution as bigint, 6) : '0'}
                    </p>
                  </div>
                )}

                {isCreator && (
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
                    <p className="text-blue-800 text-sm font-medium flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      You're the creator - release funds via milestones
                    </p>
                  </div>
                )}

                {isConnected && (
                  <div className="mb-4">
                    <button
                      onClick={handleMintUSDC}
                      disabled={mintingUSDC}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-medium hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                      {mintingUSDC ? '⏳ Minting...' : '🎁 Get 10,000 Test USDC'}
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      For testing purposes only
                    </p>
                  </div>
                )}

                {isActive && !isCreator && (
                  <>
                    {step === 'approved' && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 mb-4 flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">USDC Approved!</p>
                          <p className="text-sm text-green-700">Click below to contribute</p>
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
                            className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white/80 backdrop-blur-sm"
                            min="10"
                            step="1"
                            disabled={isPending || isConfirming}
                          />
                        </div>
                        {tiers && Array.isArray(tiers) && tiers[selectedTier] && (
                          <p className="text-xs text-gray-500 mt-1">
                            Minimum: ${formatUnits((tiers[selectedTier] as any).minContribution, 6)}
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
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white/80 backdrop-blur-sm"
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

                    <button
                      onClick={handleContribute}
                      disabled={!isConnected || isPending || isConfirming || !contributionAmount}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isPending && '⏳ Confirm in wallet...'}
                      {!isPending && isConfirming && step === 'needsApproval' && '⏳ Approving USDC...'}
                      {!isPending && isConfirming && step === 'contributing' && '⏳ Contributing...'}
                      {!isPending && !isConfirming && step === 'approved' && '✓ Click to contribute'}
                      {!isPending && !isConfirming && step === 'idle' && !isConnected && '🔒 Connect wallet'}
                      {!isPending && !isConfirming && step === 'idle' && isConnected && 'Back this project'}
                    </button>

                    <p className="text-center text-xs text-gray-500 mt-4">
                      By continuing, you agree to our Terms
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}