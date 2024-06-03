import React, { useState, ChangeEvent, useEffect } from 'react'

type inputsProps = {
	propState: () => void;
};



const Inputs: React.FC<inputsProps> = ({ propState }) => {
	const getDate = (daysBefore : number) => {
		const date = new Date();
		date.setDate(date.getDate() - daysBefore);
		
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2,'0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${month}-${day}-${year}`
	}
	
	const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
	const [showAdvancedParameters, setShowAdvancedParameters] = useState(false);
	
	const [units, setUnits] = useState('mph');
	const [calmValue, setCalmValue] = useState(1.3);
	
	const [showRose, setShowRose] = useState(false);
	
	// period start date -->                            DEFAULT IS 7 DAYS BEFORE TODAY
	const [periodStart, setPeriodStart] = useState(getDate(7));
	// period end date	-->								DEFAULT IS TODAY
	const [periodEnd, setPeriodEnd] = useState(getDate(0));
	// sub-interval start date
	const [subDateStart, setSubDateStart] = useState('01-01')
	// sub-interval end date
	const [subDateEnd, setSubDateEnd] = useState('12-31')
	// sub-interval start time
	const [subTimeStart, setSubTimeStart] = useState('12:00 AM')
	// sub-interval end time
	const [subTimeEnd, setSubTimeEnd] = useState('11:59 PM')

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		// Update the measurement period variables
		if (event.target.value === "7"){
			setShowAdvancedOptions(false);
			setPeriodStart(getDate(7));
			setPeriodEnd(getDate(0));
		}
		else if(event.target.value === "30"){
			setShowAdvancedOptions(false);
			setPeriodStart(getDate(30));
			setPeriodEnd(getDate(0));
		}
		else if(event.target.value === "365"){
			setShowAdvancedOptions(false);
			setPeriodStart(getDate(365));
			setPeriodEnd(getDate(0));
		}
		else if(event.target.value == "this_month"){
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "last_month"){
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "this_year"){
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "last_year"){
			setShowAdvancedOptions(false);
		}
		else if(event.target.value == "max"){
			setShowAdvancedOptions(false);
		}
		else{
			// show custom
			setShowAdvancedOptions(true);
		}
	};

	const handleAdvancedParametersButton = () => {
		event?.preventDefault();
		setShowAdvancedParameters(!showAdvancedParameters);
	};

	const handleUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUnits(event.target.value);
	}

	const generateRose = (event: React.FormEvent) => {
		event.preventDefault();
		setShowRose(true);
		propState();
	}

	useEffect(() => {
		if (units === 'mph'){
			setCalmValue(1.3);
		} else {
			setCalmValue(0.581152);
		}
	}, [units]);   // <DEBUG> This isn't working as intended --> need to review how exactly useEffect works
				   		// Intended behavior is that by changing units option, the number automatically updates
						// Once that is working, it can be changed to convert any number between the two units, not just the default value

	return (
		<>
		<div className='input-wrapper'>
			<form onSubmit={generateRose}>
			<div className='input-content'>
				<span className='input-element'>Select Period:</span>
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
				{ showAdvancedOptions && (
				<div id="date-advanced-options">
					<div className='date-advanced'>
						<div className='input-element'>_______________________________</div>
						<p>Input Measurement Period</p>
						<span className='input-element'>Start Date:</span><input type='date' className='textfield'></input>
						<span className='input-element'>End Date:</span><input type='date' className='textfield'></input>
					</div>
					<div>
						<div className='input-element'>_______________________________</div>
						<p>Input Sub-Interval -?-</p>
						<div className='input-element'>
							<span className='input-element'>Date Start:</span><input type="text" className='textfield' pattern="^\d{2}-\d{2}$" placeholder="MM-DD" />
							<span className='input-element'>Date End:</span><input type="text" className='textfield' pattern="^\d{2}-\d{2}$" placeholder="MM-DD" />
						</div>
						<div className='input-element'>
							<span className='input-element'>Time Start:</span><input type="time" className='textfield'/>
							<span className='input-element'>Time End:</span><input type="time" className='textfield'/>
						</div>
					</div>
				</div>
				)}
			</div>
			<div className='input-content'>
				<button onClick={handleAdvancedParametersButton}>Show Advanced Parameters</button>
				{showAdvancedParameters && (
				<div>
					<div className='input-element'>
						<span>Units:</span>
						<input type='radio' name='units' value='mph' onChange={handleUnitsChange} checked={units==='mph'} /><label>mph</label>
						<input type='radio' name='units' value='m/s' onChange={handleUnitsChange} checked={units==='m/s'} /><label>m/s</label>
					</div>
					<div className='input-element'>
						<span>Calm: </span><input type='text' className='textfield' name="calm" defaultValue={calmValue}/>
					</div>
				</div>
				)}
				<p className='spacer'></p>
				<button type='submit' className='submit'>Generate Rose</button>
			</div>
			</form>
			{showRose && (<p>
			Showing Rose with measurement period beginning on {periodStart} and ending on {periodEnd}
			</p>)}
		</div>
		</>
	)
	}

	export default Inputs