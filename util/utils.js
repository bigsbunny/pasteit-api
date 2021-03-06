const { nanoid } = require('nanoid');
const axios = require('axios');

const calculateValidity = (currentDate) => {
    return new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
}

const generateShortID = () => {
    return nanoid();
}

const encryptData = async (data, key) => {
    try {
        const url = 'https://classify-web.herokuapp.com/api/encrypt';
        const jsonData = JSON.stringify({
            data: data, 
            key: key
        });
        axios.post(url, jsonData).then((response) => {
            return response;
        })
        // let response = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: jsonData
        // });
        // const result = await response.json();
        // console.log("here", result);
    } catch(err) {
        console.error(err);
    }
}

module.exports = { calculateValidity, generateShortID, encryptData }