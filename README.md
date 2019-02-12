# How To

 1. Run *npm install* inside each folder (frontend, login & backend)
 2. Export crud.sql 
 3. Check your current database configuration in *backend/routes/index.js* line 8
 4. if you're using pm2 then use this command

        pm2 start backend/bin/www --name backend
        pm2 start frontend/bin/www --name frontend
        pm2 start login/bin/www --name login

or using regular *npm start*

    cd backend && npm start
    cd frontend && npm start
    cd login && npm start

*Make sure port 3000 , 3010 & 3020 is available

Login using http://localhost:3000
