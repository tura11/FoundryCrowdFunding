'use client'


import '@rainbow-me/rainbowkit/styles.css';
import {RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import config from "../rainbowKitConfig"
import { ToastProvider } from './components/ToastProvider';


const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                    <ToastProvider />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}