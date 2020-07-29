import React from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Favor = (props) => {

    // const user = useSelector(store => store.user.token)
    // this hard coded token is just for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2Zhdm9yc2FwcEBnbWFpbC5jb20iLCJpZCI6IjVmMjE2Y2Y0ODA2ODZhNmZlYzQ1ZTdkMSIsImlhdCI6MTU5NjAzNTAzOH0.xMcJ0Cxw38bgjmPzhtTS0qYGplhMCMZTWhEa50KKUT8"
    const favor = props.favor
    console.log(`http://localhost:3001/api/favors/accept/${favor.id}`)

    const accept = async () => {
        try {
            axios({
                      method: 'put', //you can set what request you want to be
                      url: "http://localhost:3001/api/favors/accept/" + favor.id,
                      headers: {
                        Authorization: 'bearer ' + token
                  }
                })
            console.log("favor accpeted")
            if (favor.accepted) {console.log("you are not the first to accept this favor")}
        }
        catch (error) {console.log(error.response)}
    }

    return (
        <div>
            Title : {favor.title}
            <div>Details : {favor.details}</div>
            <div> Posted : {favor.posted_date_time}</div>
            <div> Price : {favor.price ? `${favor.price}$`  : "no price"}</div>
            <button onClick={accept}>I will do it!</button>
            {favor.accepted ? <div>someone has already accepted this favor</div> : <></>}
            <br></br><br></br>
        </div>
    )
}

export default Favor
