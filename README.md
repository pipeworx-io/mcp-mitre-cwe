# @pipeworx/mitre-cwe

MITRE [Common Weakness Enumeration (CWE)](https://cwe.mitre.org) MCP — software/hardware weakness taxonomy. Wraps the [CWE API](https://cwe-api.mitre.org/api/v1/). Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `weakness(id, view?)` — CWE record by id (e.g. `79`, `CWE-79`)
- `category(id)` — category record
- `view(id)` — view record (e.g. `1003`)
- `children(id)` — children of a weakness/category/view
- `parents(id)` — parent relationships
- `descendants(id)` — full subtree
- `relationship(source_id, target_id)` — relationship details between two CWEs

## Data source

`https://cwe-api.mitre.org/api/v1/`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "mitre-cwe": {
      "url": "https://gateway.pipeworx.io/mitre-cwe/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Mitre Cwe data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
