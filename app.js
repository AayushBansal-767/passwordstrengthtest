var strengthMeter = document.getElementById("strength-meter")
var passwordInput = document.getElementById("password-input")
var reasonsContainer = document.getElementById("reasons")

passwordInput.addEventListener('input',updateStrengthMeter)

updateStrengthMeter()

function updateStrengthMeter(){
	var weaknesses=calculatePasswordStrength(passwordInput.value)
	var strength=100

	reasonsContainer.innerHTML =""

	weaknesses.forEach( weakness =>{
		 if (weakness == null) return
		strength -= weakness.deduction
		var messageElement = document.createElement("div")
		messageElement.innerText = weakness.message
		reasonsContainer.appendChild(messageElement)

	})
	strengthMeter.style.setProperty("--strength", strength )

}

function calculatePasswordStrength(password) {
	var weaknesses = []
  	weaknesses.push(lengthWeakness(password))
  	weaknesses.push(lowercaseWeakness(password))
  	weaknesses.push(uppercaseWeakness(password))
  	weaknesses.push(numberWeakness(password))
	weaknesses.push(specialCharactersWeakness(password))
	weaknesses.push(repeatCharactersWeakness(password))
	

	return weaknesses
}

function lengthWeakness(password){
	var length = password.length
		if (length <= 5) {
	    return {
	      message: 'Your password is too short',
	      deduction: 40
	    }
	  }

	  if (length <= 10) {
	    return {
	      message: 'Your password could be longer',
	      deduction: 15
	    }
	}
}
function lowercaseWeakness(password){
	return characterType(password, /[a-z]/g ,"lowercase characters")
	
}

function uppercaseWeakness(password){
	return characterType(password, /[A-Z]/g ,"uppercase characters")
	
}

function numberWeakness(password){
	return characterType(password, /[0-9]/g ,"numbers")
	
}
function specialCharactersWeakness(password){
	return characterType(password, /[^0-9a-zA-Z\s]/g ,"special characters")
}
function repeatCharactersWeakness(password){
	var matches = password.match(/(.)\1/) || []
	if(matches.length >0){
		return {
	      message: `Your password has repeat characters`,
	      deduction: matches.length * 10
	    }
	}

}

function characterType(password, regex ,type){
	var matches = password.match(regex) || []
	if (matches.length ===0){
		return {
	      message: `Your password has no ${type}`,
	      deduction: 20
	    }
	}
	if (matches.length <=2){
		return {
	      message: `You could use more ${type}`,
	      deduction: 5
	    }
	}
}