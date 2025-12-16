import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { crowdFundingABI } from '../crowdFundingABI';
import { useAccount } from 'wagmi';
import { useMemo } from 'react';

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
      fundsReleased: false
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

  // ========== WITHDRAW & REFUND ==========
  const withdraw = async (campaignId: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'withdraw',
      args: [BigInt(campaignId)],
    });
  };

  const refund = async (campaignId: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: crowdFundingABI,
      functionName: 'refund',
      args: [BigInt(campaignId)],
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

  // ✨ NEW - Get user's contribution for a campaign
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

  // ✨ NEW - Get total contributors for a campaign
  const useTotalContributors = (campaignId: number) => {
    return useReadContract({
      abi: crowdFundingABI,
      address: CONTRACT_ADDRESS,
      functionName: 'getTotalContributors',
      args: [BigInt(campaignId)],
    });
  };

  // ✨ NEW - Helper to get all campaigns created by user
  const useUserCreatedCampaigns = () => {
    const count = Number(campaignCount || 0);
    const campaignIds = Array.from({ length: count }, (_, i) => i);
    
    // Fetch all campaigns and filter by creator
    const campaigns = campaignIds.map(id => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data } = useCampaign(id);
      return { id, data };
    });

    return useMemo(() => {
      return campaigns.filter(c => {
        if (!c.data || !address) return false;
        const campaign = c.data as any;
        return campaign.creator?.toLowerCase() === address.toLowerCase();
      }).map(c => c.id);
    }, [campaigns, address]);
  };

  // ✨ NEW - Helper to get all campaigns backed by user
  const useUserBackedCampaigns = () => {
    const count = Number(campaignCount || 0);
    const campaignIds = Array.from({ length: count }, (_, i) => i);
    
    // Fetch contributions for each campaign
    const contributions = campaignIds.map(id => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data } = useContribution(id);
      return { id, contribution: data };
    });

    return useMemo(() => {
      return contributions.filter(c => {
        if (!c.contribution) return false;
        return Number(c.contribution) > 0;
      }).map(c => c.id);
    }, [contributions]);
  };

  // ✨ NEW - Get dashboard stats
  const useDashboardStats = () => {
    const createdCampaigns = useUserCreatedCampaigns();
    const backedCampaigns = useUserBackedCampaigns();
    
    // Calculate total raised from created campaigns
    const createdCampaignsData = createdCampaigns.map(id => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data } = useCampaign(id);
      return data;
    });

    const totalRaised = useMemo(() => {
      return createdCampaignsData.reduce<number>((sum, campaign) => {
        if (!campaign) return sum;
        const c = campaign as any;
        return sum + Number(c.raised ?? 0);
      }, 0);
    }, [createdCampaignsData]);

    // Calculate total backed amount
    const backedContributions = backedCampaigns.map(id => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data } = useContribution(id);
      return data;
    });

      const totalBacked = useMemo(() => {
        return backedContributions.reduce<number>((sum, contribution) => {
          return sum + Number(contribution ?? 0);
        }, 0);
      }, [backedContributions]);
    // Calculate success rate
    const successfulCampaigns = useMemo(() => {
      return createdCampaignsData.filter(campaign => {
        if (!campaign) return false;
        const c = campaign as any;
        return c.state === 1; // Successful state
      }).length;
    }, [createdCampaignsData]);

    const successRate = createdCampaigns.length > 0 
      ? (successfulCampaigns / createdCampaigns.length) * 100 
      : 0;

    return {
      createdCount: createdCampaigns.length,
      backedCount: backedCampaigns.length,
      totalRaised,
      totalBacked,
      successRate,
      successfulCampaigns
    };
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
    withdraw,
    approveUSDC,
    refund,
    refetchCount,
    
    // Read functions
    useCampaign,
    useCampaignTiers,
    useCampaignMilestones,
    useContribution,
    useTotalContributors,
    
    // ✨ NEW - Dashboard helpers
    useUserCreatedCampaigns,
    useUserBackedCampaigns,
    useDashboardStats,
  };
}