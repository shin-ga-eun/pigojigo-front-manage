import React, { Component } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import 
{List,
Menu} from 'semantic-ui-react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {Button} from '@material-ui/core';
import CtlSeasonAddBtn from './CtlSeasonAddBtn';
import SeasonItem from './SeasonItem';
import axios from 'axios';

export default class SeasonPage extends Component {

    state = {
        seasons:[{
            flowerNm: '테스트',
            flowerInfo: '테스트',
            month: 1,
            sid:0,
        }],
    }

    mapToComponents = (data) => {
         
        return <SeasonItem seasons={data} />;
    }
 
     componentDidMount =async () => {
         // GET /seasons
         try {
             const response = await axios.get("/seasons");
             const { status, data } = response;
             if (status === 200) {
                 const { state } = this;

                 this.setState({
                     ...state,
                     seasons: data,
                 });
             }
         } catch (e) {
 
         }
     }

    render() {
        return (
            <div>
            <Container maxWidth="lg"> 
                <CtlSeasonAddBtn/>
                {this.mapToComponents(this.state.seasons)}
            </Container>
            </div>
        )
    }
}
