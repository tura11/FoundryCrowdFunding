'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Rocket, TrendingUp, Heart, Wallet, 
  Clock, Target, Users, DollarSign, CheckCircle,
  AlertCircle, Plus, ExternalLink, Loader
} from 'lucide-react';


import { useCrowdFunding } from '@/hooks/useCrowdFunding';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'created' | 'backed'>('created');
  const [mounted, setMounted] = useState(false);

  const { 
    useUserCreatedCampaigns, 
    useUserBackedCampaigns,
    useDashboardStats 
  } = useCrowdFunding();
  
  const createdCampaigns = useUserCreatedCampaigns();
  const backedCampaigns = useUserBackedCampaigns();
  const stats = useDashboardStats();


  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-green-500" />
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">CrowdFund</span>
              </Link>
              <ConnectButton />
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <Wallet className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Connect your wallet to view your dashboard and manage your campaigns
          </p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">CrowdFund</span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                  Discover
                </Link>
                <Link href="/dashboard" className="text-green-600 hover:text-green-700 font-medium border-b-2 border-green-600">
                  Dashboard
                </Link>
                <Link href="/create" className="text-gray-700 hover:text-gray-900 font-medium">
                  Start a project
                </Link>
              </nav>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-lg text-gray-600 font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Rocket className="w-6 h-6" />}
            label="Created"
            value={stats.createdCount}
            color="blue"
          />
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            label="Backed"
            value={stats.backedCount}
            color="green"
          />
          <StatCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Total Raised"
            value={`$${(stats.totalRaised / 1000000).toLocaleString()}`}
            color="purple"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Success Rate"
            value={`${stats.successRate.toFixed(0)}%`}
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-8 mb-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to launch something amazing?</h2>
              <p className="text-green-50">Start your next campaign and bring your idea to life</p>
            </div>
            <Link
              href="/create"
              className="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-green-50 transition-all flex items-center gap-2 shadow-lg whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Create Campaign
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('created')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'created'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Projects ({createdCampaigns.length})
          </button>
          <button
            onClick={() => setActiveTab('backed')}
            className={`px-6 py-3 font-bold transition-all ${
              activeTab === 'backed'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Backed Projects ({backedCampaigns.length})
          </button>
        </div>

        {/* Campaign Lists */}
        {activeTab === 'created' && (
          <div>
            {createdCampaigns.length === 0 ? (
              <EmptyState
                icon={<Rocket className="w-16 h-16" />}
                title="No campaigns created yet"
                description="Start your first campaign and share your vision with the world"
                actionLabel="Create Campaign"
                actionLink="/create"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {createdCampaigns.map((id) => (
                  <CreatorCampaignCard key={id} campaignId={id} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'backed' && (
          <div>
            {backedCampaigns.length === 0 ? (
              <EmptyState
                icon={<Heart className="w-16 h-16" />}
                title="No backed campaigns yet"
                description="Support projects you believe in and be part of something great"
                actionLabel="Discover Projects"
                actionLink="/"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {backedCampaigns.map((id) => (
                  <BackerCampaignCard key={id} campaignId={id} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// ========== COMPONENTS ==========

type StatColor = 'blue' | 'green' | 'purple' | 'orange';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: StatColor;
};

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colors: Record<StatColor, string> = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all">
      <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function EmptyState({ icon, title, description, actionLabel, actionLink }: any) {
  return (
    <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
      <div className="text-gray-300 mx-auto mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <Link
        href={actionLink}
        className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

function CreatorCampaignCard({ campaignId }: { campaignId: number }) {
  // In real implementation, use:
  // const { useCampaign, useTotalContributors } = useCrowdFunding();
  // const { data: campaign, isLoading } = useCampaign(campaignId);
  // const { data: totalBackers } = useTotalContributors(campaignId);

  const [savedImage, setSavedImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  // Mock data
  const campaign = {
    title: `Campaign #${campaignId}`,
    goal: BigInt(1000 * 1000000), // 1000 USDC
    raised: BigInt(750 * 1000000), // 750 USDC
    duration: BigInt(Math.floor(Date.now() / 1000) + 86400 * 15),
    state: 0,
    creator: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  };

  const totalBackers = 25;

  const progress = Number(campaign.raised) > 0 
    ? (Number(campaign.raised) / Number(campaign.goal)) * 100 
    : 0;
  
  const goalFormatted = formatUnits(campaign.goal, 6);
  const raisedFormatted = formatUnits(campaign.raised, 6);
  
  const durationDate = new Date(Number(campaign.duration) * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((durationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isActive = now < durationDate;

  return (
    <article className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all overflow-hidden group">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {savedImage ? (
          <img 
            src={savedImage} 
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">
              {campaign.title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          CREATOR
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors line-clamp-2">
          {campaign.title}
        </h3>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-end mb-2">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
              <div className="text-sm text-gray-500">
                of ${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-700">
                {progress.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-500">funded</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{daysLeft} days left</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{totalBackers} backers</span>
          </div>
        </div>

        {/* Actions */}
        <Link
          href={`/campaign/${campaignId}`}
          className="block w-full bg-green-500 text-white py-3 rounded-lg text-sm font-bold hover:bg-green-600 transition-all text-center"
        >
          {isActive ? 'Manage Campaign' : 'View & Withdraw'}
        </Link>
      </div>
    </article>
  );
}

function BackerCampaignCard({ campaignId }: { campaignId: number }) {
  // In real implementation:
  // const { useCampaign, useContribution } = useCrowdFunding();
  // const { address } = useAccount();
  // const { data: campaign } = useCampaign(campaignId);
  // const { data: myContribution } = useContribution(campaignId, address);

  const [savedImage, setSavedImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  // Mock data
  const campaign = {
    title: `Campaign #${campaignId}`,
    goal: BigInt(1000 * 1000000),
    raised: BigInt(850 * 1000000),
    duration: BigInt(Math.floor(Date.now() / 1000) + 86400 * 20),
    state: 0,
  };

  const myContribution = BigInt(50 * 1000000); // 50 USDC
  
  const progress = Number(campaign.raised) > 0 
    ? (Number(campaign.raised) / Number(campaign.goal)) * 100 
    : 0;
  
  const goalFormatted = formatUnits(campaign.goal, 6);
  const raisedFormatted = formatUnits(campaign.raised, 6);
  const contributionFormatted = formatUnits(myContribution, 6);
  
  const durationDate = new Date(Number(campaign.duration) * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((durationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isActive = now < durationDate;
  const hasFailed = !isActive && progress < 100;

  return (
    <article className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all overflow-hidden group">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {savedImage ? (
          <img 
            src={savedImage} 
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">
              {campaign.title.charAt(0)}
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Heart className="w-3 h-3 fill-current" />
          BACKED
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors line-clamp-2">
          {campaign.title}
        </h3>

        {/* My Contribution */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700 font-medium">Your pledge</span>
            <span className="text-lg font-bold text-blue-900">
              ${Number(contributionFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-gray-900">
              ${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
            <div className="text-sm text-gray-600">
              {progress.toFixed(0)}% of ${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{daysLeft} days left</span>
          </div>
          {hasFailed && (
            <span className="text-red-600 font-medium flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Refund available
            </span>
          )}
        </div>

        {/* Actions */}
        <Link
          href={`/campaign/${campaignId}`}
          className="block w-full bg-green-500 text-white py-3 rounded-lg text-sm font-bold hover:bg-green-600 transition-all text-center"
        >
          {hasFailed ? 'Claim Refund' : 'View Campaign'}
        </Link>
      </div>
    </article>
  );
}