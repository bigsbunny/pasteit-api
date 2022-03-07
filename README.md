
# PasteIt
## **IMPORTANT: KINDLY CHECK OUT THE CLIENT SIDE REPOSITORY FOR PASTEIT TO VIEW THE ENTIRE DETAILS & SCREENSHOTS OF THE PROJECT -  [pasteit-client](https://github.com/bigsbunny/pasteit-client).**

## **This is the backend repository for PasteIt's REST API implementation.**

---

## Project Structure
PasteIt's project files are divided into two repositories which follow a client-server architecture -

- Frontend - [pasteit-client](https://github.com/bigsbunny/pasteit-client)
- Backend (REST API) - [pasteit-api](https://github.com/bigsbunny/pasteit-api)

---
## Tech stack used
- Frontend - ReactJS + TailwindCSS
- Backend - NodeJS, Express, MongoDB Atlas

---
# How to setup PasteIt's backend to test the API

>Clone the repository
```
git clone git@github.com:bigsbunny/pasteit-api.git
```
>Change directoty
```
cd pasteit-api
```
>Setup React
```
npm install
```
>Create a .env file at the root of the project and mention the following data in it
```
MONGODB_URI=<URI TO YOUR MONGODB CLUSTER>
PORT=3001
SERVER = localhost:3001
CLIENT = localhost:3000
```
>Spin up the API server
```
npm start
```

