import "react-datepicker/dist/react-datepicker.css";
import DatePicker,{ registerLocale }from "react-datepicker";
import React from "react";
import axios from "axios";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import moment from 'moment'

class Forms extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			parentname: " ",
			parentemail: " ",
			childname: " ",
			childage: " ",
			mobile: " ",
			coursename: " ",
			date: " ",
			sent: false,
			sdate:"",
			dateArray :[],
			dateFormatArray:[],
			timeList: [],
			showTime: false,
			data:[],
			courseName:[]

		};

		this.dateArray=[]
		this.dateFormatArray=[]
		this.timeArray=[]
		this.s=[]
		this.minutes = []
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.isEligibleDate=this.isEligibleDate.bind(this);
		this.compareTime = this.compareTime.bind(this);
		this.handleTime = this.handleTime.bind(this);
	}

	componentDidMount() {
		let data=[]
		console.log("did Mount")
		axios.get(
			"https://script.google.com/macros/s/AKfycbzJ8Nn2ytbGO8QOkGU1kfU9q50RjDHje4Ysphyesyh-osS76wep/exec"
		).then((res) => {
			this.setState({data:res.data})
		})		
	}
	handleChange(e) {
		let nam = e.target.name;
		let val = e.target.value;
		this.setState({ [nam]: val });
	}
	 handleSubmit(event) {
		if (!this.state.sent) {
			let data = {
				parentname: this.state.parentname,
				parentemail: this.state.parentemail,
				childname: this.state.childname,
				childage: this.state.childage,
				mobile: this.state.mobile,
				coursename: this.state.coursenaem,
				date: (this.state.sdate),
				sent: false
			};
			if (data) {
				axios
					.post("/api/bookings", data)
					.then((res) => {
					window.location.href = 'http://www.google.com';
					window.open('http://www.google.com');	
					console.log(res)
					res.redirect("/")
					this.state.sent = true;	
				})
				.catch(() => {
					console.log("Message not Sent");
				});
			}
			else {
				return null;
			}
		}
	} 

	// Resetting Forms
	resetForm = () => {
		this.setState({
			parentname: " ",
			parentemail: " ",
			childname: " ",
			childage: " ",
			mobile: " ",
			coursename: " ",
			date: " ",
		});
		setTimeout(() => {
			this.setState({
				sent: false,
			});
		}, 3000);
	};

	//For Setting Date and Creating corresponding TimeArray
	handleDate(date) {
		this.setState({sdate:date,timeList:[]})
		this.minutes=[]
		for (let j = 0; j < this.state.dateFormatArray.length; j++){
			if (this.state.dateFormatArray[j] == moment(date).format("DD/MM/YYYY")) {
				this.minutes.push(moment(this.state.dateArray[j]).format('h:mm a'));
			}
		}
		console.log(this.minutes)
		this.setState({timeList:this.minutes})	
	}

	//For Getting Data and Storing slots in array
	async handleCourse(course_id) {
		console.log(course_id)
		if (course_id != 0) {
			this.setState({ coursenaem: course_id });

			this.state.data.map((d) => {
				d.slots.map((slot) => {
					if (d.course_id == course_id) {
						this.s.push(slot.slot);
					}
				});
			});
		}
		else {
			this.s = []
			this.dateFormatArray = [];
			this.dateArray = [];
			this.setState({ timeList: [] })
		}
		this.compareTime(this.s);
	}

	//Comparing Logic
	compareTime (slots){
		slots.map((slot) => { 
			let currDate = new Date();
			let seventhDate = new Date();
			seventhDate = seventhDate.setDate(seventhDate.getDate() + 7)
			console.log(new Date(parseInt(slot)))
			if (new Date(parseInt(slot)).getTime() >(currDate.getTime()+(4*60*60*1000)) && new Date(parseInt(slot)).getTime()<= seventhDate  ){
				this.dateArray.push(new Date(parseInt(slot)));
				this.dateFormatArray.push(moment(new Date(parseInt(slot))).format("DD/MM/YYYY"))
			}
		});
		this.setState({ dateArray: this.dateArray, dateFormatArray: this.dateFormatArray })
	};

	//Function for filtering dates
	isEligibleDate(date) { 
		if (this.state.dateFormatArray.includes(moment(date).format("DD/MM/YYYY"))) {	
			return true;
		}
		return false;
	}

	//Function for filtering times
	handleTime(time) {
		if(this.state.timeList.includes(moment(time).format('h:mm a'))){
			return true;
		}
		return false;
	}
	
	render() {
		return (
			<div className="form-container res-container container">
				<form
					className="needs-validation form-main"
					onSubmit={(event)=>this.handleSubmit(event)}
					novalidation="true"
					>
					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left">
								Parent's Email
						</label>
						<div className="col-sm-6">
							<input
								value={this.state.parentemail}
								onChange={(event)=>this.handleChange(event)}
								name="parentemail"
								type="email"
								className="form-control"
								id="validationTooltip0"
								required
								aria-describedby="emailHelp"
								placeholder="abc@xyz.com"/>
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left">
								Parent's Name
						</label>
						<div className="col-sm-6">
							<input
								value={this.state.parentname}
								onChange={(event)=>this.handleChange(event)}
								name="parentname"
								type="text"
								id="validationTooltip03"
								className="form-control mb-2"
								placeholder="Parent Name"
								required/>
						</div>
					</div>
					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left">
								Child's name
						</label>
						<div className="col-sm-6">
							<input
								value={this.state.childname}
								onChange={(event)=>this.handleChange(event)}
								name="childname"
								type="text"
								className="form-control mb-2"
								id="validationTooltip02"
								placeholder="Child Name"
								required/>
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="text"
							className="col-sm-2 mr-5 label label-left Label">
							Child's Age
						</label>
						<div className="col-sm-6">
							<input
								value={this.state.childage}
								onChange={(event)=>this.handleChange(event)}
								name="childage"
								type="number"
								className="form-control mb-2"
								id="validationTooltip01"
								placeholder="Ex:10"
								min="1"
								max="100"
								required/>
						</div>
					</div>

					<div className="form-group row">
						<label
							htmlFor="inputEmail3"
							className="col-sm-2 mr-5 label label-left Label">
							Mobile No.
						</label>
						<div className="col-sm-6">
							<input
								value={this.state.mobile}
								onChange={(event)=>this.handleChange(event)}
								name="mobile"
								type="text"
								data-validation="number"
								data-validation-allowing="negative,number"
								datavalidation-ignore="$"
								required
								className="form-control"
								id="phone_no"
								placeholder="Phone Number"/>
						</div>
					</div>

					<div className="form-group row">
						<label
							className="col-sm-2 mr-5 label label-left courseLabel"
							htmlFor="inlineFormCustomSelectPref"
							required="required">
							Course Name
						</label>

						<select
							// value={this.state.coursename}
							onChange={(event) => this.handleCourse(event.target.value)}
							name="options"
							className="custom-select my-1 mr-sm-2"
							id="inlineFormCustomSelectPref"
							required="required">
							<option value="0">Choose...</option>
							<option value="1">Scratch Junior</option>
							<option value="2">Game Development</option>
							<option value="3">App Developement</option>
							<option value="4">Web Development</option>
							<option value="5">Python</option>
						</select>
					</div>
					<div className="form-group row">
						<label className="col-sm-2 mr-5 pr-2  label label-left mt-3">
							Pick Date and Time
						</label>
						<DatePicker
						className="col form-control ml-3 cal"
						placeholderText="Please book a slot"
						isClearable="true"
						showTimeSelect
						selected={this.state.sdate}
						onChange={(date)=>this.handleDate(date)}
						required="required"
						dateFormat="MMMM d, yyyy h:mm a "
						timeFormat="h:mm a"
						minDate={subDays(new Date(), 0)}
						maxDate={addDays(new Date(), 6)}
						timeIntervals={30}
						filterDate={(date) => this.isEligibleDate(date)}
						filterTime={(time) => this.handleTime(time)}
						/>
					</div>	
					
				<div className="butHolder">
					<button type="submit" className="btn btn-primary mt-3 ml-auto mr-auto mb-3">
								SUBMIT
					</button>
				</div>
			</form>
		</div>
		);
	}
}

export default Forms;
