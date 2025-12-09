"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { anvil, zksync, base } from 'wagmi/chains'

export default getDefaultConfig({
    appName: "CrowdFunding",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [anvil, zksync, base],
    ssr: false
})