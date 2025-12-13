'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useCrowdFunding } from '@/hooks/useCrowdFunding';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

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

  useEffect(() => {
    if (isConfirmed && imageUrl) {
      // Save image to localStorage for the new campaign
      // Campaign ID will be current count
      const newCampaignId = Number(campaignCount || 0);
      localStorage.setItem(`campaign-${newCampaignId}-image`, imageUrl);
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } else if (isConfirmed) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [isConfirmed, imageUrl, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview AND data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        setImageUrl(dataUrl); // ← Use actual uploaded image!
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageUrl('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Connect your wallet first!');
      return;
    }

    try {
      const defaultTiers = [
        {
          name: 'Bronze Supporter',
          description: 'Basic supporter tier',
          minContribution: '10',
          maxBackers: 100
        }
      ];

      const now = Math.floor(Date.now() / 1000);
      const campaignEndTime = now + (parseInt(duration) * 24 * 60 * 60);
      
      const defaultMilestones = [
        {
          description: 'First milestone - 50%',
          percentage: 50,
          deadline: campaignEndTime + (30 * 24 * 60 * 60)
        },
        {
          description: 'Final milestone - 50%',
          percentage: 50,
          deadline: campaignEndTime + (60 * 24 * 60 * 60)
        }
      ];

      await createCampaign(
        title,
        goal,
        description,
        parseInt(duration),
        defaultTiers,
        defaultMilestones
      );
    } catch (err: any) {
      console.error('Error creating campaign:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Start a project
          </h1>
          <p className="text-lg text-gray-600">
            Create your campaign and bring your idea to life
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Project Image */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-3">
                Project image *
              </label>
              <p className="text-sm text-gray-600 mb-4">
                Upload an image that represents your project (optional for demo)
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

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Project Basics */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Project basics</h3>

              {/* Title */}
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

              {/* Description */}
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

            {/* Divider */}
            <div className="border-t border-gray-200"></div>

            {/* Funding */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900">Funding</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Goal */}
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

                {/* Duration */}
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

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Default settings</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Bronze tier: $10 minimum (max 100 backers)</li>
                    <li>• 2 milestones: 50% each</li>
                    <li>• 3% platform fee on success</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 mb-1">Error creating campaign</p>
                  <p className="text-sm text-red-700">{error.message}</p>
                </div>
              </div>
            )}

            {/* Success */}
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

        {/* Tips Section */}
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