# mcp-mitre-cwe

MITRE CWE API MCP.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 673+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `weakness` | CWE weakness record. |
| `category` | CWE category record. |
| `view` | CWE view record (e.g. "1003" = Weaknesses for Simplified Mapping). |
| `children` | Children of a weakness/category/view. |
| `parents` | Parent relationships. |
| `descendants` | Full descendant subtree. |
| `relationship` | Relationship details between two CWEs. |

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

Or connect to the full Pipeworx gateway for access to all 673+ data sources:

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

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
