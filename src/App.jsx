import React, { useState } from 'react';
import mapImage from './assets/map.png';
import detailsImage from './assets/map.png';
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
            <img src={detailsImage} alt="Lot Details"/>
        </div>
    );
}

function Tile() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const showPopup = () => {
        setIsPopupVisible(true);
    };

    const closePopup = () => {
		console.log("pop up");
        setIsPopupVisible(false);
    };

return (
	<div onClick={showPopup}
	style={{
		width: '100%', 
		height: '100%', 
		padding: '12px', 
		background: '#F5F5F5', 
		borderRadius: '12px', 
		flexDirection: 'column', 
		justifyContent: 'flex-start', 
		alignItems: 'flex-start', 
		gap: '10px', 
		display: 'inline-flex'
	}}>
		<div style={{
			alignSelf: 'stretch', 
			height: '102px', 
			flexDirection: 'column', 
			justifyContent: 'flex-start', 
			alignItems: 'flex-start', 
			gap: '22px', 
			display: 'flex'
		}}>
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
					Lot 48Y
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
					South end of LaVell Edwards Stadium
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
				121 Spots Remain
			</div>
		</div>
		{isPopupVisible && <Popup imageUrl={detailsImage} onClose={closePopup} />}
	</div>
)
}

function TileRow() {
return (
		<li>
			<div className="flex-r">
				<div className="spacer"></div>
				<Tile/>
				<div className="spacer"></div>
				<Tile/>
				<div className="spacer"></div>
			</div>
		</li>
)
}

function LotTiles() {
	const componentsArray = Array.from({ length: 8 }, (_, index) => index);

return (
	<ul className="blocks">
		{componentsArray.map((_, index) => (
			<TileRow key={index}/>
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
