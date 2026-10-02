export interface Component {
  name: string;
  spec: string;
}

export interface Subsystem {
  id: string;
  name: string;
  type: string;
  logoKey: string;
  description: string;
  techStackLogos: string[];
  gitopsPath?: string;
  repoUrl: string;
  components: Component[];
}

export interface Domain {
  id: string;
  name: string;
  summary: string;
  icon: string;
  subsystems: Subsystem[];
}

export interface TopologyData {
  domains: Domain[];
}
