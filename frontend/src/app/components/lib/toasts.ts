import toast from 'react-hot-toast';

// ========== TRANSACTION TOASTS ==========

/**
 * Show toast for transaction confirmation
 * Returns toast ID for later updates
 */
export const toastTxSent = () => {
  return toast.loading('⏳ Confirm transaction in your wallet...', {
    duration: Infinity,
  });
};

/**
 * Update toast when transaction is confirming
 */
export const toastTxConfirming = (toastId: string) => {
  toast.loading('⏳ Transaction confirming on blockchain...', {
    id: toastId,
    duration: Infinity,
  });
};

/**
 * Show success when transaction is confirmed
 */
export const toastTxSuccess = (toastId: string, message: string = 'Transaction successful!') => {
  toast.success(message, {
    id: toastId,
    duration: 4000,
  });
};

/**
 * Show error if transaction fails
 */
export const toastTxError = (toastId: string, error: any) => {
  const errorMessage = error?.message || 'Transaction failed';
  const shortMessage = errorMessage.length > 100 
    ? errorMessage.substring(0, 100) + '...' 
    : errorMessage;
  
  toast.error(shortMessage, {
    id: toastId,
    duration: 5000,
  });
};

// ========== CAMPAIGN TOASTS ==========

export const toastCampaignCreated = () => {
  toast.success('🎉 Campaign created successfully!', {
    duration: 4000,
  });
};

export const toastContributionSuccess = (amount: string) => {
  toast.success(`✅ Contributed $${amount} successfully!`, {
    duration: 4000,
  });
};

export const toastApprovalSuccess = () => {
  toast.success('✅ USDC approved! Now click to contribute.', {
    duration: 4000,
  });
};

export const toastWithdrawSuccess = (amount: string) => {
  toast.success(`💰 Withdrew $${amount} successfully!`, {
    duration: 4000,
  });
};

export const toastRefundSuccess = (amount: string) => {
  toast.success(`💸 Refund of $${amount} processed!`, {
    duration: 4000,
  });
};

export const toastMintSuccess = (amount: string) => {
  toast.success(`🎁 Minted ${amount} USDC to your wallet!`, {
    duration: 4000,
  });
};

// ========== MILESTONE TOASTS ==========

export const toastVoteSuccess = (vote: boolean) => {
  const emoji = vote ? '👍' : '👎';
  toast.success(`${emoji} Vote recorded successfully!`, {
    duration: 4000,
  });
};

export const toastMilestoneApproved = () => {
  toast.success('✅ Milestone approved by community!', {
    duration: 4000,
  });
};

export const toastMilestoneRejected = () => {
  toast.error('❌ Milestone rejected by community', {
    duration: 4000,
  });
};

export const toastFundsReleased = (amount: string) => {
  toast.success(`💰 Released $${amount} for milestone!`, {
    duration: 4000,
  });
};

// ========== ERROR TOASTS ==========

export const toastWalletNotConnected = () => {
  toast.error('🔒 Please connect your wallet first', {
    duration: 3000,
  });
};

export const toastInsufficientBalance = () => {
  toast.error('💰 Insufficient USDC balance', {
    duration: 4000,
  });
};

export const toastInvalidAmount = () => {
  toast.error('⚠️ Please enter a valid amount', {
    duration: 3000,
  });
};

export const toastCampaignEnded = () => {
  toast.error('⏰ Campaign has ended', {
    duration: 3000,
  });
};

export const toastNotCreator = () => {
  toast.error('🚫 Only campaign creator can do this', {
    duration: 3000,
  });
};

export const toastNotContributor = () => {
  toast.error('🚫 Only contributors can vote', {
    duration: 3000,
  });
};

// ========== INFO TOASTS ==========

export const toastCopied = () => {
  toast.success('📋 Copied to clipboard!', {
    duration: 2000,
  });
};

export const toastRedirecting = () => {
  toast.loading('🔄 Redirecting...', {
    duration: 2000,
  });
};

// ========== VALIDATION TOASTS ==========

export const toastValidationError = (message: string) => {
  toast.error(message, {
    duration: 4000,
  });
};

// ========== GENERIC TOASTS ==========

export const toastSuccess = (message: string) => {
  toast.success(message, {
    duration: 4000,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    duration: 4000,
  });
};

export const toastInfo = (message: string) => {
  toast(message, {
    icon: 'ℹ️',
    duration: 4000,
  });
};