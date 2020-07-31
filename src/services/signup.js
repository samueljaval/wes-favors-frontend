import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/users'

const signup = async credentials => {
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

export default { signup }
