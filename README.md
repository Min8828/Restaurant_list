# My Restaurant List
Record your own restaurant list. You can browse restaurants, view detailed info, and even link to the Google map

## Features
- Browse all restaurants
- View detailed info about the restaurant
- Link restaurant location to the Google map
- Search for a specific restaurant you like
- add the new restaurant, edit, delete


## Usage
1. Be sure that you've already installed `node.js` and `npm`
2. Clone to the local repository
3. Input `npm install` after opening the project with a terminal
4. Set MongoDB
```
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```
5. Then type as following:
```
npm run seed //if you have the seed, you can set
npm run start
```
6. If you see the following info, it represents that working well, then go ahead to `http://localhost:3000` when opening the browser

```
  Listening on http://localhost:3000  
```
7. If you want to shut down the project, press `ctrl + c` in terminal 

## Package environment
- Node.js 18.13.0
- Express 4.18.2
- Express-handlebars 7.0.4
- Mongoose 7.0.3

## Tools
- Bootstrap 5.3.0
- Font-awesome 6.4.0

