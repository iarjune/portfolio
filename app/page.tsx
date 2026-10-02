import React from 'react';
import { getCareerData } from '@/lib/data';
import { getSystemTopology } from '@/lib/topology';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const careerData = getCareerData();
  const topologyData = getSystemTopology();

  return <HomeClient careerData={careerData} topologyData={topologyData} />;
}
