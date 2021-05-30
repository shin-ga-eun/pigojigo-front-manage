import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import {Link} from "react-router-dom";
import Axios from 'axios'

export default class SeasonItem extends Component {

    handleDelete = async (sid) => {

        try {
            const response = await Axios.post("/season/del", {
                sid
                }
                ,{
                headers: {
                    "Content-type":"application/json",
                }
            });
            alert("삭제 되었습니다.");

            // refresh this page
            window.location.reload();
            
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }

    render() {
        const { seasons } = this.props;

        return (
            <div>
               <Grid container spacing={3}>
                    {seasons.map(season => (
                        <Grid item key={seasons} xs={12} sm={6} md={4}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={season.imgUrl}
                                        title={season.flowerNm}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h7" component="h7">
                                            <b style={{color: '#0000FF'}}> {season.month} 월의 시즌상품 </b>
                                        </Typography> <br/>
                                        <Typography gutterBottom variant="h6" component="h6">
                                            <b> {season.flowerNm} </b>
                                            
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="h6">
                                            {season.flowerInfo}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                    <Button variant='outlined' color='primary' onClick={() => this.handleDelete(season.sid)}>삭제</Button>
                                    </CardActions>
                                </CardActionArea>
                            </Card>

                        </Grid>
                    ))}

                </Grid> 
            </div>
        )
    }
}
