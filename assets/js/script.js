$(document).ready(function() {
	// Declare variable
	var breakTime = 05;
	var sessionTime = 25;
	var tone = $("#buzzer")[0];
	var sec = 60;


	// Set break time value
	$(".breakSet").click(function() {
		breakTime = $(".BREAK").val();
		if(!breakTime){
			alert("Enter \"Break\" Time");
		}
	});

	// Set working time value
	$(".sessionSet").click(function() {
		sessionTime = $(".SESSION").val();
		if(!breakTime){
			alert("Enter \"Session\" Time");
		}else{
			$(".min").html(sessionTime);
		}
		
	});

	// Session starting function
	function startSessionTime(){
		$(".status").html("WORK");
		sessionTime-=1;
		$(".min").html(sessionTime);
		if (sessionTime < 10){
			$(".min").html("0"+sessionTime);
		};
		var sessionCounter = setInterval(timer, 1000);
		function timer(){
			sec-=1;
			$(".sec").html(sec);
			console.log(sec);
			if (sec === 0) {
				sessionTime-=1;
				$(".min").html(sessionTime);
				sec = 60;
				if(sessionTime === -1) {
					tone.play();
					clearInterval(sessionCounter);
					alert("Working Time Is Over. Break Time Start");
					startBreakTime();
					
				};
			};
			if (sec < 10) {
				$(".sec").html("0"+sec);
			};
			if (sessionTime < 10){
				$(".min").html("0"+sessionTime);
			};
		};
	};

	// Break Starting Function
	function startBreakTime(){
		$(".status").html("BREAK");
		console.log("OK");
		$(".min").html(breakTime);
		breakTime-=1;
		$(".min").html(breakTime);
		if (breakTime < 10){
			$(".min").html("0"+breakTime);
		};
		var breakCounter = setInterval(timer, 1000);
		function timer(){
			sec-=1;
			$(".sec").html(sec);
			console.log(sec);
			if (sec === 0) {
				breakTime-=1;
				$(".min").html(breakTime);
				sec = 60;
				if(breakTime === -1) {
					$(".time").html("00 : 00");		
					tone.play();
					clearInterval(breakCounter);
					alert("Your Break Time Is Over. Do You Wanna Start Work Again?");
				};
			};
			if (sec < 10) {
				$(".sec").html("0"+sec);
			};
			if (breakTime < 10){
				$(".min").html("0"+breakTime);
			};
		};
	};

	// Start Countdown
	$(".start").click(function(){
		if(!sessionTime){
			alert("Please set the \"Session Time\" & the \"Break Time\".");
		} else{
			startSessionTime();
			console.log(sessionTime);
			$(".start").addClass("disabled");
		}
	});
});