import { SiArgo, SiGithubactions, SiKubernetes, SiHelm, SiDocker, SiTerraform } from 'react-icons/si';
import React from 'react';

const iconMap: Record<string, React.ElementType> = {
  argocd: SiArgo,
  githubactions: SiGithubactions,
  kubernetes: SiKubernetes,
  helm: SiHelm,
  docker: SiDocker,
  terraform: SiTerraform,
};

export default function LogoIcon({ logoKey, className }: { logoKey: string; className?: string }) {
  const Icon = iconMap[logoKey];
  if (!Icon) return <span className={className}>Icon</span>;
  return <Icon className={className} />;
}
