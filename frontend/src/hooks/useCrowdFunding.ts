import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, parseUnits, StopImpersonatingAccountParameters } from 'viem';
import { crowdFundingABI  } from '@/constants';
import { B612_Mono } from 'next/font/google';



const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export function useCrowdFunding() {
    const {writeContract, data: hash, isPending, error} = useWriteContract();

    const {isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
    
    const {data: campaignCount, refetch: refetchCount} = useReadContract({
        abi: crowdFundingABI,
        address: CONTRACT_ADDRESS,
        functionName: 'getCampaignCount',
    });


    const createCampaign = async (
        title: string,
        goal: string,
        description: string,
        durationInDays: number,
        tiers:{
            name: string,
            description: string,
            minContribution: string,
            maxBackers: string,
        }[],
        milestones:{
            description: string,
            percentage: number,
            deadline: number,
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

    const contribute = async (
        campaignId: number,
        amount: string,
        tierIndex: number
    ) => {
        return writeContract({
            address: CONTRACT_ADDRESS,
            abi: crowdFundingABI,
            functionName: 'contribute',
            args: [BigInt(campaignId), parseUnits(amount, 6),tierIndex],
        });
    };


    const useCampaign = (id: number) => {
        return useReadContract({
            abi: crowdFundingABI,
            address: CONTRACT_ADDRESS,
            functionName: 'getCampaign',
            args: [BigInt(id)],
        });
    };

    return {
        campaignCount,
        createCampaign,
        contribute,
        useCampaign,
        isConfirming,
        isConfirmed,
        isPending,
        error,
        refetchCount
    }
    
}