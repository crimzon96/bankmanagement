import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class CustomModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			amount: '',
			status: '',
			modalIsOpen: false
		};

		this.renderTabList = this.renderTabList.bind(this);
		this.changeStatus = this.changeStatus.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	changeStatus = (status) => {
		if (status === 'withdraw') {
			return this.setState({ status: 'withdraw' });
		}
		return this.setState({ status: 'deposit' });
	};

	contentListener = (e, source) => {
		this.setState({ [source]: e.target.value });
	};
	modalButtonListener = () => {
		this.props.modelListener({
			name: this.state.name,
			description: this.state.description,
			amount: this.state.amount,
			status: this.state.status
		});
	};

	closeModal = () => {
		document.body.addEventListener(
			'click',
			function(event) {
				if (event.target.className === 'modal fade show') {
					this.setState({ modalIsOpen: false });
				}
			}.bind(this)
		);
	};

	componentWillReceiveProps(newProps) {
		this.setState({ modalIsOpen: newProps.modalIsOpen });
	}

	renderTabList = () => {
		return (
			<div className="my-5 tab-list">
				<span onClick={() => this.changeStatus('withdraw')}>Withdraw</span>
				<span onClick={() => this.changeStatus('deposit')}>Deposit</span>
			</div>
		);
	};

	render() {
		this.closeModal();
		return (
			<div id="modal-component">
				<Modal isOpen={this.state.modalIsOpen}>
					<ModalHeader> New transaction</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label>Name</Label>
								<Input
									type="text"
									name="title"
									onChange={(e) => this.contentListener(e, 'name')}
									placeholder="Enter Name"
								/>
							</FormGroup>
							<FormGroup>
								<Label>Description</Label>
								<Input
									rows="10"
									cols="30"
									type="textarea"
									name="description"
									onChange={(e) => this.contentListener(e, 'description')}
									placeholder="Enter Description"
								/>
							</FormGroup>
							<FormGroup>
								<Label>Amount</Label>
								<Input
									type="number"
									name="amount"
									onChange={(e) => this.contentListener(e, 'amount')}
									placeholder="Enter Amount"
								/>
							</FormGroup>
							<FormGroup check>{this.renderTabList()}</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button color="success" onClick={this.modalButtonListener}>
							Save
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
