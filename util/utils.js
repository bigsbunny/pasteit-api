const { nanoid } = require('nanoid')

const calculateValidity = (currentDate) => {
    return new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
}

const generateShortID = () => {
    return nanoid();
}

module.exports = { calculateValidity, generateShortID }