import React from 'react';
import { getCareerData } from '@/lib/data';
import HomeClient from '@/components/HomeClient';

export default async function HomePage() {
  const careerData = getCareerData();

  return <HomeClient careerData={careerData} />;
}
