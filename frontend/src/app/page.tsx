'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { create } from 'domain';



export default function Home() {
  const { isConnected, address} = useAccount();
  const {
    campaignCount,
    createCampaign,
    isPending,
    isConfirming,
    isConfirmed,
    error
  } = useCrowdFunding();

  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('30');

  useEffect(() => {
    if (isConfirmed) {
      setTitle('');
      setGoal('');
      setDescription('');
      setDuration('30');
      alert('✅ Campaign created successfully!')
    }
  }, [isConfirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!isConnected) {
      alert('Please connect your wallet');
      return;
    }
    try{
       const defaultTiers = [
        {
          name: 'Bronze',
          description: 'Basic supporter',
          minContribution: '10', // 10 USDC
          maxBackers: 100
        }
          
       ];

       const now = Math.floor(Date.now() / 1000);
       const campaignEndTime  = now + (parseInt(duration) * 24 * 60 * 60);


       const defaultMilestones = [
        {
          description: 'First milestone',
          percentage: 50,
          deadline: campaignEndTime + (30 * 24 * 60 * 60) // 30 days after end of campaign
       },
       {
          description: 'Final milestone',
          percentage: 50,
          deadline: campaignEndTime + (60 * 24 * 60 * 60) // 60 days after end of campaign
       }
      ];

      await createCampaign(title, goal,description, parseInt(duration), defaultTiers, defaultMilestones);
    }


}