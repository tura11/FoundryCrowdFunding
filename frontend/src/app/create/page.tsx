'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Plus, Trash2 } from 'lucide-react';

interface Tier {
  name: string;
  description: string;
  minContribution: string;
  maxBackers: number;
}

interface Milestone {
  description: string;
  percentage: number;
  deadline: number;
}

export default function CreateCampaign() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { 
    campaignCount,
    createCampaign,
    isPending,
    isConfirming,
    isConfirmed,
    error 
  } = useCrowdFunding();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [duration, setDuration] = useState('30');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ✨ NOWE - Edytowalne tiers
  const [tiers, setTiers] = useState<Tier[]>([
    {
      name: 'Bronze Supporter',
      description: 'Basic supporter tier',
      minContribution: '10',
      maxBackers: 100
    }
  ]);

  // ✨ NOWE - Edytowalne milestones
  const [milestones, setMilestones] = useState([
    { description: 'First milestone', percentage: 50, daysAfterEnd: 30 },
    { description: 'Final milestone', percentage: 50, daysAfterEnd: 60 }
  ]);

  useEffect(() => {
    if (isConfirmed && imageUrl) {
      const newCampaignId = Number(campaignCount || 0);
      localStorage.setItem(`campaign-${newCampaignId}-image`, imageUrl);
      setTimeout(() => router.push('/'), 2000);
    } else if (isConfirmed) {
      setTimeout(() => router.push('/'), 2000);
    }
  }, [isConfirmed, imageUrl, router, campaignCount]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setImageUrl(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageUrl('');
  };

  // ✨ Tier handlers
  const addTier = () => {
    if (tiers.length >= 5) {
      alert('Maximum 5 tiers allowed');
      return;
    }
    setTiers([...tiers, {
      name: `Tier ${tiers.length + 1}`,
      description: '',
      minContribution: '10',
      maxBackers: 50
    }]);
  };

  const removeTier = (index: number) => {
    if (tiers.length <= 1) {
      alert('At least 1 tier required');
      return;
    }
    setTiers(tiers.filter((_, i) => i !== index));
  };

  const updateTier = (index: number, field: keyof Tier, value: string | number) => {
    const newTiers = [...tiers];
    newTiers[index] = { ...newTiers[index], [field]: value };
    setTiers(newTiers);
  };

  // ✨ Milestone handlers
  const addMilestone = () => {
    if (milestones.length >= 5) {
      alert('Maximum 5 milestones allowed');
      return;
    }
    setMilestones([...milestones, {
      description: `Milestone ${milestones.length + 1}`,
      percentage: 0,
      daysAfterEnd: 30
    }]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length <= 2) {
      alert('At least 2 milestones required');
      return;
    }
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: string, value: string | number) => {
    const newMilestones = [...milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setMilestones(newMilestones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Connect your wallet first!');
      return;
    }

    // Validate milestones sum to 100%
    const totalPercentage = milestones.reduce((sum, m) => sum + Number(m.percentage), 0);
    if (totalPercentage !== 100) {
      alert(`Milestones must sum to 100% (currently ${totalPercentage}%)`);
      return;
    }

    try {
      const now = Math.floor(Date.now() / 1000);
      const campaignEndTime = now + (parseInt(duration) * 24 * 60 * 60);
      
      const formattedMilestones = milestones.map(m => ({
        description: m.description,
        percentage: Number(m.percentage),
        deadline: campaignEndTime + (Number(m.daysAfterEnd) * 24 * 60 * 60)
      }));

      await createCampaign(
        title,
        goal,
        description,
        parseInt(duration),
        tiers,
        formattedMilestones
      );
    } catch (err: any) {
      console.error('Error creating campaign:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to projects
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Start a project
          </h1>
          <p className="text-lg text-gray-600">
            Create your campaign and bring your idea to life
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Image Upload (bez zmian) */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Project image
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload an image that represents your project (optional)
              </p>
              
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 hover:bg-gray-50 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or GIF (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isPending || isConfirming}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Basic Info (bez zmian) */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Project basics</h3>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Project title *
                </label>
                <input
                  type="text"
                  placeholder="Name your project"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 transition-all"
                  required
                  disabled={isPending || isConfirming}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {title.length}/200 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Project description *
                </label>
                <textarea
                  placeholder="Describe what you're raising funds for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900 transition-all"
                  rows={5}
                  required
                  disabled={isPending || isConfirming}
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {description.length}/200 characters
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* Funding */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Funding</h3>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Funding goal (USDC) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      placeholder="1000"
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 transition-all"
                      required
                      min="100"
                      step="1"
                      disabled={isPending || isConfirming}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum: $100
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Campaign duration (days) *
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 transition-all"
                    required
                    min="1"
                    max="365"
                    disabled={isPending || isConfirming}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum: 365 days
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* ✨ REWARD TIERS - EDITABLE */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Reward Tiers</h3>
                <button
                  type="button"
                  onClick={addTier}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  disabled={tiers.length >= 5}
                >
                  <Plus className="w-4 h-4" />
                  Add Tier
                </button>
              </div>

              {tiers.map((tier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">Tier {index + 1}</span>
                    {tiers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTier(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Tier name"
                    value={tier.name}
                    onChange={(e) => updateTier(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    maxLength={200}
                  />

                  <textarea
                    placeholder="Tier description"
                    value={tier.description}
                    onChange={(e) => updateTier(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    rows={2}
                    maxLength={200}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Min Contribution ($)
                      </label>
                      <input
                        type="number"
                        value={tier.minContribution}
                        onChange={(e) => updateTier(index, 'minContribution', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                        min="10"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Max Backers
                      </label>
                      <input
                        type="number"
                        value={tier.maxBackers}
                        onChange={(e) => updateTier(index, 'maxBackers', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                        min="1"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* ✨ MILESTONES - EDITABLE */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Milestones</h3>
                  <p className="text-sm text-gray-600">Must sum to 100%</p>
                </div>
                <button
                  type="button"
                  onClick={addMilestone}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  disabled={milestones.length >= 5}
                >
                  <Plus className="w-4 h-4" />
                  Add Milestone
                </button>
              </div>

              {milestones.map((milestone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-700">Milestone {index + 1}</span>
                    {milestones.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Milestone description"
                    value={milestone.description}
                    onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                    maxLength={200}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Percentage (%)
                      </label>
                      <input
                        type="number"
                        value={milestone.percentage}
                        onChange={(e) => updateMilestone(index, 'percentage', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                        min="10"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Days after campaign ends
                      </label>
                      <input
                        type="number"
                        value={milestone.daysAfterEnd}
                        onChange={(e) => updateMilestone(index, 'daysAfterEnd', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                        min="1"
                        max="365"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Total percentage display */}
              <div className={`text-sm font-medium text-center p-2 rounded-lg ${
                milestones.reduce((sum, m) => sum + Number(m.percentage), 0) === 100
                  ? 'bg-green-50 text-green-700'
                  : 'bg-yellow-50 text-yellow-700'
              }`}>
                Total: {milestones.reduce((sum, m) => sum + Number(m.percentage), 0)}%
                {milestones.reduce((sum, m) => sum + Number(m.percentage), 0) === 100 ? ' ✓' : ' (must be 100%)'}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Platform fee</p>
                  <p className="text-blue-700">3% fee on successful campaigns</p>
                </div>
              </div>
            </div>

            {/* Error/Success (bez zmian) */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 mb-1">Error creating campaign</p>
                  <p className="text-sm text-red-700">{error.message}</p>
                </div>
              </div>
            )}

            {isConfirmed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Success!</p>
                  <p className="text-sm text-green-700">Campaign created. Redirecting...</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={!isConnected || isPending || isConfirming}
                className="w-full bg-green-500 text-white py-4 px-6 rounded-full font-bold text-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isPending && '⏳ Preparing transaction...'}
                {isConfirming && '⏳ Confirming on blockchain...'}
                {!isPending && !isConfirming && !isConnected && '🔒 Connect wallet to continue'}
                {!isPending && !isConfirming && isConnected && 'Launch project'}
              </button>
              
              {isConnected && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  By continuing, you agree to our Terms of Service
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Tips (bez zmian) */}
        <div className="mt-12 bg-gray-100 rounded-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Tips for a successful campaign
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Choose a clear, compelling title that describes your project</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Set a realistic funding goal based on your actual needs</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Write a detailed description explaining what you'll create</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Add a high-quality image that represents your vision</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}