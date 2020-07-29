import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import axios from 'axios'


const Feed = () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2Zhdm9yc2FwcEBnbWFpbC5jb20iLCJpZCI6IjVmMjE2Y2Y0ODA2ODZhNmZlYzQ1ZTdkMSIsImlhdCI6MTU5NjAzNTAzOH0.xMcJ0Cxw38bgjmPzhtTS0qYGplhMCMZTWhEa50KKUT8"
    // const token = useSelector(store => store.user.token)

    useEffect(() => {
      axios
        .get('http://localhost:3001/api/favors', {headers: {Authorization: 'bearer ' + token}})
        .then(response => {
          setFavors(response.data)
        })
      }, [])

    const [favors, setFavors] = useState()

    const [width, setWidth] = React.useState(window.innerWidth)
    const [height, setHeight] = React.useState(window.innerHeight)
    const updateWidthAndHeight = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    React.useEffect(() => {
        window.addEventListener("resize", updateWidthAndHeight);
        return () => window.removeEventListener("resize", updateWidthAndHeight);
    })

    const title = {
        position: 'absolute',
        left: '50%',
        top: '6%',
        fontSize: (height+width)/40,
        transform: 'translate(-50%, -50%)',
        color : 'darkred'
    }

    return (
        <div>
        <div style={title}>WES FAVORS</div>
        <div style={{position :'absolute',top:'15%'}}>
        {favors ? favors.map(favor => <div key={favor.id}>
                                        Title : {favor.title}
                                        <div>Details : {favor.details}</div>
                                        <div> Posted : {favor.posted_date_time}</div>
                                        <div> Price : {favor.price ? `${favor.price}$`  : "no price"}</div>
                                        <p></p>
                                      </div>) : <></>}
        </div>
        </div>
    )
}

export default Feed
