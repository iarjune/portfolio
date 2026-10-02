import fs from 'fs';
import path from 'path';
import * as yaml from 'js-yaml';
import { TopologyData } from '@/types/topology';

export function getSystemTopology(): TopologyData {
  const filePath = path.join(process.cwd(), 'data/system-topology.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents) as TopologyData;
  return data;
}
