import React, { Component } from 'react'
import { Icon} from 'semantic-ui-react'
import { Button } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Axios, { post } from "axios";
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class ComboBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            value:1
        };
        //this.handleMonth = this.handleMonth.bind(this);
    }

    handleChange = (e, {value}) => {
        this.setState({ value: e.target.value })
        this.props.onData(e.target.value);
    }

   render() {

    const { month } = this.state;

    return (
      <div>
         <InputLabel id="demo-simple-select-required-label">'월'을 선택해주세요.</InputLabel>
        <Select
          labe="'월'을 선택해주세요."
          id="demo-simple-select-required"
          value={month}
          onChange={this.handleChange}
          style={{width: 150}}
          >
          <MenuItem value={1}>1월</MenuItem>
          <MenuItem value={2}>2월</MenuItem>
          <MenuItem value={3}>3월</MenuItem>
          <MenuItem value={4}>4월</MenuItem>
          <MenuItem value={5}>5월</MenuItem>
          <MenuItem value={6}>6월</MenuItem>
          <MenuItem value={7}>7월</MenuItem>
          <MenuItem value={8}>8월</MenuItem>
          <MenuItem value={9}>9월</MenuItem>
          <MenuItem value={10}>10월</MenuItem>
          <MenuItem value={11}>11월</MenuItem>
          <MenuItem value={12}>12월</MenuItem>
        </Select>
      </div>
    );
    }
  }

export default class CtlSeasonAddBtn extends Component {

    state = {
        
        flowerNm: '', 
        flowerInfo: '', 
        month:0,

        file: null,
    }

    // 버튼클릭시
    handleClickOpen= () => {
        this.setState({
            open: true, // Dialog 창을 열어준다
        });
    }

    handleClose= () => {

        this.setState({
            open: false, // Dialog 텍스트를 초기화 하고 닫아준다
        });
    }

    handleValueChange = (e) => {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleFileInput = (e) => {
        this.setState({
            file: e.target.files[0],
        });
    }

    handleMonthChange = (e) => {
        this.setState({
            month: e
        })
    }

    createReview() {
        const url = "/season/save";
  
        const formData = new FormData();
        const { flowerNm, flowerInfo, month } = this.state;

        formData.append("file", this.state.file);
  
        const config = {
            headers: {
                "Content-type": "multipart/form-data",
            },
        };
  
        const json = `{ "flowerNm": "${flowerNm}", "flowerInfo": "${flowerInfo}", "month": "${month}"}`;
        console.log(json);
  
        formData.append("json", json);
        return post(url, formData, config);
    }

    handleFormSubmit = (e) => {

        e.preventDefault();

        this.createReview()
            .then((response) => {
                console.log(response.data);
                // refresh this page
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleMonth = (data) => {

        this.setState({
            month: data,
        });
    }

    render() {
        return (
            <div>
                <Button
                    variant="contained"
                    color='primary'
                    onClick={this.handleClickOpen}
                    style={{
                        width:200, paddingLeft: 15, paddingRight: 15, fontSize: 17, margin: 15,
                    }}
                 >
                   시즌 상품 등록하기
                </Button>

              <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  fullWidth
                  maxWidth="sm"
                >
                  <DialogTitle>상품 등록</DialogTitle>

                  <form onSubmit={this.handleFormSubmit}>
                      <DialogContent>
                        사진을 등록해주세요 .. <br />
                          <input type="file" name="file" file={this.state.file} onChange={e => this.handleFileInput(e)} /><br />

                      </DialogContent>
                      <DialogContent>

                        <ComboBox style={{maringBottom: 15}} onData = {this.handleMonth}/>
                        <TextField
                              style={{ marginBottom: 15, marginTop: 20}}
                              variant="outlined"
                              autoFocus
                              fullWidth
                              helperText="꽃 이름을 입력해주세요.."
                              label="꽃 이름"
                              type="text"
                              name="flowerNm"
                              value={this.state.flowerNm}
                              onChange={this.handleValueChange}
                          /><br />

                        <TextField
                              style={{ marginBottom: 15 }}
                              fullWidth
                              label="상세 설명"
                              rows="6"
                              multiline
                              margin="normal"
                              variant="filled"
                              name="flowerInfo"
                              value={this.state.flowerInfo}
                              helperText="상세 설명을 입력해주세요.."
                              onChange={this.handleValueChange}
                          /><br />
                      </DialogContent>

                      <DialogActions>
                        <Button type="submit" variant="contained" color="primary" onClick={this.handleFormSubmit && this.handleClose }>작성완료</Button>
                        <Button variant="outlined" color="default" onClick={this.handleClose}>닫기</Button>
                      </DialogActions>
                  </form>
              </Dialog>
            </div>
        )
    }
}
