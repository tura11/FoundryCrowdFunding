'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { useState, useEffect, useMemo } from 'react';
import {
  Rocket, TrendingUp, Heart, Wallet,
  Clock, Users, Plus, Loader, Coins
} from 'lucide-react';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [activeTab, setActiveTab] = useState<'created' | 'backed'>('created');
  const [mounted, setMounted] = useState(false);

  const { campaignCount, useCampaign, useContribution } = useCrowdFunding();

  const [dashboardStats, setDashboardStats] = useState({
    created: 0,
    backed: 0,
    active: 0,
  });

  // Campaign IDs usually start from 1 in Solidity contracts (not 0)
  const allCampaignIds = useMemo(() => {
    const count = Number(campaignCount || 0);
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [campaignCount]);

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
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">Discover</Link>
                <Link href="/dashboard" className="text-green-600 hover:text-green-700 font-medium border-b-2 border-green-600">Dashboard</Link>
                <Link href="/create" className="text-gray-700 hover:text-gray-900 font-medium">Start a project</Link>
              </nav>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
          <p className="text-lg text-gray-600 font-mono">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>

        {/* Development Tools (only in dev mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-yellow-900">🧪 Development Tools</p>
                <p className="text-sm text-yellow-700">Fast-forward time for testing campaign endings</p>
              </div>
              <button
                onClick={async () => {
                  try {
                    await (window as any).ethereum.request({
                      method: 'anvil_increaseTime',
                      params: [31 * 24 * 60 * 60],
                    });
                    await (window as any).ethereum.request({
                      method: 'anvil_mine',
                      params: [1],
                    });
                    alert('✅ Time fast-forwarded by 31 days!');
                    window.location.reload();
                  } catch (err) {
                    alert('Error: Make sure you are on Anvil local network');
                  }
                }}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-bold hover:bg-yellow-600"
              >
                ⚡ +31 Days
              </button>
            </div>
          </div>
        )}

        {/* Hidden component that accurately calculates dashboard statistics */}
        <AccurateStatsCalculator
          allCampaignIds={allCampaignIds}
          userAddress={address}
          setDashboardStats={setDashboardStats}
        />

        {/* Statistics Cards */}
        <DashboardStats allCampaignIds={allCampaignIds} stats={dashboardStats} />

        {/* Quick Action Banner */}
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
        {activeTab === 'created' ? (
          <CreatedCampaignsList allCampaignIds={allCampaignIds} userAddress={address} />
        ) : (
          <BackedCampaignsList allCampaignIds={allCampaignIds} userAddress={address} />
        )}
      </main>
    </div>
  );
}

/* ==============================================
   Accurate Statistics Calculator (hidden component)
   ============================================== */
function AccurateStatsCalculator({
  allCampaignIds,
  userAddress,
  setDashboardStats,
}: {
  allCampaignIds: number[];
  userAddress: `0x${string}` | undefined;
  setDashboardStats: React.Dispatch<
    React.SetStateAction<{ created: number; backed: number; active: number }>
  >;
}) {
  const { useCampaign, useContribution } = useCrowdFunding();

  // Fetch all campaign data and user contributions in parallel
  const campaignQueries = allCampaignIds.map((id) => useCampaign(id));
  const contributionQueries = allCampaignIds.map((id) => useContribution(id, userAddress));

  useEffect(() => {
    if (!userAddress || allCampaignIds.length === 0) {
      setDashboardStats({ created: 0, backed: 0, active: 0 });
      return;
    }

    let created = 0;
    let backed = 0;
    let active = 0;

    for (let i = 0; i < allCampaignIds.length; i++) {
      const campaign = campaignQueries[i].data;
      const contribution = contributionQueries[i].data;

      if (!campaign) continue; // Skip if data not loaded yet

      const { creator, duration } = campaign as any;
      const contribAmount = contribution ? BigInt(contribution.toString() || '0') : BigInt(0);

      // Count created campaigns
      if (creator?.toLowerCase() === userAddress.toLowerCase()) {
        created++;

        // Check if the campaign is still active
        const now = Date.now();
        const endTime = Number(duration) * 1000;
        if (now < endTime) {
          active++;
        }
      }

      // Count backed campaigns
      if (contribAmount > BigInt(0)) {
        backed++;
      }
    }

    setDashboardStats({ created, backed, active });
  }, [
    allCampaignIds,
    userAddress,
    campaignQueries.map(q => q.data), // Re-run when any campaign data changes
    contributionQueries.map(q => q.data), // Re-run when any contribution data changes
  ]);

  return null; // This component renders nothing
}

/* ==============================================
   Dashboard Statistics Cards
   ============================================== */
function DashboardStats({
  allCampaignIds,
  stats,
}: {
  allCampaignIds: number[];
  stats: { created: number; backed: number; active: number };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard icon={<Rocket className="w-6 h-6" />} label="Total Campaigns" value={allCampaignIds.length} color="blue" />
      <StatCard icon={<Heart className="w-6 h-6" />} label="My Projects" value={stats.created} color="green" />
      <StatCard icon={<Coins className="w-6 h-6" />} label="Backed" value={stats.backed} color="purple" />
      <StatCard icon={<TrendingUp className="w-6 h-6" />} label="Active" value={stats.active} color="orange" />
    </div>
  );
}

/* ==============================================
   Created Campaigns List
   ============================================== */
function CreatedCampaignsList({
  allCampaignIds,
  userAddress,
}: {
  allCampaignIds: number[];
  userAddress: `0x${string}` | undefined;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCampaignIds.map((id) => (
        <CreatorCampaignCard key={id} campaignId={id} userAddress={userAddress} />
      ))}
    </div>
  );
}

/* ==============================================
   Backed Campaigns List
   ============================================== */
function BackedCampaignsList({
  allCampaignIds,
  userAddress,
}: {
  allCampaignIds: number[];
  userAddress: `0x${string}` | undefined;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allCampaignIds.map((id) => (
        <BackerCampaignCard key={id} campaignId={id} userAddress={userAddress} />
      ))}
    </div>
  );
}

/* ==============================================
   Shared UI Components
   ============================================== */
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: 'blue' | 'green' | 'purple' | 'orange';
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

/* ==============================================
   Creator Campaign Card
   ============================================== */
function CreatorCampaignCard({
  campaignId,
  userAddress,
}: {
  campaignId: number;
  userAddress: `0x${string}` | undefined;
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

  if (isLoading || !campaign) return null;

  const { title, goal, raised, duration, creator } = campaign as any;

  const isCreator = userAddress && creator?.toLowerCase() === userAddress.toLowerCase();
  if (!isCreator) return null;

  const progress = Number(raised || 0) > 0 ? (Number(raised) / Number(goal || 1)) * 100 : 0;
  const goalFormatted = formatUnits(goal || BigInt(0), 6);
  const raisedFormatted = formatUnits(raised || BigInt(0), 6);

  const durationDate = new Date(Number(duration) * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((durationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isActive = now < durationDate;
  const canWithdraw = !isActive && progress >= 100;

  return (
    <article className="bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        {savedImage ? (
          <img src={savedImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">{title?.charAt(0) || '?'}</div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          CREATOR
        </div>
        {canWithdraw && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            ✓ Can Withdraw
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors line-clamp-2">
          {title}
        </h3>

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
              <div className="text-lg font-bold text-gray-700">{progress.toFixed(0)}%</div>
              <div className="text-sm text-gray-500">funded</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{isActive ? `${daysLeft} days left` : 'Ended'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-4 h-4" />
            <span>{Number(totalBackers || 0)} backers</span>
          </div>
        </div>

        <Link
          href={`/campaign/${campaignId}`}
          className="block w-full bg-green-500 text-white py-3 rounded-lg text-sm font-bold hover:bg-green-600 transition-all text-center"
        >
          {canWithdraw ? '💰 Withdraw Funds' : 'Manage Campaign'}
        </Link>
      </div>
    </article>
  );
}

/* ==============================================
   Backer Campaign Card
   ============================================== */
function BackerCampaignCard({
  campaignId,
  userAddress,
}: {
  campaignId: number;
  userAddress: `0x${string}` | undefined;
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

  if (isLoading || !campaign) return null;

  const contributionAmount = myContribution ? BigInt(myContribution.toString()) : BigInt(0);
  const hasContributed = contributionAmount > BigInt(0);
  if (!hasContributed) return null;

  const { title, goal, raised, duration } = campaign as any;

  const progress = Number(raised) > 0 ? (Number(raised) / Number(goal || 1)) * 100 : 0;
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
      <div className="relative h-48 overflow-hidden">
        {savedImage ? (
          <img src={savedImage} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <div className="text-white text-6xl font-bold opacity-20">{title?.charAt(0) || '?'}</div>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Heart className="w-3 h-3 fill-current" />
          BACKED
        </div>
        {hasFailed && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            💸 Refund Available
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-blue-700 font-medium">Your pledge</span>
            <span className="text-lg font-bold text-blue-900">
              ${Number(contributionFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>

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
            <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{isActive ? `${daysLeft} days left` : 'Ended'}</span>
          </div>
          {hasFailed && (
            <span className="text-red-600 font-medium flex items-center gap-1">
              Failed
            </span>
          )}
        </div>

        <Link
          href={`/campaign/${campaignId}`}
          className="block w-full bg-green-500 text-white py-3 rounded-lg text-sm font-bold hover:bg-green-600 transition-all text-center"
        >
          {hasFailed ? '💸 Get Refund' : 'View Campaign'}
        </Link>
      </div>
    </article>
  );
}