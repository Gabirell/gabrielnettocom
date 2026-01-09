#!/bin/bash
# Quick script to check if gabrielnetto.com is working

echo "🔍 Checking gabrielnetto.com status..."
echo ""

# Check DNS resolution
echo "1️⃣ DNS Resolution:"
dns_result=$(dig +short gabrielnetto.com)
if [ "$dns_result" = "163.176.225.87" ]; then
    echo "   ✅ DNS: Correctly resolves to 163.176.225.87"
else
    echo "   ⚠️  DNS: $dns_result (expected 163.176.225.87)"
fi
echo ""

# Check HTTP connection
echo "2️⃣ HTTP Connection:"
http_status=$(curl -o /dev/null -s -w "%{http_code}" -m 5 http://gabrielnetto.com 2>/dev/null)
if [ "$http_status" = "200" ] || [ "$http_status" = "301" ] || [ "$http_status" = "302" ]; then
    echo "   ✅ HTTP: Site is responding (Status: $http_status)"
else
    echo "   ❌ HTTP: Cannot connect (Status: $http_status)"
fi
echo ""

# Check HTTPS connection
echo "3️⃣ HTTPS Connection:"
https_status=$(curl -o /dev/null -s -w "%{http_code}" -m 5 https://gabrielnetto.com 2>/dev/null)
if [ "$https_status" = "200" ] || [ "$https_status" = "301" ] || [ "$https_status" = "302" ]; then
    echo "   ✅ HTTPS: SSL is working (Status: $https_status)"
else
    echo "   ⚠️  HTTPS: Not yet configured (Status: $https_status)"
    echo "   💡 This is normal - SSL comes after domain activation"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$http_status" = "200" ] || [ "$http_status" = "301" ] || [ "$http_status" = "302" ]; then
    echo "🎉 DOMAIN IS ACTIVE! You can now set up the uptime monitor!"
    echo ""
    echo "Next steps:"
    echo "  1. Set up SSL certificate (if not working)"
    echo "  2. Configure Google Sheets OAuth"
    echo "  3. Activate smart uptime monitor"
elif [ "$dns_result" = "163.176.225.87" ]; then
    echo "⏳ DNS is correct, waiting for domain activation..."
    echo ""
    echo "What to do:"
    echo "  - Wait 1-8 hours after email verification"
    echo "  - Run this script again in 1-2 hours"
else
    echo "⚠️  Still waiting for DNS/domain activation"
    echo ""
    echo "What to do:"
    echo "  - Make sure you clicked the verification email"
    echo "  - Wait up to 8 hours"
    echo "  - Run this script again later"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
