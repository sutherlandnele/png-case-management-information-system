#echo "Running pre-start script"
#echo "SiteURL: $SITE_URL"

#sed -i '/const hostname/ c\const hostname = "'$SITE_URL'";' /app/src/config/endpoints.js

#cat ./src/config/endpoints.js