import { Component } from 'react';
import CardList from './components/card-list/card-list.component.jsx';
import SearchBox from './components/search-box/search-box.component.jsx';
import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) =>
				this.setState(() => {
					return { monsters: users };
				})
			);
	}

	onSearchChange = (event) => {
		const searchField = event.target.value.toLocaleLowerCase();
		this.setState(() => {
			return { searchField };
		});
	};

	render() {
		// console.log('render from AppJS');
		const { searchField, monsters } = this.state;
		const { onSearchChange } = this;

		const filterMonsters = monsters.filter((monster) => {
			return monster.name.toLocaleLowerCase().includes(searchField);
		});

		return (
			<div className="App">
			<h1 className='app-title'>Monster Rolodex</h1>
				<SearchBox
					onChangeHandler={onSearchChange}
					placeholder="Search Monsters"
					className="monsters-search-box"
				/>
				<CardList monsters={filterMonsters} />
			</div>
		);
	}
}

export default App;
