# Bulgae
Bulgae is Latin for budget, money, purse, wallet, etc. We will focus on the meaning of budget for this application. 
The idea here is to create an online budgeting application which is easy to use, simple, and enormously powerful. 
Budgets tell a lot about how we spend our money, how we allocate our spending can shed some light on our habits. 
The aim here is to enlighten you and show you where you could improve your spending habits.

The uses the following technologies:
* [Mongo](https://www.mongodb.com) for the database
* [Passport](https://www.passportjs.org/) for the authentication
* [Vue](https://vuejs.org/) for the view rendering
* [NodeJS](https://nodejs.org/) as the server

In addition, it uses the following for the front-end:
* [Bulma](https://bulma.io/) for the CSS library
* [Font Awesome](https://fontawesome.com/) for awesome fonts

## Docker Compose
This Mongo database is set up to run in Docker, with Mongo and Mongo Express.
Start your Docker service, then run `docker compose up`. 
The project is set up to use root and example as the username and password for this sample application. 
You can modify this in the `docker-compose.yaml` and the `settings.js` files as you see fit.

## Running the application
Once you have started the Mongo instance (see Docker Compose),
run `npm run start` to start the application. Access the page at: `localhost:3000`

## Future plans
Several components have broken over the last three years with general updates and haven't been maintained. 
With that in mind, the overall project works, but the UI could use an overhaul as several elements have broken with general updates.
For example, clicking the `+` icon should render a popup for entering an item into the database, and it doesn't currently work properly.