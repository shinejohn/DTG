#!/bin/bash

echo "🚀 Starting production server..."

# Start the server in the background
NODE_ENV=production react-router-serve ./build/server/index.js &
SERVER_PID=$!

# Give server a moment to start
sleep 2

# Run cache warming
echo "🔥 Running cache warming..."
tsx scripts/warm-cache.ts

# Keep the server running in the foreground
wait $SERVER_PID