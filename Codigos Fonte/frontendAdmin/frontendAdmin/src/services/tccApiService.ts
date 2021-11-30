import axios from "axios"

const connect = axios.create({
    baseURL: "http://localhost:7586"
})

export default connect