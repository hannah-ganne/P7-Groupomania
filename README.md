# Groupomania

This is the front-end and back-end server for Project 7 of the Web Developer path.

### Sign-up and Sign-in page ###
![Groupomania mockup](https://user-images.githubusercontent.com/48105337/193148144-84d8b04e-3a15-4d37-abd4-a20109e1b860.png)

### Homepage and error page ###
![Groupomania mockup (1)](https://user-images.githubusercontent.com/48105337/193148401-d0b2f84f-51c8-47ea-8b2e-4d72e51e6989.png)

### Post page ###
![Groupomania mockup (2)](https://user-images.githubusercontent.com/48105337/193148520-59c4ed42-e8ec-422e-9344-e445742a4990.png)


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
