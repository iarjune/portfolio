import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';

export type RolePersona = 'persona1' | 'persona2' | 'persona3';

export interface SkillItem {
  name: string;
  personas?: RolePersona[];
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
    cloud_k8s: SkillItem[];
    gitops_cicd: SkillItem[];
    data_ml_search: SkillItem[];
    devsecops_observability: SkillItem[];
    hardware_networking: SkillItem[];
    infrastructure_as_code: SkillItem[];
    ai_developer_tooling: SkillItem[];
    scripting_devtools: SkillItem[];
  };
  case_studies: {
    id: string;
    title: string;
    problem: string;
    solution: string;
    metrics: string[];
    architecture: string;
  }[];
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

