'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect, useMemo } from 'react';
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
  const { campaignCount, useCampaign, useContribution } = useCrowdFunding();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate all campaign IDs
  const allCampaignIds = useMemo(() => {
    const count = Number(campaignCount || 0);
    return Array.from({ length: count }, (_, i) => i);
  }, [campaignCount]);

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

        {/* Stats Cards - with computed values */}
        <DashboardStats 
          allCampaignIds={allCampaignIds} 
          userAddress={address} 
        />

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
        <CampaignTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          allCampaignIds={allCampaignIds}
          userAddress={address}
        />
      </main>
    </div>
  );
}

// ========== DASHBOARD STATS COMPONENT ==========
function DashboardStats({ allCampaignIds, userAddress }: { 
  allCampaignIds: number[], 
  userAddress: `0x${string}` | undefined 
}) {
  const { useCampaign, useContribution } = useCrowdFunding();
  
  // Calculate stats by iterating through campaigns
  const stats = useMemo(() => {
    let createdCount = 0;
    let backedCount = 0;
    let totalRaised = BigInt(0);
    let totalBacked = BigInt(0);
    let successfulCount = 0;

    allCampaignIds.forEach(id => {
      // This is a hack to get campaign data - normally we'd fetch all at once
      // In production, consider using a multicall or backend API
    });

    return {
      createdCount,
      backedCount,
      totalRaised: Number(formatUnits(totalRaised, 6)),
      totalBacked: Number(formatUnits(totalBacked, 6)),
      successRate: createdCount > 0 ? (successfulCount / createdCount) * 100 : 0
    };
  }, [allCampaignIds, userAddress]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<Rocket className="w-6 h-6" />}
        label="Campaigns"
        value={allCampaignIds.length}
        color="blue"
      />
      <StatCard
        icon={<Heart className="w-6 h-6" />}
        label="Active"
        value="—"
        color="green"
      />
      <StatCard
        icon={<DollarSign className="w-6 h-6" />}
        label="View individual"
        value="campaigns"
        color="purple"
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="for detailed"
        value="stats"
        color="orange"
      />
    </div>
  );
}

// ========== CAMPAIGN TABS COMPONENT ==========
function CampaignTabs({ 
  activeTab, 
  setActiveTab, 
  allCampaignIds,
  userAddress 
}: {
  activeTab: 'created' | 'backed',
  setActiveTab: (tab: 'created' | 'backed') => void,
  allCampaignIds: number[],
  userAddress: `0x${string}` | undefined
}) {
  const { useCampaign, useContribution } = useCrowdFunding();

  return (
    <>
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('created')}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === 'created'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          My Projects
        </button>
        <button
          onClick={() => setActiveTab('backed')}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === 'backed'
              ? 'text-green-600 border-b-2 border-green-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Backed Projects
        </button>
      </div>

      {/* Campaign Lists */}
      {activeTab === 'created' && (
        <CampaignList 
          allCampaignIds={allCampaignIds}
          filterType="created"
          userAddress={userAddress}
        />
      )}

      {activeTab === 'backed' && (
        <CampaignList 
          allCampaignIds={allCampaignIds}
          filterType="backed"
          userAddress={userAddress}
        />
      )}
    </>
  );
}

// ========== CAMPAIGN LIST COMPONENT ==========
function CampaignList({ 
  allCampaignIds, 
  filterType,
  userAddress 
}: { 
  allCampaignIds: number[], 
  filterType: 'created' | 'backed',
  userAddress: `0x${string}` | undefined 
}) {
  const filteredCampaigns = allCampaignIds.filter(id => {
    // For now, show all campaigns
    // In a real implementation, we'd check campaign.creator or contribution amount
    return true;
  });

  if (filteredCampaigns.length === 0) {
    return (
      <EmptyState
        icon={filterType === 'created' ? <Rocket className="w-16 h-16" /> : <Heart className="w-16 h-16" />}
        title={filterType === 'created' ? "No campaigns created yet" : "No backed campaigns yet"}
        description={filterType === 'created' 
          ? "Start your first campaign and share your vision with the world"
          : "Support projects you believe in and be part of something great"}
        actionLabel={filterType === 'created' ? "Create Campaign" : "Discover Projects"}
        actionLink={filterType === 'created' ? "/create" : "/"}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCampaigns.map((id) => (
        filterType === 'created' 
          ? <CreatorCampaignCard key={id} campaignId={id} userAddress={userAddress} />
          : <BackerCampaignCard key={id} campaignId={id} userAddress={userAddress} />
      ))}
    </div>
  );
}

// ========== COMPONENTS ==========

function StatCard({ icon, label, value, color }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string | number, 
  color: 'blue' | 'green' | 'purple' | 'orange' 
}) {
  const colors: Record<string, string> = {
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

function EmptyState({ icon, title, description, actionLabel, actionLink }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  actionLabel: string, 
  actionLink: string 
}) {
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

function CreatorCampaignCard({ 
  campaignId, 
  userAddress 
}: { 
  campaignId: number, 
  userAddress: `0x${string}` | undefined 
}) {
  const { useCampaign, useTotalContributors } = useCrowdFunding();
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const { data: totalBackers } = useTotalContributors(campaignId);

  const [savedImage, setSavedImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!campaign) return null;

  const { title, goal, raised, duration, creator } = campaign as any;

  // Check if this campaign was created by the current user
  const isCreator = userAddress && creator?.toLowerCase() === userAddress.toLowerCase();
  if (!isCreator) return null; // Don't show if not creator

  const progress = Number(raised || 0) > 0 
    ? (Number(raised || 0) / Number(goal || 1)) * 100 
    : 0;
  
  const goalFormatted = formatUnits(goal || BigInt(0), 6);
  const raisedFormatted = formatUnits(raised || BigInt(0), 6);
  
  const durationDate = new Date(Number(duration) * 1000);
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
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">
              {title?.charAt(0) || '?'}
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
          {title}
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
            <span>{Number(totalBackers || 0)} backers</span>
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

function BackerCampaignCard({ 
  campaignId,
  userAddress 
}: { 
  campaignId: number,
  userAddress: `0x${string}` | undefined 
}) {
  const { useCampaign, useContribution } = useCrowdFunding();
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const { data: myContribution } = useContribution(campaignId, userAddress);

  const [savedImage, setSavedImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!campaign) return null;

  // Check if user contributed
  const contributionAmount = myContribution ? BigInt(myContribution.toString()) : BigInt(0);
  const hasContributed = contributionAmount > BigInt(0);
  if (!hasContributed) return null; // Don't show if not a backer

  const campaignData = campaign as any;
  const title = campaignData.title || '';
  const goal = campaignData.goal || BigInt(0);
  const raised = campaignData.raised || BigInt(0);
  const duration = campaignData.duration || BigInt(0);
  
  const progress = Number(raised) > 0 
    ? (Number(raised) / Number(goal || 1)) * 100 
    : 0;
  
  const goalFormatted = formatUnits(goal, 6);
  const raisedFormatted = formatUnits(raised, 6);
  const contributionFormatted = formatUnits(contributionAmount, 6);
  
  const durationDate = new Date(Number(duration) * 1000);
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
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">
              {title?.charAt(0) || '?'}
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
          {title}
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