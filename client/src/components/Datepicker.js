import React from "react";
import DatePicker from "react-datepicker";
// import Moment from 'moment'
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
// import getDay from "date-fns/getDate";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import timeStamp from "unix-timestamp";

class Datepicker extends React.Component {
  constructor(props) {
    // eslint-disable-next-line no-undef
    super(props);
    this.state = {
      startDate: setHours(setMinutes(new Date(), 30), 16),
    };
    this.handleColor = this.handleColor.bind(this);
    // this.handleOnBlur = this.handleOnBlur.bind(this);
  }
  // const isWeekday = date => {
  //   const day = getDay(date);
  //   return day!==0 && day!==6;
  //* / };
  handleColor(time) {
    return time.getHours() > 12 ? "text-succcess" : "text-error";
  }
  // handleOnBlur = ({ target: value }) => {
  //   const date = new Date(value);
  //   console.log(date);
  // };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currSlots !== this.props.currSlots)
      console.log(this.props.currSlots);
   

    // eslint-disable-next-line array-callback-return
    this.props.currSlots.map((slot) => {
      // console.log(timeStamp.toDate(parseInt(slot)));
      // return console.log(new Date().toLocaleString());
      var jsontime=timeStamp.toDate(parseInt(slot));
      if(jsontime> new Date() && jsontime <= new Date()){
        var d=timeStamp.toDate(parseInt(slot));
        var l=new Date();
        console.log('more',d);
        console.log('less',l)
      }
    });

    // function includeDate(){
    //   // new Date(), addDays(new Date(), 1)
    //   this.props.currSlots.map((slot)=>{
    //     return console.log(timeStamp.toDate(parseInt(slot)))
    //   })
    // }
  }

  render() {
    return (
      <div>
        <DatePicker
          className="col form-control"
          placeholderText="Please book a slot"
          isClearable="true"
          autoFocus
          // filterDate={isWeekday}
          // onBlur={(blur) => this.setState({ handleOnBlur: blur })}
          selected={this.state.startDate}
          onChange={(date) => this.setState({ startDate: date })}
          showTimeSelect
          required="required"
          //handle color of time
          timeClassName={this.handleColor}
          dateFormat="MMMM d, yyyy h:mm aa"
          // excludeDates={[new Date(), subDays(new Date(), 5)]}
          includeDates={this.includeDate}
          minDate={subDays(new Date(), 0)}
          maxDate={addDays(new Date(), 6)}
          //Time
          timeIntervals={60}
          // showWeekNumbers
        />
      </div>
    );
  }
}

// import React from "react";
// import Datetime from "react-datetime";
// import "react-datetime/css/react-datetime.css";
// import Moment from 'react-moment';
// import parsedJson from '../data/echo.json'

// console.log(parsedJson)
// // console.log(Json.coursename)
// function Datepicker() {
//   const unixTimestamp = 198784740;
//   // const Json=JSON.parse(slots);
//   // const slotsData=JSON.stringify(Json);
//   // console.log(slotsData);
//   return (
//     <div>
//       <Datetime
//         useRef="datetime"
//         className="col form-control"
//         placeholder="please book a slot"
//         value

//       />
//       {/* <Moment unix>{unixTimestamp}</Moment> */}
//     </div>
//   );
// }

export default Datepicker;
