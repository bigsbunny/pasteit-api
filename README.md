
# PasteIt
## Easily generate links to share text, code snippets and other data with people with **PasteIt**!

---
PasteIt is a project created for polynomial.ai's internship drive of 2022. This project is submitted by -

- Name: Bighnesh Sahoo
- College ID: B319013
- College: IIIT Bhubaneswar

---
## Project Structure
PasteIt's project files are divided into two repositories which follow a client-server architecture -

- Frontend - [polynomial-assignment-client](https://github.com/bigsbunny/polynomial-assignment-client)
- Backend (REST API) - [polynomial-assignment-client](https://github.com/bigsbunny/polynomial-assignment-api)

---
## Tech stack used
- Frontend - ReactJS + TailwindCSS
- Backend - NodeJS, Express, MongoDB Atlas

---
# How to setup PasteIt's frontend to test the API

>Clone the repository
```
git clone git@github.com:bigsbunny/polynomial-assignment-api.git
```
>Change directoty
```
cd polynomial-assignment-api
```
>Setup React
```
npm install
```
>Create a .env file at the root of the project and mention the following data in it
```
MONGODB_URI=<YOUR MONGODB CLUSTER>
PORT=3001
SERVER = localhost:3001
CLIENT = localhost:3000
```
>Start the React Live server
```
npm start
```
## Implementation

- The frontend of the project is deployed on Heroku at the URL [https://tranquil-tor-67097.herokuapp.com/](https://tranquil-tor-67097.herokuapp.com/), which can be used to test the REST API created for the project, so as to match the instructions given in the project guidelines. 
- The frontend acts as the client to the REST API of PasteIt deployed on Heroku at [https://young-eyrie-03918.herokuapp.com/](https://young-eyrie-03918.herokuapp.com/), which sends requests with relevant data to the API and gets JSON response back from the API.
