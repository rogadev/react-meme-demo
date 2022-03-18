import { useState, useEffect } from 'react';

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [meme, setMeme] = useState({});

	// Shows the loading state for at least half a second every time we get a new meme.
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			// If there's no data, let the fetchFromAPI function handle it.
			if (data) setLoading(false);
		}, 500);
	}, [data, meme]);

	// Fetches a random meme from the API.
	const fetchFromAPI = async () => {
		const url = 'https://api.imgflip.com/get_memes';
		setLoading(true);
		try {
			const response = await fetch(url);
			const json = await response.json();
			setData(json.data.memes);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
			getNewMeme();
		}
	};

	// Gets a random meme from the data array.
	const getNewMeme = () => {
		const randomIndex = Math.floor(Math.random() * data.length);
		setMeme(data[randomIndex]);
	};

	return (
		<div className='App'>
			<div>
				<h1>Meme Generator</h1>
				<button onClick={fetchFromAPI}>Fetch Memes</button>
				<button onClick={getNewMeme}>Get New Meme</button>
				<div>
					{loading && <p>Loading...</p>}
					{!loading && meme && <img src={meme.url} alt={meme.name} />}
				</div>
			</div>
		</div>
	);
}

export default App;
