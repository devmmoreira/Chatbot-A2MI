import Axios from 'axios'

const connect = Axios.create({
    baseURL: "http://192.168.1.14:7586"
})

export default connect