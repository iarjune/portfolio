import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

export type RolePersona = 'persona1' | 'persona2' | 'persona3';

export interface SkillItem {
  name: string;
  personas?: RolePersona[];
}

export interface DeepDiveLink {
  label: string;
  url: string;
}

export interface DeepDiveSection {
  title: string;
  content?: string;
  image?: string;
  links?: DeepDiveLink[];
}

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
  repoUrl?: string;
  components: Component[];
}

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  metrics: string[];
  architecture: string;
  deep_dive_sections?: DeepDiveSection[];
  subsystems?: Subsystem[];
}

export interface StrategicDomain {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  case_studies: CaseStudy[];
}

export interface CareerData {
  basics: {
    name: string;
    label: string;
    location: string;
    status: string;
    value_props: Record<RolePersona, string>;
  };
  skills: {
    leadership_engineering_management: SkillItem[];
    infrastructure_cloud: SkillItem[];
    kubernetes_container_platforms: SkillItem[];
    infrastructure_as_code: SkillItem[];
    gitops_cicd_release: SkillItem[];
    mlops_ml_platform: SkillItem[];
    data_streaming_distributed_systems: SkillItem[];
    observability_reliability_devsecops: SkillItem[];
    ai_llm_developer_tooling: SkillItem[];
    networking_compute: SkillItem[];
    storage_data_center: SkillItem[];
    automation_scripting_api: SkillItem[];
    engineering_tools_collaboration: SkillItem[];
    [key: string]: SkillItem[];
  };
  strategic_domains: StrategicDomain[];
  experience: {
    company: string;
    image: string;
    location: string;
    tenure: string;
    roles: string[];
    achievements: string[];
    tags: string[];
  }[];
  resumes: Record<RolePersona, string>;
}

function getDataFilePath(filenameWithoutExt: string): string | null {
  const possibleDirs = [
    path.join(process.cwd(), 'data'),
    path.join(process.cwd(), 'portfolio', 'data'),
  ];
  const extensions = ['.yml', '.yaml'];

  for (const dir of possibleDirs) {
    for (const ext of extensions) {
      const fullPath = path.join(dir, `${filenameWithoutExt}${ext}`);
      if (fs.existsSync(fullPath)) {
        return fullPath;
      }
    }
  }
  return null;
}

export function getStrategicDomains(): StrategicDomain[] {
  const filePath = getDataFilePath('strategic_domains');
  if (filePath) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const parsed = yaml.load(fileContents) as any;
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (parsed && Array.isArray(parsed.strategic_domains)) {
        return parsed.strategic_domains;
      }
    } catch (error) {
      console.error('Error loading strategic_domains file:', error);
    }
  }
  return [];
}

export function getSkills(): CareerData['skills'] {
  const filePath = getDataFilePath('skills');
  if (filePath) {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const parsed = yaml.load(fileContents) as any;
      if (parsed) {
        if (parsed.skills && typeof parsed.skills === 'object') {
          return parsed.skills;
        }
        return parsed;
      }
    } catch (error) {
      console.error('Error loading skills file:', error);
    }
  }
  return {} as CareerData['skills'];
}

export function getCareerData(): CareerData {
  let careerData: Partial<CareerData> = {};
  const careerFilePath = getDataFilePath('career');
  if (careerFilePath) {
    try {
      const fileContents = fs.readFileSync(careerFilePath, 'utf8');
      careerData = (yaml.load(fileContents) as CareerData) || {};
    } catch (error) {
      console.error('Error loading career file:', error);
    }
  }

  // Load strategic domains from strategic_domains.yml (fallback to career.yml if present)
  const separateDomains = getStrategicDomains();
  if (separateDomains && separateDomains.length > 0) {
    careerData.strategic_domains = separateDomains;
  } else if (!careerData.strategic_domains) {
    careerData.strategic_domains = [];
  }

  // Load skills from skills.yml (fallback to career.yml if present)
  const separateSkills = getSkills();
  if (separateSkills && Object.keys(separateSkills).length > 0) {
    careerData.skills = separateSkills;
  } else if (!careerData.skills) {
    careerData.skills = {} as CareerData['skills'];
  }

  return careerData as CareerData;
}

