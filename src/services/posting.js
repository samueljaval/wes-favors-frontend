import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/favors'

const posting = async (info) => {
    // hardcoded just for testing
	const token = process.env.REACT_APP_TOKEN

	try {
		const response = await axios.post(baseUrl, info, {headers: {Authorization: 'bearer ' + token}})
		return response
	}
	catch (error) {
		if (!error.response) return {data : {error : "we have had on problem on the server side"}}
		console.log(error.response)
		return error.response
	}
}

export default { posting }
