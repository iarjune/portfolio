import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { Subsystem } from '@/types/topology';

export type RolePersona = 'persona1' | 'persona2' | 'persona3';

export interface SkillItem {
  name: string;
  personas?: RolePersona[];
}

export interface DeepDiveSection {
  title: string;
  content: string;
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

export function getCareerData(): CareerData {
  const filePath = path.join(process.cwd(), 'data', 'career.yml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents) as CareerData;
}

