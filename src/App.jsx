import React, { useState } from 'react';
import mapImage from './assets/map.png';
import detailsImage from './assets/details.png';
// import detailsImage from './assets/details.png';

function SearchComponent() {
	// State to keep track of the search input
	const [searchTerm, setSearchTerm] = useState('');

	// Function to handle the change in the input field
	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};

	// Function to handle the form submission
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent the default form submit action
		console.log('Search term submitted:', searchTerm);

		// You can call a search function or API here with searchTerm
	};

	return (
        <div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Where would you like to go?"
					value={searchTerm}
					onChange={handleInputChange}
				/>
				<button type="submit">Search</button>
			</form>
        </div>
	);
}


function Popup({ imageUrl, onClose }) {
    return (
        <div className="fill-screen black-transparent center-x center-y" onClick={onClose}>
            <img src={detailsImage} alt="Lot Details" style={{height: '100%'}}/>
        </div>
    );
}

function Tile(props) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

return (
	<div className="tile-outer-div">
		{isPopupVisible && <Popup imageUrl={detailsImage} onClose={() => closePopup()} />}
		<div className="tile-body" onClick={ () => { setTimeout(showPopup, 100) } }>
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

function TileRow(props) {
return (
		<li>
			<div className="flex-r">
				<div className="spacer"></div>
				<Tile {...props}/>
				<div className="spacer"></div>
				<Tile {...props}/>
				<div className="spacer"></div>
			</div>
		</li>
)
}

function LotTiles() {
	const tileData = [
		{ lot: '36', addy: '990 N 150 E' },
		{ lot: '47', addy: '338 Stadium Ave' },
		{ lot: '46', addy: '980 N Freedom Blvd' },
		{ lot: '46', addy: '1080 N University Ave' },
		{ lot: '48', addy: '1700 N Canyon Rd' },
		{ lot: '24', addy: '1620 900 E' },
		{ lot: '50', addy: '703 E University Pkwy' },
		{ lot: '61', addy: '2230 N 100 E' },
		{ lot: '61', addy: '2400 N Canyon Rd' },
		{ lot: '34', addy: '800 N 150 E' },
		{ lot: '49', addy: 'E University Parkway' },
		{ lot: '57', addy: '100 E 700 N' }
	];

return (
	<ul className="blocks grid">
		{tileData.map((item, index) => (
			<Tile
				key={index}
				lot={item.lot}
				addy={`Location: ${item.addy}`}
				spots="100"
			/>
		))}
	</ul>
)
}

function App() {
	return (
		<div id="body" className="flex-c">
			<div className="flex-1 overflow-hidden">
				<img id="map-img" src={mapImage} alt="Parking Lot Map" />
			</div>
			<div className="flex-2 overflow-hidden">
				<div className="lower-container flex-c">
					<div className="flex-1 overflow-hidden">
						<div className="h-100 flex-c center-x center-y">
							<SearchComponent/>
						</div>
					</div>
					<div className="flex-8 overflow-hidden">
						<div className="h-100 flex-c">
							<div className="flex-1 center-y">
								<div id="lot-list-title">Available Lots</div>
							</div>
							<div className="flex-8 overflow-auto">
								<LotTiles/>
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
