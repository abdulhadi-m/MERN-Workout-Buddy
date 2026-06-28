M: Mongo (DB)
**|** E: ExpressJS (Backend)
**|** R: ReactJS (Frontend)
**|** N: NodeJS (Backend)

# Frontend (Browser/Client Side)                 Backend (Server Side)                  DB

        React App                                  NodeJS + ExpressJS                  MongoDb

## Backend:
```
    npm init -y
    npm i express
    npm i -g nodemon
    npm i dotenv
    npm i mongoose
```

## Run: ```npm run dev```

## API Endpoints: 
* ```GET       /workout        --> Get all workout docs```
* ```POST      /workout        --> Create a new workout doc```
* ```GET       /workout/:id    --> Get a single workout doc```
* ```DELETE    /workout/:id    --> Delete a single workout doc```
* ```PATCH     /workout/:id    --> Update a single workout doc```

## Frontend:
```
    npx create-react-app frontend
    npm i react-router-dom
    npm start
```
