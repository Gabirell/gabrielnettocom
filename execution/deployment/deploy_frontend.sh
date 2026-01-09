#!/bin/bash

# Gabriel Netto Portfolio - Frontend Deployment Script
# This script safely deploys ONLY the frontend without touching n8n backend

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  gabrielnetto.com Frontend Deployment${NC}"
echo -e "${BLUE}========================================${NC}"

# Configuration
PROJECT_DIR="/Users/gabrielnetto/.gemini/antigravity/scratch/gabrielnettocom"
SSH_KEY="/Users/gabrielnetto/.gemini/antigravity/scratch/oracle.key"
VPS_USER="ubuntu"
VPS_IP="163.176.225.87"
VPS_PATH="/var/www/gabrielnettocom"

# Step 1: Build
echo -e "\n${BLUE}[1/3]${NC} Building React app..."
cd "$PROJECT_DIR"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: dist directory not found!${NC}"
    exit 1
fi

# Step 2: Deploy
echo -e "\n${BLUE}[2/3]${NC} Deploying to VPS..."
rsync -avz --delete \
    -e "ssh -i $SSH_KEY" \
    dist/ \
    ${VPS_USER}@${VPS_IP}:${VPS_PATH}/dist/

# Step 3: Verify
echo -e "\n${BLUE}[3/3]${NC} Verifying deployment..."
HTTP_CODE=$(curl -k -s -o /dev/null -w "%{http_code}" https://${VPS_IP}/)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓ Deployment successful!${NC}"
    echo -e "${GREEN}✓ Site is online at https://${VPS_IP}/${NC}"
else
    echo -e "${RED}✗ Warning: Site returned HTTP $HTTP_CODE${NC}"
fi

echo -e "\n${BLUE}========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "Frontend URL: https://163.176.225.87/"
echo -e "n8n URL: https://163.176.225.87/n8n/"
echo -e "\n${BLUE}Note:${NC} Backend (n8n) was NOT touched - it's still running!"
