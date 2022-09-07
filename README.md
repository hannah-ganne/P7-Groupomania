# Groupomania

This is the front-end and back-end server for Project 7 of the Web Developer path.

## Back-end

### Back-end Prerequisites ###

You will need to have `Node`, `npm`, and `MySQL` installed locally on your machine.

### Back-end Installation ###

Clone this repository. From the **backend** folder of the project, run `npm install`.
To import the database provided with the link to this repository, modify the `.env.template` file using your own MySQL username and password.
Once you have done that, make sure to remove `.template` from the filename.
You can import the database by using the command line as follows `mysql -u username -p < filename.sql`
You can then run the server with `node server` or `nodemon server`
The server should run on `localhost` with default port `3000`. 
If the server runs on another port for any reason, this is printed to the console when the server starts, e.g. `Listening on port 3001`.

## Front-end

###  Front-end Prerequisites ###

You will need to have `npm` installed locally on your machine.

###  Front-end Installation ###

Clone this repository. From the **frontend** folder of the project, run `npm install`. 
You can then run the app with `npm start`
The app should run on `localhost` with default port `3000`. If the app runs on another port for any reason, this is printed to the console when the app starts, e.g. `Something is already running on port 3000. Would you like to run the app on another port instead? (Y/n)` You can press `Y` to go ahead and open the app on another port.