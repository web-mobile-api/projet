import { Connector } from "./connection";

export const getAccountById = async (id) => {
    Connector.axios.get("http://localhost:3000/v1/account/" + id)
    .then((response) => {
        console.log(response.data)
    })
    .catch((error) => {
        if (isCancel(error)) {
            console.log('Request canceled', error.message);
        } else {
            console.log(error)
        }
    })
}

