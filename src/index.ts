interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * MITRE CWE API MCP.
 *
 * Auth: none. Docs: https://cwe-api.mitre.org/api/docs/
 */


const BASE = 'https://cwe-api.mitre.org/api/v1';
const UA = 'pipeworx-mcp-mitre-cwe/1.0 (+https://pipeworx.io)';

const tools: McpToolExport['tools'] = [
  {
    name: 'weakness',
    description: 'CWE weakness record.',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'CWE id (e.g. "79" or "CWE-79")' },
        view: { type: 'string', description: 'Optional view id to retrieve view-specific info.' },
      },
      required: ['id'],
    },
  },
  {
    name: 'category',
    description: 'CWE category record.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'view',
    description: 'CWE view record (e.g. "1003" = Weaknesses for Simplified Mapping).',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'children',
    description: 'Children of a weakness/category/view.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'parents',
    description: 'Parent relationships.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'descendants',
    description: 'Full descendant subtree.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
  {
    name: 'relationship',
    description: 'Relationship details between two CWEs.',
    inputSchema: {
      type: 'object',
      properties: {
        source_id: { type: 'string' },
        target_id: { type: 'string' },
      },
      required: ['source_id', 'target_id'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const id = (s: string) => s.replace(/^CWE-/i, '');
  switch (name) {
    case 'weakness':
      return cweGet(`/cwe/weakness/${id(reqStr(args, 'id', '"79"'))}`);
    case 'category':
      return cweGet(`/cwe/category/${id(reqStr(args, 'id', '"1399"'))}`);
    case 'view':
      return cweGet(`/cwe/view/${id(reqStr(args, 'id', '"1003"'))}`);
    case 'children':
      return cweGet(`/cwe/${id(reqStr(args, 'id', '"79"'))}/children`);
    case 'parents':
      return cweGet(`/cwe/${id(reqStr(args, 'id', '"79"'))}/parents`);
    case 'descendants':
      return cweGet(`/cwe/${id(reqStr(args, 'id', '"79"'))}/descendants`);
    case 'relationship':
      return cweGet(`/cwe/${id(reqStr(args, 'source_id', '"79"'))}/relationships/${id(reqStr(args, 'target_id', '"20"'))}`);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function cweGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
  if (res.status === 404) throw new Error('MITRE CWE: not found');
  if (!res.ok) throw new Error(`MITRE CWE: ${res.status} ${await res.text().then((t) => t.slice(0, 200))}`);
  return res.json();
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
