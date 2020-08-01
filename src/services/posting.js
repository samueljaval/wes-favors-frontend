import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/favors'

const posting = async (info) => {
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2Zhdm9yc2FwcEBnbWFpbC5jb20iLCJpZCI6IjVmMjE2Y2Y0ODA2ODZhNmZlYzQ1ZTdkMSIsImlhdCI6MTU5NjAzNTAzOH0.xMcJ0Cxw38bgjmPzhtTS0qYGplhMCMZTWhEa50KKUT8"
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
