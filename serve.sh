#!/usr/bin/env bash
# ---------------------------------------------------------------
# Sparkon Labs — local preview server
#
# Usage:
#   ./serve.sh            # serves on port 8000
#   ./serve.sh 8080       # serves on a custom port
#
# Then view the site at  http://localhost:<PORT>/  (after SSH
# port-forwarding from the HPC cluster — see README.md).
# Press Ctrl+C to stop.
# ---------------------------------------------------------------
set -e

PORT="${1:-8000}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Serving Sparkon Labs website from: $DIR"
echo "URL (after port-forwarding): http://localhost:${PORT}/"
echo "Press Ctrl+C to stop."
echo

# Bind to 0.0.0.0 so it is reachable through an SSH tunnel.
cd "$DIR"
python3 -m http.server "$PORT" --bind 0.0.0.0
