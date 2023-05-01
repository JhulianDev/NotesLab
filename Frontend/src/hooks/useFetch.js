import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { API_URL } from "../env/env"
import axios from "axios"
import { getToken } from "../helpers/auth"

const useFetch = (endpoint, headers = {}) => {
    const navigate = useNavigate()

    const [data, setData] = useState()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!getToken()) {
            navigate("/login")
        } else {
            const config = {
                headers: {
                    ...headers,
                    Authorization: `Bearer ${getToken()}`
                }
            }
            axios.get(`${API_URL}/${endpoint}`, config)
                .then((resp) => {
                    setData(resp.data)
                })
                .catch((error) => {
                    setError(error)
                    console.log("-------------------------------------")
                    console.log(error.response.data.message)
                    console.log("-------------------------------------")
                })
                .finally(() => {
                    setLoading(false)
                })
        }

    }, [])

    return { data, error, loading, setData, setError, setLoading}
}

export default useFetch