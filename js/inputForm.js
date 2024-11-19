
// 전화번호 타입지정
function formatPhoneNumber(input) {
	// 숫자만 허용
	let cleanedInput = input.value.replace(/[^0-9]/g, '');

	// 010으로 시작하는지 확인
	if (cleanedInput.startsWith('010')) {
		// 11자리 숫자일 경우
		if (cleanedInput.length > 7) {
			input.value = cleanedInput.replace(/(\d{3})(\d{4})(\d{1})/, '$1-$2-$3');

		} else if (cleanedInput.length > 3) {
			input.value = cleanedInput.replace(/(\d{3})(\d{1})/, '$1-$2');
		} else {
			input.value = cleanedInput; // 11자리가 아닐 경우 하이픈 추가하지 않음
		}
	} else {
		// 010이 아닐 경우 입력값 초기화
		input.value = cleanedInput;
	}
}

// 생년월일 타입지정
function formatBirthNumber(input) {
	// 숫자만 허용
	let cleanedInput = input.value.replace(/[^0-9]/g, '');
	input.value = cleanedInput;
}

// 사업자등록번호 타입지정
function formatBRNumber(input) {
  	    // 숫자만 허용
  	    let cleanedInput = input.value.replace(/[^0-9]/g, '');

  	    // 010으로 시작하는지 확인

  	        // 11자리 숫자일 경우
  	        if (cleanedInput.length > 5) {
  	            input.value = cleanedInput.replace(/(\d{3})(\d{2})(\d{1})/, '$1-$2-$3');
  	            
  	        } else if(cleanedInput.length > 3){
  	        	 input.value = cleanedInput.replace(/(\d{3})(\d{1})/, '$1-$2');
  	        } else {
  	            input.value = cleanedInput; // 11자리가 아닐 경우 하이픈 추가하지 않음
  	        }
  	    } 