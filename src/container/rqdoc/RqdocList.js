import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import Axios from "axios";

export default class RqdocList extends Component {
  handleUpdateProgrsCd = async (sid, currentPs, actionPs) => {
    try {
      const response = await Axios.post("/manage/rqdoc/progrscd", {
        sid,
        currentPs,
        actionPs,
      });

      // refresh this page
      window.location.reload();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  render() {
    const { lists } = this.props;

    return (
      <div>
        <Table style={{ marginLeft: 20 }}>
          <TableHead>
            <TableRow>
              <TableCell>신청번호</TableCell>
              <TableCell>신청일</TableCell>
              <TableCell>신청자이메일</TableCell>
              <TableCell>수령횟수(단위: 1개월)</TableCell>
              <TableCell>구독기간(단위: 개월)</TableCell>
              <TableCell>잔여횟수 / 전체횟수</TableCell>
              <TableCell>총 금액</TableCell>
              <TableCell>잔여금</TableCell>
              <TableCell>결제방법</TableCell>
              <TableCell>상태처리</TableCell>
            </TableRow>
          </TableHead>

          {lists && (
            <TableBody>
              {lists.map((c) => (
                <TableRow>
                  <TableCell>{c.rqdocSn}</TableCell>
                  <TableCell>{c.reqDtm}</TableCell>
                  <TableCell>{c.applcntEmail}</TableCell>
                  <TableCell>{c.pickUpCycleCd}</TableCell>
                  <TableCell>{c.paymentCycleCd}</TableCell>
                  <TableCell>
                    {c.remainCnt} / {c.totalCnt}{" "}
                  </TableCell>
                  <TableCell>{c.price}</TableCell>
                  <TableCell>{c.remainPrice}</TableCell>
                  <TableCell>{c.paymentMthCd}</TableCell>
                  <TableCell>
                    {c.currentPs !== "배송완료" && c.remainCnt !== 0 && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          this.handleUpdateProgrsCd(
                            c.sid,
                            c.currentPs,
                            c.actionPs
                          )
                        }
                      >
                        {c.actionPs}
                      </Button>
                    )}
                    {c.currentPs === "배송완료" && c.remainCnt !== 0 && (
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() =>
                          this.handleUpdateProgrsCd(
                            c.sid,
                            c.currentPs,
                            c.currentPs
                          )
                        }
                      >
                        {c.currentPs}
                      </Button>
                    )}
                    {c.currentPs === "배송완료" && c.remainCnt === 0 && (
                      <Button>asdf</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    );
  }
}
