
# PasteIt
## **This is the backend repository for PasteIt's REST API implementation.**

---
PasteIt is a project created for polynomial.ai's internship drive of 2022. This project is submitted by -

- Name: Bighnesh Sahoo
- College ID: B319013
- College: IIIT Bhubaneswar

---
## Project Structure
PasteIt's project files are divided into two repositories which follow a client-server architecture -

- Frontend - [polynomial-assignment-client](https://github.com/bigsbunny/polynomial-assignment-client)
- Backend (REST API) - [polynomial-assignment-api](https://github.com/bigsbunny/polynomial-assignment-api)

---
## Tech stack used
- Frontend - ReactJS + TailwindCSS
- Backend - NodeJS, Express, MongoDB Atlas

---
# How to setup PasteIt's backend to test the API

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
MONGODB_URI=<URI TO YOUR MONGODB CLUSTER>
PORT=3001
SERVER = localhost:3001
CLIENT = localhost:3000
```
>Spin up the API server
```
npm start
```

