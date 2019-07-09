let user1 = {'name': 'user@gmail.com', 'pas': 'UserPass'};
let user2 = {'name': 'admin@gmail.com', 'pas': 'AdminPass'};
let email = prompt('Enter your email', '');
let emailLength = 6;
let passwordLength = 5;
let password;
let changePass;
let oldPas;
let newPass1;
let newPass2;

if(email===null) {
	alert('Canceled');
} else {
	email = email.trim();
	if (email==='') {
		alert('Canceled');
	} else if (email.length < emailLength) {
		alert('I don\'t know any emails having name length less than 6 symbols');
	} else if (email===user1.name || email===user2.name) {
		password = prompt('Enter your password', '');
		if(password===null) {
			alert('Canceled');
		} else {
			password = password.trim();
			if (password==='') {
				alert('Canceled');
			} else if (email===user1.name && password===user1.pas || email===user2.name && password===user2.pas) {
				changePass = confirm('Do you want to change your password?');
				if (changePass===true) {
					oldPas = prompt('Enter your old password', '');
					if(oldPas===null) {
						alert('Canceled');
					} else {
						oldPas = oldPas.trim();
						if (oldPas==='') {
							alert('Canceled');
						}else if(email===user1.name && oldPas===user1.pas || email===user2.name && oldPas===user2.pas){
							newPass1 = prompt('Enter your new password', '');
							if(newPass1.length < passwordLength) {
								alert('It’s too short password. Sorry.');
							} else {
								newPass2 = prompt('Enter your new password again', '');
								if(newPass1===newPass2) {
									alert('You have successfully changed your password.');
								} else {
									alert('You wrote the wrong password.');
								}
							}
						} else {
							alert('Wrong password');
						}
					}
				} else {
					alert('You have failed the change.');
				}
			} else {
				alert('Wrong password');
			}
		}
	} else {
		alert('I don’t know you');
	}
}