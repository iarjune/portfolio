"use client";

import {
  SiArgo,
  SiGithubactions,
  SiKubernetes,
  SiHelm,
  SiDocker,
  SiTerraform,
  SiDatadog
} from 'react-icons/si';
import {
  GitBranch,
  Workflow,
  Boxes,
  GitPullRequest,
  Layers,
  Cpu,
  Cloud,
  Server,
  Database,
  Activity,
  Shield,
  Terminal,
  Code,
  Box
} from 'lucide-react';

interface Props {
  logoKey: string;
  className?: string;
}

export default function LogoIcon({ logoKey, className = "w-5 h-5" }: Props) {
  const normalizedKey = logoKey?.toLowerCase() || '';

  switch (normalizedKey) {
    // Requested Simple Icons
    case 'argocd': case 'argo':
      return <SiArgo className={className} />;
    case 'githubactions': case 'github-actions': case 'github':
      return <SiGithubactions className={className} />;
    case 'kubernetes': case 'eks-a':
      return <SiKubernetes className={className} />;
    case 'helm':
      return <SiHelm className={className} />;
    case 'docker': case 'docker-server':
      return <SiDocker className={className} />;
    case 'terraform':
      return <SiTerraform className={className} />;
    case 'datadog':
      return <SiDatadog className={className} />;

    // Platform & Developer Experience
    case 'backstage':
      return <Layers className={className} />;
    case 'crossplane':
      return <Cpu className={className} />;

    // Infrastructure, Networking & Runtime
    case 'envoy': case 'envoy-api-gateway':
      return <Shield className={className} />;
    case 'aws': case 'amazon-ecr': case 'ssm':
      return <Cloud className={className} />;

    // Observability
    case 'prometheus': case 'grafana':
      return <Activity className={className} />;

    // Languages & Runtimes
    case 'go': case 'java': case 'python': case 'nodejs': case 'node.js':
      return <Code className={className} />;

    // Default Fallback
    default:
      return <Server className={className} />;
  }
}