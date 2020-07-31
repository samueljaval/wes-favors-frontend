import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Favor from './Favor'


const Feed = () => {

    // this hard coded token is just for testing
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
        {favors ? favors.map(favor => <Favor key={favor.id} favor={favor}/>) : <></>}
        </div>
        </div>
    )
}

export default Feed
