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
3. Input `npm install` after opening the application with a terminal
4. Set MongoDB in `.env` file
```
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```
5. Then type as following:
```
npm run seed // add testing data in MongoDB, if you want to add youself, you can skip it
npm run start
```
6. If you see the following info, it represents that working well, then go ahead to `http://localhost:3000` when opening the browser

```
  Listening on http://localhost:3000  
```
7. If you want to shut down the application, press `ctrl + c` in terminal 

## Package environment
- node.js 18.13.0
- express 4.18.2
- express-handlebars 7.0.4
- mongoose 7.0.3
- dotenv 16.0.3
- method-override 3.0.0

## Tools
- Bootstrap 5.3.0
- Font-awesome 6.4.0

## Future Optimization
- [ ]  use dropdown box to sort restaurants by alphabet, categories, location
- [ ] embedded google map in detail page

