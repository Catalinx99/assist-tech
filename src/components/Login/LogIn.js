import "./LoginCss.css"
import { useState } from "react";
import serviceApi from "../services"
const LogIn = () => {
	const services = new serviceApi();
	const login = (data) => {
		services.get(`users/?email=${data.email}&password=${data.password}`).then(res => {
			if (res && res.length > 0) {
				const formattedUserData = res[0];
				delete formattedUserData.password;
				localStorage.setItem('user', JSON.stringify(formattedUserData));
				switch (formattedUserData.role) {
					case 'user':
						window.location.replace('/office-status');
						break;
					case 'administrator':
						window.location.replace('/user-management');
						break;
					case 'officeAdministrator':
						window.location.replace('/office-status');
						break;

					default:
						break;
				}
			}
			else {
				localStorage.clear();
			}
		})

	}

	const [loginFormData, setLoginFormData] = useState({
		email: '',
		password: '',
	})

	const handleAddFormChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.name;
		const fieldValue = event.target.value;

		const newFormData = { ...loginFormData };
		newFormData[fieldName] = fieldValue;

		setLoginFormData(newFormData);
	};

	return (
		<div>
			<div className="center">
				<h1>Login</h1>
				<form>
					<div className="txt_field">
						<input type="text" name="email" required onChange={handleAddFormChange} />
						<span></span>
						<label> Email </label>
					</div>
					<div className="txt_field">
						<input type="password" name="password" required onChange={handleAddFormChange} />
						<span></span>
						<label> Password </label>
					</div>
					<div className="pass">
						<a href="/forgotpw"> Forgot password ?</a>
					</div>
					<button type="button" className="loginButton" onClick={() => login(loginFormData)}>Login</button>
				</form>
			</div>
		</div>
	)
}

export default LogIn
