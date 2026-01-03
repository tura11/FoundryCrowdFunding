'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useAccount, usePublicClient } from 'wagmi';
import Link from 'next/link';
import { formatUnits } from 'viem';
import { Rocket, Plus, Heart, Sparkles, TrendingUp, Users, Clock, Target } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { isConnected } = useAccount();
  const { campaignCount } = useCrowdFunding();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const campaignIds = campaignCount 
    ? Array.from({ length: Number(campaignCount) }, (_, i) => i)
    : [];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 flex items-center justify-center">
        <div className="text-gray-800 text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-green-300/30 to-emerald-400/30 rounded-full blur-3xl transition-all duration-300"
          style={{
            top: '10%',
            left: `${20 + mousePosition.x * 0.05}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-300/20 to-cyan-400/20 rounded-full blur-3xl transition-all duration-300"
          style={{
            bottom: '20%',
            right: `${10 + mousePosition.x * 0.03}%`,
            transform: 'translate(50%, 50%)',
          }}
        />
        
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                CrowdFund
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                  Discover
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                </Link>
                {isConnected && (
                  <>
                    <Link href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                      Dashboard
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                    <Link href="/create" className="text-gray-700 hover:text-green-600 font-medium transition-colors relative group">
                      Start a project
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </>
                )}
              </nav>
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 bg-transparent border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full shadow-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700">100% Decentralized Platform</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-slide-up">
            <span className="block bg-gradient-to-r from-gray-900 via-green-800 to-emerald-900 bg-clip-text text-transparent">
              Bring creative
            </span>
            <span className="block bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              projects to life
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Create campaigns you believe in. Connect with creators.
            <br />
            <span className="font-semibold text-green-600">Make something awesome happen.</span>
          </p>

          {isConnected && (
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:shadow-2xl transition-all shadow-lg transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Start your project
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 bg-white/60 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-8">
            <StatCard 
              icon={<Target className="w-7 h-7" />}
              value={campaignCount?.toString() || '0'}
              label="Projects"
              color="green"
            />
            <StatCard 
              icon={<TrendingUp className="w-7 h-7" />}
              value="100%"
              label="Decentralized"
              color="emerald"
            />
            <StatCard 
              icon={<Sparkles className="w-7 h-7" />}
              value="Web3"
              label="Powered"
              color="teal"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Projects we love</h2>
            <p className="text-gray-600">Discover amazing campaigns from our community</p>
          </div>
          <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 border border-gray-200">
            <button className="px-6 py-2 bg-green-500 text-white rounded-full font-medium transition-all">
              All
            </button>
            <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-full font-medium transition-all">
              Popular
            </button>
            <button className="px-6 py-2 text-gray-600 hover:text-gray-900 rounded-full font-medium transition-all">
              Ending soon
            </button>
          </div>
        </div>

        {campaignIds.length === 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl blur-2xl opacity-50" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 p-16 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl" />
                <div className="relative w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-12 h-12 text-green-500" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No projects yet</h3>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Be the first creator to launch a campaign and inspire others
              </p>
              
              {isConnected && (
                <Link
                  href="/create"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:shadow-2xl transition-all shadow-lg transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Launch your project
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaignIds.map((id) => (
            <CampaignCard key={id} campaignId={id} chainTimestamp={chainTimestamp} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2025 CrowdFund. Powered by Tymek and Kuba.</p>
            <p className="text-sm">Decentralized • Transparent • Community-driven</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float linear infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-slide-up { animation: slide-up 1s ease-out forwards; }
      `}</style>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode, value: string, label: string, color: string }) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-500',
    emerald: 'from-emerald-500 to-teal-500',
    teal: 'from-teal-500 to-cyan-500'
  };

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:border-green-300 transition-all transform hover:scale-105 text-center">
        <div className={`inline-flex p-3 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl text-white mb-3 shadow-lg`}>
          {icon}
        </div>
        <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
}

function CampaignCard({ campaignId, chainTimestamp }: { campaignId: number, chainTimestamp: number }) {
  const { useCampaign } = useCrowdFunding();
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = localStorage.getItem(`campaign-${campaignId}-image`);
      setSavedImage(img);
    }
  }, [campaignId]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-200 animate-pulse">
        <div className="h-64 bg-gray-200"></div>
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!campaign) return null;

  const campaignData = campaign as any;
  if (!campaignData.title || campaignData.title === '' || campaignData.goal === BigInt(0)) return null;

  const title = campaignData.title;
  const goal = campaignData.goal || BigInt(0);
  const raised = campaignData.raised || BigInt(0);
  const duration = campaignData.duration || BigInt(0);
  const description = campaignData.description || 'No description';
  
  const progress = Number(raised) > 0 ? (Number(raised) / Number(goal)) * 100 : 0;
  const goalFormatted = formatUnits(goal, 6);
  const raisedFormatted = formatUnits(raised, 6);
  
  const durationTimestamp = Number(duration);
  const currentTime = chainTimestamp || Math.floor(Date.now() / 1000);
  const daysLeft = Math.max(0, Math.ceil((durationTimestamp - currentTime) / 86400));
  const isActive = currentTime < durationTimestamp;

  return (
    <Link 
      href={`/campaign/${campaignId}`}
      className="group block"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      <div className="relative">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            transform: isHovered ? 'scale(1.1)' : 'scale(0.9)',
            transition: 'transform 0.5s ease-out',
          }}
        />

        <article 
          className="relative bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500"
          style={{
            transform: isHovered 
              ? `rotateX(${(mousePosition.y - 50) / 20}deg) rotateY(${(mousePosition.x - 50) / 20}deg) translateZ(10px)`
              : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div className="relative h-64 overflow-hidden">
            <div 
              className="absolute inset-0"
              style={{
                transform: isHovered 
                  ? `scale(1.1) translate(${(mousePosition.x - 50) / 5}px, ${(mousePosition.y - 50) / 5}px)`
                  : 'scale(1)',
                transition: 'transform 0.3s ease-out',
              }}
            >
              {savedImage ? (
                <img 
                  src={savedImage} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <div className="text-white text-6xl font-bold opacity-20">
                    {title?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                </div>
              )}
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-2xl font-black text-gray-900">
                    ${Number(raisedFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">raised</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-700">
                    ${Number(goalFormatted).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">goal</span>
                </div>
              </div>

              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full transition-all duration-1000"
                  style={{ 
                    width: `${Math.min(progress, 100)}%`,
                    boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
                  }}
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-600">
                  <span className="font-bold text-gray-900">{progress.toFixed(0)}%</span> funded
                </div>
                <div className="text-gray-600">
                  <span className="font-bold text-gray-900">{daysLeft}</span> {isActive ? 'days left' : 'ended'}
                </div>
              </div>
            </div>
          </div>

          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            }}
          />
        </article>
      </div>
    </Link>
  );
}