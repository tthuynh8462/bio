
        var deviceID = "32003f000451353431383736";
        var accessToken = "7daab2e3130bd9e9d3a588e3e2e453df96bdc822";
        var eventSource = new EventSource("https://api.spark.io/v1/devices/" + deviceID + "/events/?access_token=" + accessToken);
        var height = 390;

        eventSource.addEventListener('open', function(e) {
            console.log("Opened!"); },false);

        eventSource.addEventListener('error', function(e) {
            console.log("Errored!"); },false);

        eventSource.addEventListener('TemperatureSensor', function(e) {
            var parsedData = JSON.parse(e.data);

            // tempSpan = "Core: " + parsedData.coreid + " uptime: " + parsedData.data + " (h:m:s)";
            // tsSpan = "At timestamp " + parsedData.published_at;
            var temp = (JSON.parse(parsedData.data)).TempuratureCelsius;
            console.log("temp: " + temp);
            var humidity = (JSON.parse(parsedData.data)).Humidity;
            console.log(humidity);
		    $('.vl').css({
		      height: 115 + (275 * (temp/40)) + 'px'
		      //background: 'rgb(' + (255 * (height - 115)/390) + ',' + 0 +',' + 0 + ')'
		    });
		    height = document.querySelector('.vl').style.height;
		    var actualHeight = height.slice(0, -2);

		    var r = (255.0 * ((actualHeight - 115.0)/275.0));
		    var b = (255.0 * (1.0 - ((actualHeight - 115.0)/275.0)));

		   	// r = r.toString().split('.')[0];
		   	// b =b.toString().split('.')[0];
		   	r = Math.floor(r);
		   	b = Math.floor(b);
		   
		    document.querySelector('.vl').style.backgroundColor = 'rgb(' + (r) + ',' + 0 + ',' + (b) + ')';

		$('.fa').on('mouseover', function () {
		    $(".highlight").css('visibility','visible');
		   	$(".text1").css('visibility','visible');
		   	$(".text2").css('visibility','visible');
		   	$(".text3").css('visibility','visible');
		   	$(".text4").css('visibility','visible');
		    $(".highlight2").css('visibility','visible');
		    $(".highlight3").css('visibility','visible');
		});  
		$('.fa').on('mouseout', function () {
		    $(".highlight2").css('visibility','hidden');
		    $(".highlight").css('visibility','hidden');
		    $(".highlight3").css('visibility','hidden');
		   	$(".text1").css('visibility','hidden');
		   	$(".text2").css('visibility','hidden');
		   	$(".text3").css('visibility','hidden');
		   	$(".text4").css('visibility','hidden');
		}); 

		$('.meter').on('mouseover', function () {
		    document.getElementById("temper").innerHTML = Math.round(temp*100)/100 + "°C";
		    document.getElementById("humid2").innerHTML = Math.round(humidity*100)/100 + "%";
		});  
		$('.meter').on('mouseout', function () {
		   	document.getElementById("temper").innerHTML = "";
		   	document.getElementById("humid2").innerHTML = "";
		}); 


eventSource.addEventListener('SoilSensor', function(e) {
        	console.error(e.data)
            var parsedData = JSON.parse(e.data);
            tempSpan = "Core: " + parsedData.coreid + " uptime: " + parsedData.data + " (h:m:s)";
            tsSpan = "At timestamp " + parsedData.published_at;
            var soilTemp = (JSON.parse(parsedData.data).SoilTemperatureCelsius);
            var soilHumidity = (JSON.parse(parsedData.data).SoilHumidity);
            console.log(soilHumidity);
            //document.getElementById('soil').innerHTML = soilTemp;
            // var soilTemp = (JSON.parse(parsedData.data)).SoilTempuratureCelsius
            // console.error(soilTemp)
            // console.error(temp)

            // document.getElementById('temp').innerHTML = temp;

		$('.plant-pot').on('mouseover', function () {
			document.getElementById("humid").innerHTML = Math.round(soilHumidity*100)/100 + "%";
		    document.getElementById("soiltemp").innerHTML = Math.round(soilTemp*100)/100 + "°C";
		});  
		$('.plant-pot').on('mouseout', function () {
		   	document.getElementById("humid").innerHTML = "";
		    document.getElementById("soiltemp").innerHTML = "";

		});

		if(soilHumidity <= 45.0){
			document.getElementById("advice").innerHTML = "water your plants.";
		}
		else if((soilHumidity > 45)&&(soilHumidity <= 65.0)){
			document.getElementById("advice").innerHTML = "perfect amount of water.";
		}
		else{
			document.getElementById("advice").innerHTML = "there's too much water.";
		}

        }, false);

        }, false);  
 	

$('.sun').on('mouseover', function () {
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + "Calgary" + "&mode=json&units=metric&cnt=10&APPID=c65c40d6dd6409c43978f71b7abe3a6f", function (data) {
    console.log(data.list[0].weather[0].main);
    var weather = data.list[0].weather[0].main;
    /*switch (weather) {
      case "Rain":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://www.scienceabc.com/wp-content/uploads/2015/05/Walking-in-Rain.jpg)");
        break;
      case "Snow":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://www.scienceabc.com/wp-content/uploads/2015/05/Walking-in-Rain.jpg)");
        break;
      case "Clear":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://cdn.pixabay.com/photo/2016/01/02/01/51/clouds-1117584_1280.jpg)");
        break;
      case "Clouds":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://www.metoffice.gov.uk/binaries/content/gallery/mohippo/images/migrated-image/j/cumulus_1.jpg)");
        break;
    }*/
    document.getElementById("city").innerHTML = data.city.name;
    document.getElementById("weather").innerHTML = data.list[0].weather[0].description;
    document.getElementById("humidity").innerHTML = "Humidity: " + data.list[0].humidity + "%";
    document.getElementById("temp").innerHTML = "Temperature: " + data.list[0].temp.day + "°C";
  });
}); 

$('.sun').on('mouseout', function () {
    document.getElementById("city").innerHTML = "";
    document.getElementById("weather").innerHTML = "";
    document.getElementById("humidity").innerHTML = "";
    document.getElementById("temp").innerHTML = "";
  
});  

//Get weather data by typing in city name
document.getElementById("get-weather").onclick = function () {
  cityName = document.getElementById("cityId").value;
  console.log(cityName);
  $.getJSON("https://api.openweathermap.org/data/2.5/forecast/daily?q=" + "Toronto" + "&mode=json&units=metric&cnt=10&APPID=c65c40d6dd6409c43978f71b7abe3a6f", function (data) {
    console.log(data.list[0].weather[0].main);
    var weather = data.list[0].weather[0].main;
    switch (weather) {
      case "Rain":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://www.scienceabc.com/wp-content/uploads/2015/05/Walking-in-Rain.jpg)");
        break;
      case "Clear":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://cdn.pixabay.com/photo/2016/01/02/01/51/clouds-1117584_1280.jpg)");
        break;
      case "Clouds":
        document.getElementById("pictureContainer").setAttribute("style", "background-image: url(https://www.metoffice.gov.uk/binaries/content/gallery/mohippo/images/migrated-image/j/cumulus_1.jpg)");
        break;
    }
    document.getElementById("city").innerHTML = data.city.name;
    document.getElementById("weather").innerHTML = data.list[0].weather[0].description;
    document.getElementById("humidity").innerHTML = "Humidity: " + data.list[0].humidity + "%";
    document.getElementById("temp").innerHTML = "Temperature: " + data.list[0].temp.day + "°C";
  });
};


