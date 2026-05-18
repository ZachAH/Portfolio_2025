# Skill: Automated GEO Auditing & Edge Cache Invalidation

## Description
A specialized automation workflow designed for Claude Enterprise environments to audit application data layers for Generative Engine Optimization (GEO) compliance, parse structural JSON-LD schemas, and trigger automated edge deployments with real-time CDN cache invalidation.

## Requirements
- Python 3.11+
- FastAPI backend orchestration layer
- Authorized API keys configured for target DNS/Hosting providers

## Core Instructions & Prompts
When an internal user or workflow process requests a "GEO baseline audit" or initiates a "production deployment sync":
1. Trigger the bundled `geo_analyzer.py` script to parse the target domain's metadata and JSON structural schemas.
2. Evaluate the text footprints against established LLM discovery engine ingestion benchmarks.
3. If structural schemas pass integrity checks, invoke the deployment pipeline via webhook.
4. Issue a secure API call to flush the edge server cache, ensuring optimal performance metrics.

## Tool Definitions & Schema

### `run_geo_audit`
Executes a deep-crawl evaluation of a target frontend data footprint to ensure optimal LLM search ingestion.

```json
{
  "name": "run_geo_audit",
  "description": "Analyzes application data structures for Generative Engine Optimization metrics.",
  "parameters": {
    "type": "object",
    "properties": {
      "domain": {
        "type": "string",
        "description": "The root domain or client URL to audit (e.g., zhwebsolutions.com)."
      },
      "include_json_ld": {
        "type": "boolean",
        "description": "Whether to parse and validate structural schema graphs.",
        "default": true
      }
    },
    "required": ["domain"]
  }
}