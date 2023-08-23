import axios from "axios";

const TOKEN = "cjilru1r01qpo4j4ppcgcjilru1r01qpo4j4ppd0"

export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN
    }
})