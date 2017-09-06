// ==UserScript==
// @name         Time Tracker
// @version      1.0
// @description  trabajo muy duro como un esclavo paguenme dinero!
// @author       German Moyano
// @match        http://192.168.6.7/SistemaHorarios2012/Signature/Details/*
// ==/UserScript==

(function() {
    $(".seccion2").find('tr').each(function (i) {
        var $tds = $(this).find('td');
        in1  = $tds.eq(1).text().trim();
        out1 = $tds.eq(2).text().trim();
        in2  = $tds.eq(3).text().trim();
        out2 = $tds.eq(4).text().trim();
    	in3  = $tds.eq(5).text().trim();
    	out3 = $tds.eq(6).text().trim();

    	if (in1 !== '' && i == 1) {
            if (showHTML(out1, in2, out2, in3, out3)) {
                period1 = calculateTime(in1, out1);
                period2 = calculateTime(in2, out2);
                period3 = calculateTime(in3, out3);

                workedTime = sumPeriods(period1, period2, period3);
                createHTMLElement();
                showWorkedTime(workedTime);
            }
        }
	});

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
        if (end !== '') return end;
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

        return (("0" + hours).slice(-2)  + ":" +
                ("0" + minutes).slice(-2) + ":" +
                ("0" + seconds).slice(-2));
    }

    function showHTML(out1, in2, out2, in3, out3) {
        var showHTMLElement = true;
        if (out1 !== '') showHTMLElement = false;
        if (in2 !== '') showHTMLElement = true;
        if (out2 !== '') showHTMLElement = false;
        if (in3 !== '') showHTMLElement = true;
        if (out3 !== '') showHTMLElement = false;

        return showHTMLElement;
    }

  function showWorkedTime(workedTime) {
      var wt = workedTime.split(':');

      var hours   = parseInt(wt[0]);
      var minutes = parseInt(wt[1]);
      var seconds = parseInt(wt[2]);

      setInterval(function() {

          if (seconds > 59) {
              seconds = 0;
              minutes = minutes + 1;
          }

          if (minutes > 59 ) {
              minutes = 0;
              hours = hours + 1;
          }
          seconds = seconds + 1;

          console.log("worked: " + ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2));
          var htmlContent = 'Worked Time: ' + ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
          document.getElementById("workedTime").innerHTML = htmlContent;
      }, 1000);
  }

  function createHTMLElement() {
      $('#details').append("<div id='workedTime' style='text-align: right; color: black; margin-top: 30px; margin-right: 30px;'></div>");
  }
})();
