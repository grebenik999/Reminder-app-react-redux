import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addReminder, deleteReminder, clearReminders} from '../actions';
import moment from 'moment';

class App extends Component {
		constructor(props) {
				super(props);
				this.state = {
						text: '',
						dueDate: ''
				}
		}

		addReminder() {
				console.log('this.state.dueDate', this.state.dueDate);
				this
						.props
						.addReminder(this.state.text, this.state.dueDate);
		}

		deleteReminder(id) {
				this
						.props
						.deleteReminder(id);
		}

		renderReminders() {
				const {reminders} = this.props;
				return (
						<ul className="list list-group col-sm-6">
								{reminders.map(reminder => {
										return (
												<li key={reminder.id} className="list-group-item">
														<div className="list-item">
																<div>{reminder.text}</div>
																<div>
																		<em>{moment(new Date(reminder.dueDate)).fromNow()}</em>
																</div>
																<div
																		onClick=
																		{() => this.deleteReminder(reminder.id) }
																		className="list-item delete-button">
																		&#x2715;</div>
														</div>
												</li>
										)
								})
}
						</ul>
				)
		}

		render() {
				return (
						<div className="App">
								<div className="title">
										Планировщик задач
								</div>
								<div className="form-inline reminder-form">
										<div className="form-group">
												<input
														className="form-control"
														type="text"
														placeholder="Новая задача..."
														onChange={event => this.setState({text: event.target.value})}/>
												<input
														type="datetime-local"
														className="form-control"
														onChange={event => this.setState({dueDate: event.target.value})}/>
										</div>
										<button
												type="button"
												className="btn btn-success"
												onClick={() => this.addReminder()}>
												Добавить
										</button>
										<button
												className="btn btn-danger"
												onClick=
												{ () => this.props.clearReminders() }>
												Удалить все
										</button>
								</div>
								{this.renderReminders()}

						</div>
				)
		}
}

function mapStateToProps(state) {
		return {reminders: state}
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders})(App);