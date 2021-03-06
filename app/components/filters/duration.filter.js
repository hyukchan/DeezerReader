angular.module('myApp')
	.filter('duration', function () {
		return function (seconds) {
			var hours   = Math.floor(seconds / 3600);
			var minutes = Math.floor((seconds - (hours * 3600)) / 60);
			var seconds = seconds - (hours * 3600) - (minutes * 60);
			var time = "";

			if (hours != 0) {
				time = hours+":";
			}
			if (minutes != 0 || time !== "") {
				minutes = (minutes < 10 && time !== "") ? "0"+minutes : String(minutes);
				time += minutes+":";
			}
			if (time === "") {
				time = seconds+"s";
			}
			else {
				time += (seconds < 10) ? "0"+seconds : String(seconds);
			}
			return time;
		};
	});