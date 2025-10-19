#!/bin/bash

# Deploy script for Pune Book Fest Chatbot

# Commit and push changes to GitHub (assuming origin is set)
echo "Committing and pushing changes to GitHub..."
git add .
git commit -m "Fix: Update CORS configuration and improve error handling"
git push origin main

echo "Changes pushed to GitHub. Please redeploy your Render service to apply changes."
echo "Visit https://dashboard.render.com/ to trigger a new deployment."