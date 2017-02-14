import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Api from '../../api';

import styles from './Auth.module.scss';

export default class Auth extends Component {
    static propTypes = {
        onLoggedIn: PropTypes.func
    };

    static validatePassword = (password) => {
        const MIN_PASSWORD_LENGTH = 6;
        const passLength = password.length;
        if (passLength < MIN_PASSWORD_LENGTH) {
            if (passLength === 0) {
                return 'Field can not be empty'
            }

            return `Password should be more then ${MIN_PASSWORD_LENGTH} symbols`
        }
    };

    static validateUsername = (username) => {

    };


    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            invalidUsername: false,
            invalidPassword: false
        }
    }

    componentDidMount() {
        Api.fetchUser(1).then((res) => {
            console.log(res.user);
        })
    }

    handleUsernameChange = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = (event) => {
        const password = event.target.value;
        const invalidPasswordMessage = Auth.validatePassword(password);

        this.setState({
            invalidPassword: !!invalidPasswordMessage,
            invalidPasswordMessage,
            password
        });
    };

    handleSubmit = () => {
        const { invalidPassword, invalidUsername } = this.state;

        if (!invalidPassword && !invalidUsername) {
            this.props.onLoggedIn();
        }
    };

    render() {
        const { invalidPasswordMessage } = this.state;
        const passwordClassNames = classnames({
            [styles.invalid]: invalidPasswordMessage
        });
        return (
            <div className={ styles.authComponent }>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" onChange={ this.handleUsernameChange } />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" className={ passwordClassNames } onChange={ this.handlePasswordChange } />
                    { invalidPasswordMessage && <div className={ styles.error }>{ invalidPasswordMessage }</div> }
                </div>
                <div className={ styles.submit }>
                    <button onClick={ this.handleSubmit }>Sign in</button>
                </div>
                <div></div>
            </div>
        )
    }
}

