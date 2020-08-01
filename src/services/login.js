import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const login = async credentials => {
	try {
		const response = await axios.post(baseUrl, credentials)
		return response
	}
	catch (error) {
		if (!error.response) return {data : {error : "we have had on problem on the server side"}}
		console.log(error.response)
		return error.response
	}
}

const verify = async credentials => {
	try {
		const response = await axios.post(baseUrl + '/verifyToken', credentials)
		return response
	}
	catch (error) {
		if (!error.response) return {data : {error : "we have had on problem on the server side"}}
		console.log(error.response)
		return error.response
	}
}


const resend = async email => {
	try {
		const response = await axios.post(baseUrl + '/resendToken', {email})
		return response
	}
	catch (error) {
		if (!error.response) return {data : {error : "we have had on problem on the server side"}}
		console.log(error.response)
		return error.response
	}
}


export default { login, verify, resend }
