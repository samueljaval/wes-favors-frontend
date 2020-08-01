import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Favor from './Favor'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import {
  Redirect,Link
} from "react-router-dom"

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
    const [posting, setPosting] = useState(false)

    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "darkred",
    }}))

    const classes = useStyles()

    return (
        <div>
        <Container component="main" >
        <CssBaseline />
        {posting ? <Redirect to = "/posting"/> : <></>}
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>W</Avatar>
          <Typography component="h1" variant="h4">
            WESFAVORS
          </Typography>
        <div>
        <br></br>
        <Button style={{color:"red", fontWeight: "bold"}} onClick={() => setPosting(true)} variant="contained"
        size="small">Post A Favor</Button>
        <br></br><br></br>
        {favors ? favors.map(favor => <Favor key={favor.id} favor={favor}/>) : <></>}
        </div>
        </div>
        </Container>
        </div>
    )
}

export default Feed
