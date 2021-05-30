import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Typography } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import axios from "axios";
import RqdocList from "./RqdocList";

export default class RqdocPage extends Component {
  state = {
    counts: [],
    lists: [],
  };

  componentDidMount = async () => {
    // GET /manage/rqdoc/counts
    try {
      const response = await axios.get("/manage/rqdoc/counts");
      const { status, data } = response;
      if (status === 200) {
        const { state } = this;

        this.setState({
          ...state,
          counts: data,
        });
      }
    } catch (e) {}
  };

  handleClick = async (currentPs, actionPs) => {
    // GET /manage/rqdocs

    try {
      const response = await axios.post("/manage/rqdocs", {
        currentPs,
        actionPs,
      });

      const { status, data } = response;
      if (status === 200) {
        const { state } = this;

        this.setState({
          ...state,
          lists: data,
        });
      }
    } catch (e) {}
  };

  render() {
    const { cnt1, cnt2, cnt3, cnt4, cnt5 } = this.state.counts;

    return (
      <div style={{ marginRight: 55 }}>
        <Grid container spacing={3} style={{ margin: 10 }}>
          <Grid item style={{width:250}}>
            <Card
              style={{ height: 200 }}
              variant="outlined"
              onClick={() => this.handleClick("결제완료", "배송대기")}
            >
              <CardContent style={{ margin: 20 }}>
                {cnt1 !== 0 && (
                  <Badge badgeContent={"N"} color="error">
                    <Typography
                      style={{ marginLeft: 30, marginRight: 7 }}
                      variant="h6"
                    >
                      {" "}
                      <b>결제완료</b>
                    </Typography>
                  </Badge>
                )}
                {cnt1 === 0 && (
                  <Typography
                    style={{ marginLeft: 30, marginRight: 7 }}
                    variant="h6"
                  >
                    {" "}
                    <b>결제완료</b>
                  </Typography>
                )}
                <Typography
                  style={{
                    marginLeft: 30,
                    marginTop: 20,
                    color: "#3B5998",
                  }}
                  variant="h3"
                >
                  {" "}
                  <b> {cnt1} 건</b>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{width:250}}>
            <Card
              style={{ height: 200 }}
              variant="outlined"
              onClick={() => this.handleClick("배송대기", "배송중")}
            >
              <CardContent style={{ margin: 20 }}>
                {cnt2 !== 0 && (
                  <Badge badgeContent={"N"} color="error">
                    <Typography
                      style={{ marginLeft: 30, marginRight: 7 }}
                      variant="h6"
                    >
                      {" "}
                      <b>배송 대기</b>
                    </Typography>
                  </Badge>
                )}
                {cnt2 === 0 && (
                  <Typography
                    style={{ marginLeft: 30, marginRight: 7 }}
                    variant="h6"
                  >
                    {" "}
                    <b>배송 대기</b>
                  </Typography>
                )}
                <Typography
                  style={{
                    marginLeft: 30,
                    marginTop: 20,
                    color: "#3B5998",
                  }}
                  variant="h3"
                >
                  {" "}
                  <b> {cnt2} 건</b>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{width:250}}>
            <Card
              style={{ height: 200 }}
              variant="outlined"
              onClick={() => this.handleClick("배송중", "배송완료")}
            >
              <CardContent style={{ margin: 20 }}>
                {cnt3 !== 0 && (
                  <Badge badgeContent={"N"} color="error">
                    <Typography
                      style={{ marginLeft: 25, marginRight: 7 }}
                      variant="h6"
                    >
                      {" "}
                      <b>배송 중</b>
                    </Typography>
                  </Badge>
                )}
                {cnt3 === 0 && (
                  <Typography
                    style={{ marginLeft: 25, marginRight: 7 }}
                    variant="h6"
                  >
                    {" "}
                    <b>배송 중</b>
                  </Typography>
                )}
                <Typography
                  style={{
                    marginLeft: 30,
                    marginTop: 20,
                    color: "#3B5998",
                  }}
                  variant="h3"
                >
                  {" "}
                  <b> {cnt3} 건</b>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{width:250}}>
            <Card
              style={{ height: 200 }}
              variant="outlined"
              onClick={() => this.handleClick("배송완료", "구독종료")}
            >
              <CardContent style={{ margin: 20 }}>
                <Typography
                  style={{ marginLeft: 30, marginRight: 7 }}
                  variant="h6"
                >
                  {" "}
                  <b>배송 완료</b>
                </Typography>

                <Typography
                  style={{
                    marginLeft: 30,
                    marginTop: 20,
                    color: "#3B5998",
                  }}
                  variant="h3"
                >
                  {" "}
                  <b> {cnt4} 건</b>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item style={{width:250}}>
            <Card
              style={{ height: 200 }}
              variant="outlined"
              onClick={() => this.handleClick("구독종료", "구독종료")}
            >
              <CardContent style={{ margin: 20 }}>
                <Typography
                  style={{ marginLeft: 30, marginRight: 7 }}
                  variant="h6"
                >
                  {" "}
                  <b>구독 종료</b>
                </Typography>

                <Typography
                  style={{
                    marginLeft: 30,
                    marginTop: 20,
                    color: "#3B5998",
                  }}
                  variant="h3"
                >
                  {" "}
                  <b> {cnt5} 건</b>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <RqdocList lists={this.state.lists} />
        </Grid>
      </div>
    );
  }
}
