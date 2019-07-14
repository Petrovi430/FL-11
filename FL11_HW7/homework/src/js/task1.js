let user1 = {'name': 'user@gmail.com', 'pass': 'UserPass'};
let user2 = {'name': 'admin@gmail.com', 'pass': 'AdminPass'};
let emailLength = 6;
let passwordLength = 5;
let password;
let changePass;
let oldPass;
let newPass1;
let newPass2;
let checkLogin = false;
let checkPassword = false;
let changePassword = false;

let email = prompt('Enter your email', '');

if(email===null) {
	alert('Canceled');
} else {
	email = email.trim();
	if (email==='') {
		alert('Canceled');
	} else if (email.length<emailLength) {
		alert('I don\'t know any emails having name length less than 6 symbols');
	} else if (email===user1.name || email===user2.name) {
		checkLogin = true;
	} else {
		alert('I don’t know you');
	}
}

if (checkLogin)	{
	password = prompt('Enter your password', '');
	if(password===null) {
		alert('Canceled');
	} else {
		password = password.trim();
		if (password==='') {
			alert('Canceled');
		} else if (email===user1.name && password===user1.pass || email===user2.name && password===user2.pass) {
			checkPassword = true;
		} else {
			alert('Wrong password');
		}
	}
}	

if (checkPassword) {
	changePass = confirm('Do you want to change your password?');
	if (changePass===true) {
		oldPass = prompt('Enter your old password', '');
		if (oldPass===null) {
			alert('Canceled');
		} else {
			oldPass = oldPass.trim();
			if (oldPass==='') {
				alert('Canceled');
			} else if(email===user1.name && oldPass===user1.pass || email===user2.name && oldPass===user2.pass) {
				changePassword = true;
			} else {
				alert('Wrong password');
			}
		}
	} else {
		alert('You have failed the change.');
	}
}

if (changePassword) {
	newPass1 = prompt('Enter your new password', '');
	if (newPass1.length<passwordLength) {
		alert('It’s too short password. Sorry.');
	} else {
		newPass2 = prompt('Enter your new password again', '');
		if (newPass1===newPass2) {
			alert('You have successfully changed your password.');
		} else {
			alert('You wrote the wrong password.');
		}
	}
}