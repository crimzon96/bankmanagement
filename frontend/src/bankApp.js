import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import Facets from './components/facets';
import CustomModal from './components/Modal';

class Bankapp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collected_filters: [],
			all_transactions: [],
			totalBalance: 0,
			count: 0,
			transaction: {
				name: '',
				amount: 0,
				status: '',
				description: '',
				bankaccount: 1
			},
			passingFacets: {
				search: {
					searchInput: ''
				},
				rangeslider: {
					range: [ 0, 2500 ]
				},
				price: {
					lowHigh: false,
					highLow: false
				},
				status: {
					withdraw: false,
					deposit: false
				}
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleWithdrawSubmit = this.handleWithdrawSubmit.bind(this);
		this.handleDepositSubmit = this.handleDepositSubmit.bind(this);
		this.changeHandlerSubmit = this.changeHandlerSubmit.bind(this);
		this.openModal = this.openModal.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.multiPropsFilter = this.multiPropsFilter.bind(this);
		this.modelListener = this.modelListener.bind(this);
	}

	modelListener = (value) => {
		this.setState({
			transaction: {
				name: value.name,
				description: value.description,
				amount: value.amount,
				status: value.status,
				bankaccount: 1
			},
			modalIsOpen: false
		});
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	handleChange = (event) => {
		this.setState({ value: +event.target.value });
	};

	handleWithdrawSubmit = () => {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/bankaccount/1',
			data: {
				transaction: this.state.transaction
			}
		}).then((res) => {
			if (res.statusText === 'OK') {
				this.componentDidMount();
			}
		});
	};

	handleDepositSubmit = () => {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/bankaccount/1',
			data: {
				transaction: this.state.transaction
			}
		}).then((res) => {
			if (res.statusText === 'OK') {
				this.componentDidMount();
			}
		});
	};

	componentDidMount() {
		axios.get('http://127.0.0.1:8000/bankaccount/1').then((response) => {
			this.setState(() => {
				return {
					bankaccount: response.data,
					totalBalance: response.data.balance,
					all_transactions: response.data.all,
					bankaccount_id: response.data.bankaccount
				};
			});
		});
	}

	changeHandlerSubmit = (event) => {
		event.preventDefault();
		if (this.state.status === 'withdraw') {
			return this.handleWithdrawSubmit();
		}
		return this.handleDepositSubmit();
	};

	// **** Filters **** //
	filteredCollected = () => {
		const collectedTrueKeys = {
			status: []
		};
		const { status } = this.state.passingFacets;
		for (let statusKey in status) {
			if (status[statusKey]) collectedTrueKeys.status.push(statusKey);
		}
		this.setState({ collected_filters: collectedTrueKeys });
	};

	// ******** slideListener ****** //
	slideListener = (range) => {
		const rangeslider = 'rangeslider';
		this.setState((prevState) => ({
			passingFacets: {
				...prevState.passingFacets,
				[rangeslider]: {
					['range']: range
				}
			}
		}));
	};

	// ********** sortListener ************* //
	sortListener = (e, filterProp) => {
		const price = 'price';
		this.setState((prevState) => ({
			passingFacets: {
				...prevState.passingFacets,
				[price]: {
					[filterProp]: !prevState.passingFacets[price][filterProp]
				}
			}
		}));
	};

	// ********** Search Listener *********** //
	searchListener = (e) => {
		const input = e.target.value;
		const search = 'search';
		this.setState((prevState) => ({
			passingFacets: {
				...prevState.passingFacets,
				[search]: {
					searchInput: input
				}
			}
		}));
	};

	// **************** UNIVERSAL Filter ****************
	statusListener = (e, filterProp) => {
		const name = e.target.dataset.name;
		this.setState((prevState) => ({
			passingFacets: {
				...prevState.passingFacets,
				[filterProp]: {
					...prevState.passingFacets[filterProp],
					[name]: !prevState.passingFacets[filterProp][name]
				}
			}
		}));
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.passingFacets !== prevState.passingFacets) {
			this.filteredCollected();
		}
		if (this.state.transaction !== prevState.transaction) {
			if (this.state.transaction.status === 'withdraw') {
				return this.handleWithdrawSubmit();
			} else if (this.state.transaction.status === 'deposit') {
				return this.handleDepositSubmit();
			}
		}
	}

	multiPropsFilter = (products, filters) => {
		const filterKeys = Object.keys(filters);
		return products.filter((product) => {
			return filterKeys.every((key) => {
				if (!filters[key].length) return true;

				if (Array.isArray(product[key])) {
					return product[key].some((keyEle) => filters[key].includes(keyEle));
				}
				return filters[key].includes(product[key]);
			});
		});
	};

	// **************** SEARCH Filter ****************
	searchedProducts = () => {
		const filteredProducts = this.multiPropsFilter(this.state.all_transactions, this.state.collected_filters);
		const { range } = this.state.passingFacets.rangeslider;
		const { lowHigh, highLow } = this.state.passingFacets.price;
		const sort_by = filteredProducts.sort();

		// *** sort product price **** ///
		if (lowHigh) {
			const sort_by = filteredProducts.sort((a, b) => a.value - b.value);
		} else if (highLow) {
			const sort_by = filteredProducts.sort((a, b) => b.value - a.value);
		}
		return sort_by.filter((product) => product.value >= range[0] && product.value <= range[1]).filter((product) => {
			return product.status.toLowerCase().includes(this.state.passingFacets.search.searchInput);
		});
	};

	render() {
		let filtered_items = this.searchedProducts();
		return (
			<main className="content">
				<h1 className="">Bank systeem</h1>
				<div className="row">
					<div className="col-md-8 col-sm-12 mx-auto p-0">
						<div className="card p-3">
							<button className="btn btn-success" onClick={this.openModal}>
								Add new transaction
							</button>
							<CustomModal
								handleWithdrawSubmit={this.handleWithdrawSubmit}
								handleDepositSubmit={this.handleDepositSubmit}
								modalIsOpen={this.state.modalIsOpen}
								modelListener={this.modelListener}
							/>
							{filtered_items.map((item) => (
								<li
									key={item._id}
									className="list-group-item d-flex justify-content-between align-items-center"
								>
									<span className="todo-title mr-2">{item._id}</span>
									<span>{item.created}</span>
									<span>{item.name}</span>
									<span>{item.status}</span>
									<span>{item.value}</span>
								</li>
							))}
							<div>Total balance: {this.state.totalBalance}</div>
						</div>
					</div>
					<div className="col-md-3 col-sm-12 mx-auto p-0">
						<Facets
							slideListener={this.slideListener}
							searchListener={this.searchListener}
							facets={this.state.passingFacets}
							sortListener={this.sortListener}
							statusListener={this.statusListener}
						/>
					</div>
				</div>
			</main>
		);
	}
}

export default Bankapp;
