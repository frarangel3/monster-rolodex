import { Component } from 'react';

import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: '',
		};
		console.log('constructor 1');
	}

	componentDidMount() {
		console.log('componentDidMount 3');
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) =>
				this.setState(
					() => {
						return { monsters: users };
					},
					() => {
						console.log(this.state);
					}
				)
			);
	}

	render() {
		console.log('render 2');

		const filterMonsters = this.state.monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(this.state.searchField);
		});

		return (
			<div className="App">
				<input
					className="search-box"
					type="search"
					placeholder="search monster"
					onChange={(event) => {
						const searchField = event.target.value.toLocaleLowerCase();
						// [ { name: 'Monster'}, {name: 'mash'}]

						this.setState(() => {
							return { searchField };
						});
					}}
				/>
				;
				{filterMonsters.map((monsters) => {
					return (
						<div key={monsters.id}>
							<h1>{monsters.name}</h1>
						</div>
					);
				})}
			</div>
		);
	}
}

export default App;
