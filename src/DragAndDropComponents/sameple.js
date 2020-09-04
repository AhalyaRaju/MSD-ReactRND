import React, { Component } from 'react';
import StatusCards from '../Components/status-card';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faChevronUp from '../font-awesome/faChevronUp';
import faChevronDown from '../font-awesome/faChevronDown';
import { Link, Element } from 'react-scroll';

export default class Layout extends Component {
  state = {
    statusCardList: [],
    count: 1,
    HeaderData: [
      'Sales order created',
      'Credit block release',
      'MRP run',
      'Planned order conversion',
      'Purchase requisition created',
      'PR to PO',
      'POs created manually',
      'Purchase order released',
      'Goods receipt',
      'Goods issued production order',
      'Production order confirmed',
      'Vendor invoices created',
      'Vendor invoices paid',
      'Goods picked from WH',
      'Outbound delivery created',
      'Billing document created',
      'Customer payment received'
    ],
    statusPaginationCount: 0,
    upwardstartCount: 1,
    downwardstartCount: 1,
    openStatusonClick: '',
    StatusDataNew: [],
    dataCount: 0,
    POsStatus: 0,
    currentElement: 0,
    showDownArrow: true,
    showUpArrow: false
  };

  formData = (i, status) => {
    var StatusDataNew = this.state.StatusDataNew;

    switch (this.props.Stages[i].headerdata) {
      case 'Sales Order Created':
        StatusDataNew.push({
          heading: this.state.HeaderData[i],
          data: {
            'Customer Id': this.props.Stages[i].kunnr,
            'Sales Order Number': this.props.SalesOrderNo,
            'Delivery Date': this.props.Stages[i].erdat,
            'Line Item': this.props.lineItemNo,
            'Created Date': this.props.Stages[i].erdat,
            'Material Number': this.props.Stages[i].mantnr,
            '': '',
            'Confirmed Quantity': this.props.Stages[i].bmeng
          },
          status: status,
          Date: this.props.Stages[i].erdat
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Credit Block release':
        StatusDataNew.push({
          heading: this.state.HeaderData[i],
          data: {
            'Credit Control Area': this.props.Stages[i].kkber,
            'Sales Order Number': this.props.SalesOrderNo,
            '': '',
            'Line Item': this.props.lineItemNo,
            'Released On': this.props.Stages[i - 1].erdat,
            'Overall Status of credit check': this.props.Stages[i].cmgst
          },
          status: status,
          Date: this.props.Stages[parseInt(i, 10) - 1].erdat
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'MRP Run':
        StatusDataNew.push({
          heading: this.state.HeaderData[i],
          data: {
            'Requirement Date': this.props.Stages[i].dat00,
            'Sales Order Number': this.props.SalesOrderNo,
            Plant: this.props.Stages[i].wrk02,
            'Line Item': this.props.lineItemNo,
            'Processing Status': this.props.Stages[i].vstat
          },
          status: status,
          Date: this.props.Stages[i].dat00
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Converted Planned Order to Production Order ':
        StatusDataNew.push({
          heading: this.state.HeaderData[i],
          data: {
            'production Order No': this.props.Stages[i].aufnr,
            'Sales Order Number': this.props.SalesOrderNo,
            '': '',
            'Line Item': this.props.lineItemNo,

            'Start Date': this.props.Stages[i].gstrp,
            'Material Number': this.props.Stages[i].plnbez,
            'End Date': this.props.Stages[i].gltrp,

            'Order Quantity': this.props.Stages[i].gamng
          },
          status: status,
          Date: this.props.Stages[i].gstrp
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Purchase Requisition Created':
        StatusDataNew.push({
          heading: this.state.HeaderData[i],
          data: {
            'PR No': this.props.Stages[i].banfn,
            'Sales Order Number': this.props.SalesOrderNo,
            Plant: this.props.Stages[i].werks,
            'Line Item': this.props.lineItemNo,
            'Delivery Date': this.props.Stages[i].lfdat,
            'Material Number': this.props.Stages[i].matnr,
            Vendor: this.props.Stages[i].emlif,

            'Order Quantity': this.props.Stages[i].menge
          },
          status: status,
          Date: this.props.Stages[parseInt(i, 10) - 1].gltrp
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Purchase Order Created & Released':
        this.setState({ POsStatus: 1 });

        StatusDataNew.push({
          heading: this.state.HeaderData[i],
          data: {
            'PO No': this.props.Stages[i].ebeln,
            'Sales Order Number': this.props.SalesOrderNo,
            'PO Line Item': this.props.Stages[i].buzei,
            'Line Item': this.props.lineItemNo,
            'Purchase Org': this.props.Stages[i].ekorg,
            '': '',
            Vendor: this.props.Stages[i].lifnr
          },
          status:
            this.props.Stages[i].ebeln !== '' &&
            parseInt(this.props.Stages[i].buzei, 10) === 10
              ? status
              : 'Completed',
          Date: this.props.Stages[parseInt(i, 10) - 1].lfdat
        });
        if (
          this.props.Stages[i].ebeln !== '' &&
          parseInt(this.props.Stages[i].buzei, 10) === 10
        ) {
          if (status === 'In-Progress') {
            for (var j = 0; j < 2; j++) {
              StatusDataNew.push({
                heading:
                  parseInt(j, 10) === 0
                    ? 'POs created manually'
                    : 'Purchase order released',
                data: {},
                status: 'Pending',
                Date: this.props.Stages[parseInt(i, 10) - 1].lfdat
              });
            }
          } else {
            for (var k = 0; k < 2; k++) {
              StatusDataNew.push({
                heading:
                  parseInt(k, 10) === 0
                    ? 'POs created manually'
                    : 'Purchase order released',
                data: {
                  'PO No': this.props.Stages[i].ebeln,
                  'Sales Order Number': this.props.SalesOrderNo,
                  'PO Line Item': this.props.Stages[i].buzei,
                  'Line Item': this.props.lineItemNo,
                  'Purchase Org': this.props.Stages[i].ekorg,
                  'Release Status': this.props.Stages[i].frgzu,
                  Vendor: this.props.Stages[i].lifnr
                },
                status: 'Completed',
                Date: this.props.Stages[parseInt(i, 10) - 1].lfdat
              });
            }
          }
        } else {
          for (var l = 0; l < 2; l++) {
            StatusDataNew.push({
              heading:
                parseInt(l, 10) === 0
                  ? 'POs created manually'
                  : 'Purchase order released',
              data:
                parseInt(l, 10) === 0
                  ? {
                      'PO No': this.props.Stages[i].ebeln,
                      'Sales Order Number': this.props.SalesOrderNo,
                      'PO Line Item': this.props.Stages[i].buzei,
                      'Line Item': this.props.lineItemNo,
                      'Purchase Org': this.props.Stages[i].ekorg,
                      'Release Status': this.props.Stages[i].frgzu,
                      Vendor: this.props.Stages[i].lifnr
                    }
                  : {},
              status: parseInt(l, 10) === 0 ? 'In-Progress' : 'Pending',
              Date: this.props.Stages[parseInt(i, 10) - 1].lfdat
            });
          }
        }
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Purchase Order Goods Receipted':
        StatusDataNew.push({
          heading: this.state.HeaderData[parseInt(i, 10) + 2],
          data: {
            'Documnet No': this.props.Stages[i].mblnr,
            'Sales Order Number': this.props.SalesOrderNo,
            Item: this.props.Stages[i].zeile,
            'Line Item': this.props.lineItemNo,
            Currency: this.props.Stages[i].waers,
            Amount: this.props.Stages[i].dmbtr,
            'Material No': this.props.Stages[i].matnr,
            Vendor: this.props.Stages[i].lifnr,
            Plant: this.props.Stages[i].werks
          },
          status: status,
          Date: this.props.Stages[parseInt(i, 10) - 2].lfdat
        });
        this.setState({ POsStatus: 0 });
        this.setState({ StatusDataNew: StatusDataNew });
        break;

      case 'PO Goods issued to Production Order & Operations Complete':
        StatusDataNew.push({
          heading: this.state.HeaderData[parseInt(i, 10) + 2],
          data: {
            OrderNumber: this.props.Stages[i].aufnr,
            'Sales Order Number': this.props.SalesOrderNo,
            'Order item Number': this.props.Stages[i].posnr,
            'Line Item': this.props.lineItemNo,
            'Material No': this.props.Stages[i - 1].matnr,
            '': '',
            Plant: this.props.Stages[i].werks
          },
          status:
            this.props.Stages[i].aufpl !== '' &&
            parseInt(this.props.Stages[i].vornr, 10) === 10
              ? status
              : 'Completed',
          Date: this.props.Stages[i].strmp
        });
        if (
          this.props.Stages[i].aufpl !== '' &&
          parseInt(this.props.Stages[i].vornr, 10) === 10
        ) {
          StatusDataNew.push({
            heading: this.state.HeaderData[parseInt(i, 10) + 3],
            data: {
              'Order Number': this.props.Stages[i].aufnr,
              'Sales Order Number': this.props.SalesOrderNo,
              'Order item Number': this.props.Stages[i].posnr,
              'Line Item': this.props.lineItemNo,
              'Sart Date': this.props.Stages[i].strmp,
              'Operation No': this.props.Stages[i].vornr,
              'Delivery Schedule': this.props.Stages[i].kdein,

              Plant: this.props.Stages[i].werks
            },
            status: status === 'In-Progress' ? 'Pending' : 'Completed',
            Date: this.props.Stages[i].strmp
          });
        } else {
          StatusDataNew.push({
            heading: this.state.HeaderData[parseInt(i, 10) + 3],
            data: {
              'Order Number': this.props.Stages[i].aufnr,
              'Sales Order Number': this.props.SalesOrderNo,
              'Order item Number': this.props.Stages[i].posnr,
              'Line Item': this.props.lineItemNo,
              'Sart Date': this.props.Stages[i].strmp,
              'Operation No': this.props.Stages[i].vornr,
              'Delivery Schedule': this.props.Stages[i].kdein,

              Plant: this.props.Stages[i].werks
            },
            status: 'In-Progress',
            Date: this.props.Stages[i].strmp
          });
        }
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Vendor Invoice Created':
        this.setState({ POsStatus: 0 });
        StatusDataNew.push({
          heading: this.state.HeaderData[parseInt(i, 10) + 3],
          data: {
            'Posted Date': this.props.Stages[i].budat,
            'Sales Order Number': this.props.SalesOrderNo,
            'Document Number': this.props.Stages[i].belnr,
            'Line Item': this.props.lineItemNo,
            'Related PO Number': this.props.Stages[i].xblnr,
            '': '',
            'Amount in Doc Currency': this.props.Stages[i].wrbtr
          },
          status: status,
          Date: this.props.Stages[i].budat
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Vendor Payment Complete':
        this.setState({ POsStatus: 0 });
        StatusDataNew.push({
          heading: this.state.HeaderData[parseInt(i, 10) + 3],
          data: {
            'Vendor No': this.props.Stages[parseInt(i, 10) - 4].lifnr,
            'Sales Order Number': this.props.SalesOrderNo,
            'Paid Date': this.props.Stages[i].augdt,
            'Line Item': this.props.lineItemNo,
            'Document Number': this.props.Stages[i].belnr,
            'Purchase Order Number': this.props.Stages[i].ebeln,
            'Amount in Doc Currency': this.props.Stages[i].dmbtr,

            'Purchase Order LineItem': this.props.Stages[i].ebelp
          },
          status: status,
          Date: this.props.Stages[i].augdt
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Outbound Delivery Created':
        this.setState({ POsStatus: 0 });
        if (
          this.props.Stages[i].posnr !== '' &&
          parseInt(this.props.Stages[i].vbeld, 10) === 10
        ) {
          StatusDataNew.push({
            heading: this.state.HeaderData[parseInt(i, 10) + 3],
            data: {
              'Shipping Point': this.props.Stages[i].vstel,
              'Sales Order Number': this.props.SalesOrderNo,
              'Material Number': this.props.Stages[i].matnr,
              'Line Item': this.props.lineItemNo
            },
            status: 'Completed',
            Date: this.props.Stages[i].fkdat
          });
          StatusDataNew.push({
            heading: this.state.HeaderData[parseInt(i, 10) + 4],
            data: {
              Customer: this.props.Stages[i].kunag,
              'Sales Order Number': this.props.SalesOrderNo,
              'Material Number': this.props.Stages[i].matnr,
              'Line Item': this.props.lineItemNo,
              'Outbound Delivery No': this.props.Stages[i].vbeld,
              '': '',
              'Delivery Line Item': this.props.Stages[i].posnr
            },
            status: status === 'In-Progress' ? 'In-Progress' : 'Completed',
            Date: this.props.Stages[i].fkdat
          });
        } else {
          StatusDataNew.push({
            heading: this.state.HeaderData[parseInt(i, 10) + 3],
            data: {
              'Shipping Point': this.props.Stages[i].lifnr,
              'Sales Order Number': this.props.SalesOrderNo,
              'Material Number': this.props.Stages[i].augdt,
              'Line Item': this.props.lineItemNo
            },
            status: 'In-Progress',
            Date: this.props.Stages[i].fkdat
          });
          StatusDataNew.push({
            heading: this.state.HeaderData[parseInt(i, 10) + 4],
            data: {
              Customer: this.props.Stages[i].kunag,
              'Sales Order Number': this.props.SalesOrderNo,
              'Material Number': this.props.Stages[i].matnr,
              'Outbound Delivery No': this.props.Stages[i].vbeld,
              'Line Item': this.props.lineItemNo,
              'Delivery Line Item': this.props.Stages[i].posnr
            },
            status: 'Pending',
            Date: this.props.Stages[i].fkdat
          });
        }
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Billing Document Created':
        this.setState({ POsStatus: 0 });
        StatusDataNew.push({
          heading: this.state.HeaderData[parseInt(i, 10) + 4],
          data: {
            Customer: this.props.Stages[i].kunag,
            'Sales Order Number': this.props.SalesOrderNo,
            'Material Number': this.props.Stages[i].matnr,
            'Line Item': this.props.lineItemNo,

            'Invoice Created Date': this.props.Stages[i].erdat,
            Quantity: this.props.Stages[parseInt(i, 10) - 7].menge,

            'Customer Invoice No': this.props.Stages[i].vbelb,
            'Invoice Line Item': this.props.Stages[i].posnr
          },
          status: status,
          Date: this.props.Stages[i].erdat
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      case 'Customer Payment Received':
        this.setState({ POsStatus: 0 });

        StatusDataNew.push({
          heading: this.state.HeaderData[parseInt(i, 10) + 4],
          data: {
            'Created Date': this.props.Stages[i].budat,
            'Sales Order Number': this.props.SalesOrderNo,
            'Invoice No': this.props.Stages[i].vbeln,
            'Line Item': this.props.lineItemNo,
            'Invoice Line Item': this.props.Stages[i].rebzz,
            'Payment Doc No': this.props.Stages[i].augbl,
            Status: 'Fully Paid'
          },
          status: 'Completed',
          Date: this.props.Stages[i].budat
        });
        this.setState({ StatusDataNew: StatusDataNew });
        break;
      default:
        break;
    }
  };
  componentWillMount() {
    var status = 'Pending';
    var dataLength = 0;

    for (var i in this.state.HeaderData) {
      if (i < this.props.Stages.length) {
        if (i < this.props.Stages.length - 1) {
          if (this.state.POsStatus === parseInt(1, 10)) {
            status = 'Pending';
          } else {
            status = 'Completed';
          }
        } else {
          status = 'In-Progress';
        }

        this.formData(i, status);
      } else if (
        this.state.StatusDataNew.length === this.state.HeaderData.length
      ) {
        break;
      } else {
        var StatusDataNew = this.state.StatusDataNew;

        dataLength = this.state.StatusDataNew.length;
        i = dataLength;

        if (parseInt(i, 10) === 17) {
          break;
        } else {
          StatusDataNew.push({
            heading: this.state.HeaderData[i],
            data: {
              Date: ''
            },
            status: 'Pending'
          });
          this.setState({ StatusDataNew: StatusDataNew });
        }
      }
    }
    this.manageData();
  }
  componentDidMount() {
    document.getElementById('upArrow').click();
    this.setState({ currentElement: this.state.currentElement + 1 });
  }
  manageData = () => {
    var statusCardList = [];
    var openStatus = false;
    var openStatusCount = 0;
    var details = [];
    for (var i in this.state.StatusDataNew) {
      if (this.state.StatusDataNew[i].status === 'In-Progress') {
        openStatus = true;
        this.setState({ currentElement: parseInt(i - 1, 10) });

        details.push({
          heading: this.state.StatusDataNew[i].heading,
          data: this.state.StatusDataNew[i].data,
          status: this.state.StatusDataNew[i].status
        });
        openStatusCount += 1;
      } else {
        openStatus = false;
      }
      statusCardList.push(
        <StatusCards
          key={i}
          value={i}
          heading={this.state.StatusDataNew[i].heading}
          status={this.state.StatusDataNew[i].status}
          openStatus={openStatus}
          handleOpen={this.handleOpen(i, i)}
          data={this.state.StatusDataNew[i].data}
          Date={this.state.StatusDataNew[i].Date}
          handleHover={this.handleHover(i, i)}
          hoverStatusClass={'status-card-status-card-9'}
          handleMouseDown={this.handleMouseDown}
        />
      );
    }
    if (openStatusCount > 0) {
      this.setState({ statusCardList: statusCardList });

      this.props.sendData(details);
    } else {
      this.statusCards(1);
    }
  };
  statusCards = startCount => {
    var openStatusCount = 0;
    var openStatus = false;
    var statusCardList = [];
    var statusPaginationCount = 0;
    var details = [];
    var count = -1;
    for (var i = startCount; i < this.state.StatusDataNew.length; i++) {
      count += 1;
      if (this.state.StatusDataNew[i].status === 'In-Progress') {
        openStatus = true;
        this.setState({ currentElement: parseInt(i - 1, 10) });
        openStatusCount += 1;
        statusPaginationCount = i;
        details.push({
          heading: this.state.StatusDataNew[i].heading,
          data: this.state.StatusDataNew[i].data,
          status: this.state.StatusDataNew[i].status
        });

        this.setState({ mounted: 1, details: details });
      } else {
        openStatus = false;
        statusPaginationCount = i;
      }
      statusCardList.push(
        <StatusCards
          key={i}
          value={count}
          heading={this.state.StatusDataNew[i].heading}
          status={this.state.StatusDataNew[i].status}
          openStatus={openStatus}
          handleOpen={this.handleOpen(i, count)}
          data={this.state.StatusDataNew[i].data}
          Date={this.state.StatusDataNew[i].Date}
          handleHover={this.handleHover(i, count)}
          hoverStatusClass={'status-card-status-card-9'}
          handleMouseDown={this.handleMouseDown}
        />
      );
      if (parseInt(i, 10) === parseInt(startCount, 10) + 5) {
        statusPaginationCount = i;
        break;
      }
    }

    if (openStatusCount > 0) {
      this.setState({
        statusCardList: statusCardList,
        downwardstartCount: startCount + 1,
        upwardstartCount: startCount - 1,
        statusPaginationCount: statusPaginationCount
      });
      localStorage.setItem('firstData', details);
      this.props.sendData(details);
    } else if (
      parseInt(openStatusCount, 10) === 0 &&
      parseInt(statusPaginationCount + 1, 10) === 16
    ) {
      openStatusCount = 0;
      openStatus = false;
      statusCardList = [];
      statusPaginationCount = 0;
      details = [];
      var openStatusonClick = '';
      for (var j in this.state.StatusDataNew) {
        // if (parseInt(j, 10) === 6) {
        //   break;
        // }
        if (parseInt(j, 10) === 0) {
          openStatusonClick = this.state.StatusDataNew[j].heading;
          openStatus = true;
          this.setState({ currentElement: parseInt(j - 1, 10) });
          details.push({
            heading: this.state.StatusDataNew[j].heading,
            data: this.state.StatusDataNew[j].data,
            status: this.state.StatusDataNew[j].status
          });
        } else {
          openStatus = false;
        }
        statusCardList.push(
          <StatusCards
            key={j}
            value={j}
            heading={this.state.StatusDataNew[j].heading}
            status={this.state.StatusDataNew[j].status}
            openStatus={openStatus}
            data={this.state.StatusDataNew[j].data}
            handleOpen={this.handleOpen(j, j)}
            Date={this.state.StatusDataNew[j].Date}
            handleHover={this.handleHover(i, j)}
            hoverStatusClass={'status-card-status-card-9'}
            handleMouseDown={this.handleMouseDown}
          />
        );
      }
      this.setState({
        statusCardList: statusCardList,
        openStatusonClick: openStatusonClick
      });
      this.props.sendData(details);
    } else {
      this.statusCards(startCount + 1);
    }
  };
  handleClickUp = () => {
    if (this.state.currentElement > 0)
      this.setState({
        currentElement: this.state.currentElement - 1,
        showDownArrow: true
      });
  };
  handleClickDown = () => {
    // if(this.state.currentElement < this.state.statusCardList.length)
    this.setState({ currentElement: this.state.currentElement + 1 });
  };

  handleScroll = e => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const bottom1 =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight + 1;
    if (bottom || bottom1) {
      this.setState({ showDownArrow: false });
    } else {
      this.setState({ showDownArrow: true });
    }

    if (e.target.scrollTop > 10) {
      this.setState({
        showUpArrow: true,
        currentElement:
          this.state.currentElement > 0 ? this.state.currentElement : 1
      });
    } else {
      this.setState({ showUpArrow: false, currentElement: 0 });
    }
  };

  handleOpen = key => value => () => {
    var statusCardList = [];
    var openStatus = false;
    var count = -1;
    var details = [];
    for (var i in this.state.statusCardList) {
      count += 1;
      if (parseInt(i, 10) === parseInt(value, 10)) {
        openStatus = true;

        if (
          parseInt(i, 10) !==
            parseInt(this.state.statusCardList.length - 1, 10) &&
          document.getElementById('upArrow') !== null
        ) {
          // console.log('if.. not last with down arrow');
          this.setState({ currentElement: parseInt(i, 10) });
        } else if (
          parseInt(i, 10) ===
            parseInt(this.state.statusCardList.length - 1, 10) &&
          document.getElementById('upArrow') !== null
        ) {
          // console.log('last record with down arrow');
          this.setState({ currentElement: parseInt(i - 1, 10) });
          document.getElementById('upArrow').click();
          this.setState({
            currentElement: parseInt(i, 10),
            showDownArrow: false
          });
        } else {
          // console.log('else no down arrow & not last');
        }

        if (parseInt(i, 10) > 0) {
          this.setState({ showUpArrow: true });
        }

        details.push({
          heading: this.state.statusCardList[i].props.heading,
          status: this.state.statusCardList[i].props.status,
          data: this.state.statusCardList[i].props.data
        });

        this.setState({
          openStatusonClick: this.state.statusCardList[i].props.heading
        });
      } else {
        openStatus = false;
      }
      statusCardList.push(
        <StatusCards
          key={this.state.statusCardList[i].key}
          value={count}
          heading={this.state.statusCardList[i].props.heading}
          status={this.state.statusCardList[i].props.status}
          data={this.state.statusCardList[i].props.data}
          openStatus={openStatus}
          handleOpen={this.handleOpen(this.state.statusCardList[i].key, count)}
          Date={this.state.statusCardList[i].props.Date}
          handleHover={this.handleHover(
            this.state.statusCardList[i].key,
            count
          )}
          hoverStatusClass={
            openStatus === true
              ? 'status-card-status-card-10'
              : 'status-card-status-card-9'
          }
          handleMouseDown={this.handleMouseDown}
          flipStatus={openStatus === true ? true : false}
        />
      );
    }
    this.setState({
      statusCardList: statusCardList
    });
    this.props.sendData(details);
  };

  handleHover = key => value => () => {
    var statusCardList = [];
    var hoverStatus = false;
    for (var i in this.state.statusCardList) {
      if (parseInt(i, 10) === parseInt(value, 10)) {
        hoverStatus = true;
      } else {
        hoverStatus = false;
      }
      statusCardList.push(
        <StatusCards
          key={this.state.statusCardList[i].key}
          value={this.state.statusCardList[i].props.value}
          heading={this.state.statusCardList[i].props.heading}
          status={this.state.statusCardList[i].props.status}
          data={this.state.statusCardList[i].props.data}
          openStatus={this.state.statusCardList[i].props.openStatus}
          handleOpen={this.handleOpen(
            this.state.statusCardList[i].key,
            this.state.statusCardList[i].props.value
          )}
          Date={this.state.statusCardList[i].props.Date}
          handleHover={this.handleHover(
            this.state.statusCardList[i].key,
            this.state.statusCardList[i].props.value
          )}
          hoverStatus={hoverStatus}
          hoverStatusClass={
            hoverStatus === true
              ? 'status-card-status-card-10'
              : 'status-card-status-card-9'
          }
          handleMouseDown={this.handleMouseDown}
        />
      );
    }
    this.setState({
      statusCardList: statusCardList
    });
  };
  handleMouseDown = () => {
    var statusCardList = [];
    var hoverStatus = false;

    for (var i in this.state.statusCardList) {
      statusCardList.push(
        <StatusCards
          key={this.state.statusCardList[i].key}
          value={this.state.statusCardList[i].props.value}
          heading={this.state.statusCardList[i].props.heading}
          status={this.state.statusCardList[i].props.status}
          data={this.state.statusCardList[i].props.data}
          openStatus={this.state.statusCardList[i].props.openStatus}
          handleOpen={this.handleOpen(
            this.state.statusCardList[i].key,
            this.state.statusCardList[i].props.value
          )}
          Date={this.state.statusCardList[i].props.Date}
          handleHover={this.handleHover(
            this.state.statusCardList[i].key,
            this.state.statusCardList[i].props.value
          )}
          hoverStatus={hoverStatus}
          hoverStatusClass={'status-card-status-card-9'}
          handleMouseDown={this.handleMouseDown}
        />
      );
    }
    this.setState({
      statusCardList: statusCardList
    });
  };

  render() {
    return (
      <div style={{ marginTop: '8%' }}>
        {this.state.currentElement !== 0 && this.state.showUpArrow ? (
          <Link
            activeClass='active'
            to={'firstInsideContainer' + (this.state.currentElement - 1)}
            smooth={true}
            duration={500}
            containerId='containerElement'
            style={{ display: 'inline-block' }}
          >
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              onClick={this.handleClickUp}
              icon={faChevronUp}
            />
          </Link>
        ) : null}
        <Element
          name='test7'
          className='element'
          id='containerElement'
          onScroll={this.handleScroll}
          style={{
            position: 'relative',
            // height: '-webkit-fill-available',
            overflowY: 'hidden',
            height: '100vh',
            marginTop: '25px',
            boxShadow: 'rgba(0, 0, 0, 0.26) 6px 8px 20px 6px'
          }}
        >
          <div>
            <div style={{ marginTop: '-4%', marginBottom: '230px' }}>
              {this.state.statusCardList.map((props, i) => (
                <Grid key={i}>
                  <div
                    className='subscriptioncardRow'
                    name={'firstInsideContainer' + i}
                  >
                    {this.state.statusCardList[i]}
                  </div>
                </Grid>
              ))}
            </div>
          </div>
        </Element>

        {this.state.currentElement !== this.state.statusCardList.length - 1 &&
        this.state.showDownArrow ? (
          <Link
            activeClass='active'
            id='upArrow'
            to={'firstInsideContainer' + (this.state.currentElement + 1)}
            spy={true}
            smooth={true}
            duration={500}
            containerId='containerElement'
            style={{
              display: 'inline-block',
              cursor: 'pointer',
              marginTop: '2%',
              bottom: '0px',
              left: '0px',
              position: 'absolute',
              width: '100%',
              backgroundColor: '#26c6da',
              boxShadow: '6px 8px 20px 6px rgba(0, 0, 0, 0.26)'
            }}
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              onClick={this.handleClickDown}
            />
          </Link>
        ) : null}
      </div>
    );
  }
}