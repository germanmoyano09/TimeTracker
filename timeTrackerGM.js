function timeTracker() {
    $(".seccion2").find('tr').each(function (i) {
    var $tds = $(this).find('td'),
        //fecha = $tds.eq(0).text(),
        in1  = $tds.eq(1).text().trim(),
        out1 = $tds.eq(2).text().trim();
        in2  = $tds.eq(3).text().trim();
        out2 = $tds.eq(4).text().trim();
    	in3  = $tds.eq(5).text().trim();
    	out3 = $tds.eq(6).text().trim();
    	
    	if (in1 != '') {
    		period1 = calculateTime(in1, out1);
    		period2 = calculateTime(in2, out2);
    		period3 = calculateTime(in3, out3);	
    	
			workedTime = sumPeriods(period1, period2, period3);
			alert(workedTime);
    	}    	
	})
}


function calculateTime(start, end) {
	if (start === '') return '';

	times = [];
	times1 = start.split(':');
	times2 = getEndTime(end).split(':'); 

	for (var i = 0; i < 3; i++) {
		times1[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i]);
		times2[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i]);
		times[i] = times2[i] - times1[i];
	}

	var seconds = times[2];
	var minutes = times[1];
	var hours = times[0];

	if (seconds < 0) {
		seconds = seconds + 60;
		minutes = minutes - 1;
	}

	if (minutes < 0 ) {
		minutes = minutes + 60;
		hours = hours - 1;
	}

	return hours + ':' + minutes + ':' + seconds;
}

function getEndTime(end) {
	if (end != '') return end;
	var time = new Date();
	
	return (("0" + time.getHours()).slice(-2)  + ":" + 
    	   ("0" + time.getMinutes()).slice(-2) + ":" + 
    	   ("0" + time.getSeconds()).slice(-2));
}

function sumPeriods(period1, period2, period3) {
	times = [];
	times1 = period1.split(':');
	times2 = period2.split(':'); 
	times3 = period3.split(':'); 

	for (var i = 0; i < 3; i++) {
		times1[i] = (isNaN(parseInt(times1[i]))) ? 0 : parseInt(times1[i]);
		times2[i] = (isNaN(parseInt(times2[i]))) ? 0 : parseInt(times2[i]);
		times3[i] = (isNaN(parseInt(times3[i]))) ? 0 : parseInt(times3[i]);
		times[i] = times1[i] + times2[i] + times3[i];
	}

	var seconds = times[2];
	var minutes = times[1];
	var hours = times[0];

	if (seconds >= 60) {
		seconds = seconds - 60;
		minutes = minutes + 1;

		if (seconds >= 60) {
			seconds = seconds - 60;
			minutes = minutes + 1;
		}
	}

	if (minutes >= 60) {
		minutes = minutes - 60;
		hours = hours + 1;

		if (minutes >= 60) {
			minutes = minutes - 60;
			hours = hours + 1;
		}
	}

	return hours + ':' + minutes + ':' + seconds;
}