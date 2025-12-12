'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { Rocket, Plus, TrendingUp, Clock, Target, Users, Heart, DollarSign } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const { campaignCount } = useCrowdFunding();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const campaignIds = campaignCount 
    ? Array.from({ length: Number(campaignCount) }, (_, i) => i)
    : [];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800 text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Kickstarter-style Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">CrowdFund</span>
            </Link>

            {/* Nav */}
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                  Discover
                </Link>
                {isConnected && (
                  <Link href="/create" className="text-gray-700 hover:text-gray-900 font-medium">
                    Start a project
                  </Link>
                )}
              </nav>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Bring creative projects to life
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Back campaigns you believe in. Connect with creators. Make something awesome happen.
          </p>
          {isConnected && (
            <Link
              href="/create"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Start your project
            </Link>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">{campaignCount?.toString() || '0'}</div>
              <div className="text-sm text-gray-600 mt-1">Projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600 mt-1">Decentralized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Web3</div>
              <div className="text-sm text-gray-600 mt-1">Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Projects we love
          </h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border-b-2 border-green-500">
              All
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              Popular
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">
              Ending soon
            </button>
          </div>
        </div>

        {/* Empty State */}
        {campaignIds.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to launch a campaign
            </p>
            {isConnected && (
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all"
              >
                <Plus className="w-5 h-5" />
                Start your project
              </Link>
            )}
          </div>
        )}

        {/* Campaign Grid */}
        {campaignIds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaignIds.map((id) => (
              <CampaignCard key={id} campaignId={id} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 CrowdFund. Powered by Web3.</p>
            <p className="text-sm">Decentralized • Transparent • Community-driven</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CampaignCard({ campaignId }: { campaignId: number }) {
  const { useCampaign } = useCrowdFunding();
  const { data: campaign, isLoading } = useCampaign(campaignId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  const campaignData = campaign as any;
  const title = campaignData.title || 'Untitled';
  const goal = campaignData.goal || BigInt(0);
  const raised = campaignData.raised || BigInt(0);
  const duration = campaignData.duration || BigInt(0);
  const description = campaignData.description || 'No description';
  const creator = campaignData.creator || '0x0000000000000000000000000000000000000000';
  const state = campaignData.state !== undefined ? campaignData.state : 0;
  
  const progress = Number(raised) > 0 ? (Number(raised) / Number(goal)) * 100 : 0;
  const goalFormatted = formatUnits(goal, 6);
  const raisedFormatted = formatUnits(raised, 6);
  
  const durationDate = new Date(Number(duration) * 1000);
  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((durationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const isActive = now < durationDate;

  return (
    <Link href={`/campaign/${campaignId}`} className="group">
      <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300">
        
        {/* Image Placeholder */}
        <div className="relative h-64 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="text-white text-6xl font-bold opacity-20">
            {title.charAt(0).toUpperCase()}
          </div>
          {state === 1 && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ✓ Funded
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Creator */}
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <Users className="w-4 h-4" />
            <span>by {creator.slice(0, 6)}...{creator.slice(-4)}</span>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${raisedFormatted}
                </div>
                <div className="text-sm text-gray-500">
                  pledged of ${goalFormatted} goal
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {daysLeft}
                </div>
                <div className="text-sm text-gray-500">
                  {isActive ? 'days to go' : 'ended'}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm">
            <span className="text-gray-600">{progress.toFixed(0)}% funded</span>
            <span className="text-green-600 font-medium group-hover:underline">
              View project →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}