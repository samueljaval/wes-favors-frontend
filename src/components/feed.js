import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Favor from './Favor'
import ListAltIcon from '@material-ui/icons/ListAlt';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const Feed = ({category}) => {
    // this hard coded token is just for testing
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Indlc2Zhdm9yc2FwcEBnbWFpbC5jb20iLCJpZCI6IjVmMmRjOTI5MjdhNGMwMmYyOTBiMzI0OCIsImlhdCI6MTU5NjgzNjEzN30.C8dDJfxKa4tdQjkANxUhuiOfyDVEp2FQ1VBCP1ado_4"
    // const token = useSelector(store => store.user.token)

    useEffect(() => {
      axios
        .get('http://localhost:3001/api/favors', {headers: {Authorization: 'bearer ' + token}})
        .then(response => {
          setFavors(response.data)
        })
      }, [])

    const [favors, setFavors] = useState()
    console.log(favors)
    const useStyles = makeStyles((theme) => ({
      paper: {
        marginTop: theme.spacing(2),
        // display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
      // margin: theme.spacing(1),
      backgroundColor: "darkred",
    }}))

    const classes = useStyles()

    return (
        <div>
        <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
        <Grid container spacing={1}>
            <Grid item>
            <Avatar className={classes.avatar}><ListAltIcon/></Avatar>
            </Grid>
            <Grid item>
            <Typography component="h2" variant="h5">
              {category ? category.toUpperCase(): "ALL CATEGORIES"}
            </Typography>
            </Grid>
        </Grid>
        <div>
        {favors ? (category && category !== "Completed") ?
                    favors
                        .filter(favor => !favor.accepted).reverse()
                        .filter(favor => favor.category === category)
                        .map(favor => <Favor showButton={true} key={favor.id} favor={favor}/>)
                    :
                    (
                        (category === "Completed") ?
                        favors
                            .filter(favor => favor.accepted).reverse()
                            .map(favor => <Favor showButton={false} key={favor.id} favor={favor}/>)
                        :
                        favors
                            .filter(favor => !favor.accepted).reverse()
                            .map(favor => <Favor showButton={true} key={favor.id} favor={favor}/>)
                    )
                    : <></>}
        </div>
        </div>
        </Container>
        </div>
    )
}

export default Feed
