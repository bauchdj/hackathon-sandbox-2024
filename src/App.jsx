import React, { useState } from 'react';
import mapImage from './assets/map.png';
import detailsImage from './assets/details.png';

const SearchComponent = ({ handleKeyDown, searchTerm, setSearchTerm, onSearch }) => {
	const [inputValue, setInputValue] = useState('');

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
		setSearchTerm(event.target.value);
	};

	return (
		<div className='bar-style'>
			<input
				className="search-input-container search-input-dimensions"
				value={inputValue}
				placeholder="Where would you like to go?"
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			/>
			<div className="search-svg-dimensions" onClick={ event => { onSearch(inputValue); } }>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
					<path d="M15.5 14H14.71L14.43 13.73C15.4439 12.554 16.0011 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23191 3.1249C6.97104 3.3757 5.81285 3.99477 4.9038 4.90381C3.99476 5.81285 3.3757 6.97104 3.12489 8.23192C2.87409 9.49279 3.00281 10.7997 3.49478 11.9874C3.98675 13.1752 4.81987 14.1903 5.88879 14.9046C6.95771 15.6188 8.21442 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="black" />
				</svg>
			</div>
		</div>
	);
};


function Popup({ imageUrl, onClose }) {
	return (
		<div className="fill-screen black-transparent center-x center-y" onClick={onClose}>
			<img src={detailsImage} alt="Lot Details" style={{height: '100%'}}/>
		</div>
	);
}

function Tile(props) {
return (
	<div className="tile-outer-div">
		<div className="tile-body" onClick={ () => { setTimeout(props.showPopup, 100) } }>
			<div style={{
				alignSelf: 'stretch', 
				height: '64px', 
				flexDirection: 'column', 
				justifyContent: 'flex-start', 
				alignItems: 'flex-start', 
				gap: '4px', 
				display: 'flex'
			}}>
				<div style={{
					color: '#555555', 
					fontSize: '23px', 
					fontFamily: 'Space Grotesk', 
					fontWeight: 600, 
					lineHeight: '28px', 
					wordWrap: 'break-word'
				}}>
					Lot {props.lot}Y
				</div>
				<div style={{
					alignSelf: 'stretch', 
					color: '#353535', 
					fontSize: '11px', 
					fontFamily: 'Space Grotesk', 
					fontWeight: 500, 
					lineHeight: '16px', 
					wordWrap: 'break-word'
				}}>
					{props.addy}
				</div>
			</div>
			<div style={{
				color: '#349F01', 
				fontSize: '13px', 
				fontFamily: 'Space Grotesk', 
				fontWeight: 500, 
				lineHeight: '16px', 
				wordWrap: 'break-word'
			}}>
				{props.spots} Spots Remain
			</div>
		</div>
	</div>
)
}

function LotTiles({ showPopup, filterTerm }) {
	const tileData = [
		{ lot: '36', addy: '990 N 150 E' },
		{ lot: '47', addy: '338 Stadium Ave' },
		{ lot: '46', addy: '980 N Freedom Blvd' },
		{ lot: '46', addy: '1080 N University Ave' },
		{ lot: '48', addy: '1700 N Canyon Rd', spots: "121" },
		{ lot: '24', addy: '1620 900 E' },
		{ lot: '50', addy: '703 E University Pkwy' },
		{ lot: '61', addy: '2230 N 100 E' },
		{ lot: '61', addy: '2400 N Canyon Rd' },
		{ lot: '34', addy: '800 N 150 E' },
		{ lot: '49', addy: 'E University Parkway' },
		{ lot: '57', addy: '100 E 700 N' }
	];

		/*
		{tileData.map((item, index) => (
		*/
return (
	<ul className="blocks grid">
		{tileData.filter(lotObj => {
			return filterTerm === '' || lotObj.lot.includes(filterTerm.toLowerCase()) || lotObj.addy.toLowerCase().includes(filterTerm.toLowerCase());
		}).map((item, index) => (
			<Tile
				key={index}
				lot={item.lot}
				addy={`Location: ${item.addy}`}
				spots={item.spots ? item.spots : "100"}
				showPopup={showPopup}
			/>
		))}
	</ul>
)
}

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterTerm, setFilterTerm] = useState('');
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	const onInputChange = event => {
		const value = event.target.value;
		setSearchTerm(value);
	};

	const onSearch = value => {
		setFilterTerm(value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') onSearch(searchTerm);
	};

	const showPopup = () => {
		setIsPopupVisible(true);
	};

	const closePopup = () => {
		setIsPopupVisible(false);
	};

	return (
		<div id="body" className="flex-c">
			{isPopupVisible && <Popup imageUrl={detailsImage} onClose={() => closePopup()} />}
			<div className="flex-1 overflow-hidden">
				<img id="map-img" src={mapImage} alt="Parking Lot Map" />
			</div>
			<div className="flex-2 overflow-hidden">
				<div className="lower-container flex-c">
					<div className="flex-1 overflow-hidden">
						<div className="h-100 flex-c center-x center-y">
							<SearchComponent handleKeyDown={handleKeyDown} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={onSearch}/>
						</div>
					</div>
					<div className="flex-8 overflow-hidden">
						<div className="h-100 flex-c">
							<div className="flex-1 center-y">
								<div id="lot-list-title">Available Lots</div>
							</div>
							<div className="flex-8 overflow-auto">
								<LotTiles showPopup={showPopup} filterTerm={filterTerm}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default App

/*
function TileList() {
	const tileData = [
		{ name: '36Y', description: '990 N 150 E' },
		{ name: '47Y', description: '338 Stadium Ave' },
		{ name: '46Y', description: '980 N Freedom Blvd' },
		{ name: '46Y', description: '1080 N University Ave' },
		{ name: '48Y', description: '1700 N Canyon Rd' },
		{ name: '24Y', description: '1620 900 E' },
		{ name: '50Y', description: '703 E University Pkwy' },
		{ name: '61Y', description: '2230 N 100 E' },
		{ name: '61Y', description: '2400 N Canyon Rd' },
		{ name: '34Y', description: '800 N 150 E' },
		{ name: '49Y', description: 'E University Parkway' },
		{ name: '57Y', description: '100 E 700 N' }
	];

	return (
		<div>
			{tileData.map((tile, index) => (
				<Tile
					key={index}
					value={index + 1}
					name={tile.name}
					description={`Location: ${tile.description}`}
				/>
			))}
		</div>
	);
}

function Tile(props) {
	return (
		<div className="tileContainer">
			<div>{props.value}</div>
			<div><span>{props.name}</span></div>
			<div>{props.description}</div>
		</div>
	)
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.jsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	)
}

export default App
*/
