import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { crowdFundingABI } from '../crowdFundingABI';
import { useAccount } from 'wagmi';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
const USDC_ADDRESS = process.env.NEXT_PUBLIC_USDC_ADDRESS as `0x${string}`;

export function useCrowdFunding() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  
  const { data: campaignCount, refetch: refetchCount } = useReadContract({
    abi: crowdFundingABI,
    address: CONTRACT_ADDRESS,
    functionName: 'getCampaignCount',
  });

  // ========== CREATE CAMPAIGN ==========
  const createCampaign = async (
    title: string,
    goal: string,
    description: string,
    durationInDays: number,
    tiers: {
      name: string;
      description: string;
      minContribution: string;
      maxBackers: number;
    }[],
    milestones: {
      description: string;
      percentage: number;
      deadline: number;
    }[]
  ) => {
    const formattedTiers = tiers.map(t => ({
      name: t.name,
      description: t.description,
      minContribution: parseUnits(t.minContribution, 6),
      maxBackers: BigInt(t.maxBackers),
      currentBackers: BigInt(0),
    }));

    const formattedMilestones = milestones.map(m => ({
      description: m.description,
      percentage: m.percentage,
      deadline: BigInt(m.deadline),
      votesFor: 0,
      votesAgainst: 0,
      approved: false,
      fundsReleased: false,
      votingFinalized: false
    }));

    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'createCampaign',
      args: [
        title,
        parseUnits(goal, 6),
        description,
        BigInt(durationInDays),
        formattedTiers,
        formattedMilestones
      ],
    });
  };

  // ========== APPROVE & CONTRIBUTE ==========
  const approveUSDC = async (amount: string) => {
    return writeContract({
      address: USDC_ADDRESS,
      abi: [
        {
          name: 'approve',
          type: 'function',
          inputs: [
            { name: 'spender', type: 'address' },
            { name: 'amount', type: 'uint256' }
          ],
          outputs: [{ type: 'bool' }]
        }
      ],
      functionName: 'approve',
      args: [CONTRACT_ADDRESS, parseUnits(amount, 6)],
    });
  };

  const contribute = async (
    campaignId: number,
    amount: string,
    tierIndex: number
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'contribute',
      args: [
        BigInt(campaignId),
        parseUnits(amount, 6),
        tierIndex
      ],
    });
  };

  // ========== MILESTONE FUNCTIONS ==========
  const voteMilestones = async (
    campaignId: number,
    milestoneIndex: number,
    vote: boolean
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'voteMilestone',
      args: [
        BigInt(campaignId),
        BigInt(milestoneIndex),
        vote
      ],
    });
  };

  const finalizeMilestoneVoting = async (
    campaignId: number,
    milestoneIndex: number
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'finalizeMilestoneVoting',
      args: [
        BigInt(campaignId),
        BigInt(milestoneIndex)
      ],
    });
  };

  const releaseMilestoneFunds = async (
    campaignId: number,
    milestoneIndex: number
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'releaseMilestoneFunds',
      args: [
        BigInt(campaignId),
        BigInt(milestoneIndex)
      ],
    });
  };

  // ========== REFUND ==========
  const refund = async (campaignId: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'refund',
      args: [BigInt(campaignId)],
    });
  };

  // ========== WITHDRAW FEES (Owner only) ==========
  const withdrawFees = async () => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'withdrawFees',
      args: [],
    });
  };

  // ========== READ FUNCTIONS ==========
  const useCampaign = (id: number) => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getCampaign',
      args: [BigInt(id)],
    });
  };

  const useCampaignTiers = (campaignId: number) => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getCampaignTiers',
      args: [BigInt(campaignId)],
    });
  };

  const useCampaignMilestones = (campaignId: number) => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getCampaignMilestones',
      args: [BigInt(campaignId)],
    });
  };

  const useContribution = (campaignId: number, userAddress?: `0x${string}`) => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getContribution',
      args: [BigInt(campaignId), userAddress || address || '0x0000000000000000000000000000000000000000'],
      query: {
        enabled: !!userAddress || !!address,
      }
    });
  };

  const useTotalContributors = (campaignId: number) => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getTotalContributors',
      args: [BigInt(campaignId)],
    });
  };

  const useAccumulatedFees = () => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getAccumulatedFees',
    });
  };

  return {
    // State
    campaignCount,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    
    // Write functions
    createCampaign,
    contribute,
    voteMilestones,
    finalizeMilestoneVoting,
    releaseMilestoneFunds,
    withdrawFees,
    approveUSDC,
    refund,
    refetchCount,
    
    // Read functions
    useCampaign,
    useCampaignTiers,
    useCampaignMilestones,
    useContribution,
    useTotalContributors,
    useAccumulatedFees,
  };
}