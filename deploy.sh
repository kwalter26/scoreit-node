!#/bin/bash
curl -H "Content-Type: application/json" --data '{"source_type": "Branch", "source_name": "master"}' -X POST https://registry.hub.docker.com/u/kwalter26/scoreit-node/trigger/40d5e8eb-2ea9-4077-9fca-1cf0bdbfade6/
