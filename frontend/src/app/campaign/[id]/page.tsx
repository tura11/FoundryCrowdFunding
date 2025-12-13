import ClientCampaignDetail from './ClientCampaignDetail';

export default async function CampaignDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaignId = parseInt(id);
  
  return <ClientCampaignDetail campaignId={campaignId} />;
}