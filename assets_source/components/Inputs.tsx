import React, { useState, ChangeEvent, useRef, useEffect } from 'react'

type inputsProps = {
	propState: (updatedJSON : Record<string, unknown>) => void;
};



const Inputs: React.FC<inputsProps> = ({ propState }) => {
	const DEVMODE = false;

	const getStringDate = (date : Date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2,'0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${month}-${day}-${year}`
    }

	const getDefaultDate = (daysBefore : number) => {
		const date = new Date();
		date.setDate(date.getDate() - daysBefore);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`
	}

	const getDate = (daysBefore : number) => {
		const date = new Date();
		date.setDate(date.getDate() - daysBefore);
		return getStringDate(date);
	};
	
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
	const [showAdvancedParameters, setShowAdvancedParameters] = useState(false);

	const calmRef = useRef<HTMLInputElement>(null);
	
	const [calmUnits, setCalmUnits] = useState('mph');
	const [calmValue, setCalmValue] = useState(1.3);
	
	// period start date -->                            DEFAULT IS 7 DAYS BEFORE TODAY
	const [periodStart, setPeriodStart] = useState(getDate(7));
	// period end date	-->								DEFAULT IS TODAY
	const [periodEnd, setPeriodEnd] = useState(getDate(0));
	// sub-interval start date
	const [subDateStart, setSubDateStart] = useState('01-01');
	// sub-interval end date
	const [subDateEnd, setSubDateEnd] = useState('12-31');
	// sub-interval start time
	const [subTimeStart, setSubTimeStart] = useState('12:00 AM');
	// sub-interval end time
	const [subTimeEnd, setSubTimeEnd] = useState('11:59 PM');
	// sub-interval days of the week
	const [subWeekDays, setSubWeekDays] = useState([true, true, true, true, true, true, true]);

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		// Update the measurement period variables
		if (event.target.value === "7"){
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
			setPeriodStart(getDate(7));
			setPeriodEnd(getDate(0));
		}
		else if(event.target.value === "30"){
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
			setPeriodStart(getDate(30));
			setPeriodEnd(getDate(0));
		}
		else if(event.target.value === "365"){
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
			setPeriodStart(getDate(365));
			setPeriodEnd(getDate(0));
		}
		else if(event.target.value == "this_month"){
			var monthDayYear = getDate(0).split('-');
			monthDayYear[1] = "01";

			setPeriodStart(monthDayYear.join("-"));
			setPeriodEnd(getDate(0));
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "last_month"){
			var monthDayYear = getDate(0).split('-');
			monthDayYear[1] = "01";
			var endDate = new Date(Number(monthDayYear[2]), Number(monthDayYear[0]) - 1, 0);
			var startDate = new Date(Number(monthDayYear[2]), Number(monthDayYear[0]) - 2, 1);

			setPeriodStart(getStringDate(startDate));
			setPeriodEnd(getStringDate(endDate));
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "this_year"){
			var monthDayYear = getDate(0).split('-');
			monthDayYear[1] = "01";
			monthDayYear[0] = "01";

			setPeriodStart(monthDayYear.join("-"));
			setPeriodEnd(getDate(0));
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "last_year"){
			var monthDayYear = getDate(0).split('-');
			var yearNum = Number(monthDayYear[2]);
			yearNum -= 1;
			monthDayYear[2] = yearNum.toString();
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);

			monthDayYear[1] = "01";
			monthDayYear[0] = "01";
			setPeriodStart(monthDayYear.join("-"));

			monthDayYear[0] = "12";
			monthDayYear[1] = "31";
			setPeriodEnd(monthDayYear.join("-"));
		}
		else if(event.target.value == "max"){
			setPeriodStart("01-01-2000");
			setPeriodEnd(getDate(0));
			setSubWeekDays([true, true, true, true, true, true, true]);
			setShowAdvancedOptions(false);
		}
		else{
			// show custom
			setSubWeekDays([true, true, true, true, true, true, true]); // ??
			setShowAdvancedOptions(true);
		}
	};

	const handleCustomPeriodStart = (event: ChangeEvent<HTMLInputElement>) => {
		var val = (event.target.value).split("-");
		var year = val[0];
		val[0] = val[1];
		val[1] = val[2];
		val[2] = year;
		setPeriodStart(val.join("-"));
	};
	const handleCustomPeriodEnd = (event: ChangeEvent<HTMLInputElement>) => {
		var val = (event.target.value).split("-");
		var year = val[0];
		val[0] = val[1];
		val[1] = val[2];
		val[2] = year;
		setPeriodEnd(val.join("-"));
	};
	const handleSubDateStart = (event: ChangeEvent<HTMLInputElement>) => {
		setSubDateStart(event.target.value);
	};
	const handleSubDateEnd = (event: ChangeEvent<HTMLInputElement>) => {
		setSubDateEnd(event.target.value);
	};
	const handleCustomTimeStart = (event: ChangeEvent<HTMLInputElement>) => {
		setSubTimeStart(event.target.value);
	};
	const handleCustomTimeEnd = (event: ChangeEvent<HTMLInputElement>) => {
		setSubTimeEnd(event.target.value);
	};

	const handleAdvancedParametersButton = () => {
		setShowAdvancedParameters(!showAdvancedParameters);
	};

	const handleUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newUnits = event.target.value;
		let newCalmValue = calmValue;
		if (calmUnits === 'm/s') {
			newCalmValue *= 2.23694; // convert to mph
		} else {
			newCalmValue /= 2.23694; // convert to m/s
		}
		setCalmValue(Math.round(newCalmValue * 1000) / 1000);
		if (calmRef.current) {
			calmRef.current.value = (Math.round(newCalmValue * 1000) / 1000).toString();
		}
		setCalmUnits(newUnits);
	};

	const handleCalmChange = (event : ChangeEvent<HTMLInputElement>) => {
		setCalmValue(Number(event.target.value));
	}

	const defaultRose = () => {
		var updatedJSON = {"periodStart" : periodStart, "periodEnd": periodEnd, "subDateStart": subDateStart, "subDateEnd": subDateEnd,
			"subTimeStart": subTimeStart, "subTimeEnd": subTimeEnd, "subWeekDays": subWeekDays, "calmUnits": calmUnits, "calmValue": calmValue
		};
		propState(updatedJSON);
	}

	const generateRose = (event: React.FormEvent) => {
		event.preventDefault();
		defaultRose();
	};

	const handleWeekDay = (event: ChangeEvent<HTMLInputElement>) => {
		var subWeekDaysCpy = [...subWeekDays];
		const idx = Number(event.target.value)
		subWeekDaysCpy[idx] = !subWeekDaysCpy[idx];
		setSubWeekDays(subWeekDaysCpy);
	};

	const handleEnter = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
		}	
	};

	useEffect(() => {
		defaultRose();
	}, []);

	return (
		<>
		<div className='input-wrapper'>
			<form onSubmit={generateRose} onKeyDown={handleEnter}>
			<div className='container'>
				<div className='container'>
				<h3>Select Measurement Period</h3>
				<select id="date-select" className='select' onChange={handleSelectChange}>
					<option value='7'>Last 7 Days</option>
					<option value="30">Last 30 Days</option>
					<option value="this_month">This Month</option>
					<option value="last_month">Last Month</option>
					<option value="365">Last 365 Days</option>
					<option value="this_year">This Year</option> 
					<option value="last_year">Last Year</option>
					<option value="max">All Available Data</option>
					<option value="custom">Select Custom</option>
				</select>
				</div>
				{ showAdvancedOptions && (
				<div id="date-advanced-options" className='container'>
					<h4>Input Measurement Period</h4>
					<ul>
						<li><span>Date Range:</span></li>
						<li>
							<input type='date' className='textfield' defaultValue={getDefaultDate(7)} onChange={handleCustomPeriodStart}></input>
							<span> - </span>
							<input type='date' className='textfield' defaultValue={getDefaultDate(0)} onChange={handleCustomPeriodEnd}></input>
						</li>
					</ul>
					<h4>Input Sub-Interval</h4>
					<ul>
						<li><span>Date Range: </span></li>
						<li>
							<input type="text" className='textfield' pattern="^\d{2}/\d{2}$" placeholder="MM/DD" onChange={handleSubDateStart} defaultValue="01/01"/>
							<span> - </span>
							<input type="text" className='textfield' pattern="^\d{2}/\d{2}$" placeholder="MM/DD" onChange={handleSubDateEnd} defaultValue="12/31"/>
						</li>
					</ul>
					<ul>
						<li><span>Time Range:</span></li>
						<li>
							<input type="time" className='textfield' defaultValue="00:00" onChange={handleCustomTimeStart}/>
							<span> - </span>
							<input type="time" className='textfield' defaultValue="23:59" onChange={handleCustomTimeEnd}/>
						</li>
					</ul>
					
					<h4>Select Days of the Week:</h4>
					<ul className='weekdays'>
						<li><label><input type='checkbox' id="monday" value="0" onChange={handleWeekDay} checked={subWeekDays[0]}/> <span>Monday</span></label></li>
						<li><label><input type='checkbox' id="tuesday" value="1" onChange={handleWeekDay} checked={subWeekDays[1]}/> <span>Tuesday</span></label></li>
						<li><label><input type='checkbox' id="wednesday" value="2"  onChange={handleWeekDay} checked={subWeekDays[2]}/> <span>Wednesday</span></label></li>
						<li><label><input type='checkbox' id="thursday" value="3"  onChange={handleWeekDay} checked={subWeekDays[3]}/> <span>Thursday</span></label></li>
						<li><label><input type='checkbox' id="friday" value="4"  onChange={handleWeekDay} checked={subWeekDays[4]}/> <span>Friday</span></label></li>
						<li><label><input type='checkbox' id="saturday" value="5"  onChange={handleWeekDay} checked={subWeekDays[5]}/> <span>Saturday</span></label></li>
						<li><label><input type='checkbox' id="sunday" value="6"  onChange={handleWeekDay} checked={subWeekDays[6]}/> <span>Sunday</span></label></li>
					</ul>
				</div>
				)}
			</div>
			<div className='container'>
				<button type='button' onClick={handleAdvancedParametersButton}>{showAdvancedParameters ? `Hide Advanced Parameters` : `Show Advanced Parameters`}</button>
				{showAdvancedParameters && (
				<div>
					<div className='calm-units'>
						<span>Calm 	Units:</span>
						<input type='radio' name='units' value='mph' onChange={handleUnitsChange} checked={calmUnits==='mph'} /><label>mph</label>
						<input type='radio' name='units' value='m/s' onChange={handleUnitsChange} checked={calmUnits==='m/s'} /><label>m/s</label>
					</div>
					<div>
						<span>Calm Value: </span><input ref={calmRef} type='number' min="0" step=".001" className='textfield' name="calm" defaultValue={calmValue} onBlur={handleCalmChange}/>
					</div>
				</div>
				)}
			</div>
			<div className='container'>
				<button type='submit'>Generate Rose</button>
				{DEVMODE && (<p>
					Current Rose Parameters: <br/>
					measurement period beginning on {periodStart} and ending on {periodEnd},<br/>
					subInterval Date beginning on {subDateStart} and ending on {subDateEnd},<br/>
					subInterval Time beginning at {subTimeStart} and ending at {subTimeEnd},<br/>
					on day(s) {subWeekDays[0] ? `monday, ` : ``}{subWeekDays[1] ? `tuesday, ` : ``}{subWeekDays[2] ? `wednesday, ` : ``}
					{subWeekDays[3] ? `thursday, ` : ``}{subWeekDays[4] ? `friday, ` : ``}{subWeekDays[5] ? `saturday, ` : ``}{subWeekDays[6] ? `sunday, ` : ``}<br/>
					using calm value {calmValue} {calmUnits}
				</p>)
				}
			</div>
			</form>
		</div>
		</>
	)
	};

	export default Inputs