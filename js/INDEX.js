var w;

angular.module('jsbin', [])
   .controller('HelloWorldController', function($scope) {
		
});




var app = angular.module('jsbin', []);

app.controller('DemoCtrl', function($http) {
  
  
   
  var vm = this;
  
  var URL = 'http://api.openweathermap.org/data/2.5/weather?q=Asuncion&units=metric&lang=es';
  
  var request = {
    method: 'GET',
    url: URL,
    params: {
      mode: 'json',
      cnt: '7',
      appid: '4118751f9d2df676a1e4274260a78829'
    }
  };
  
  var HOY = new Date()
		var curHr = HOY.getHours()
		if (curHr < 12) {
		  vm.saludo = "Buenos días";
		} else if (curHr < 18) {
		  vm.saludo = "Buenas tardes";
		} else {
		  vm.saludo = "Buenas noches";
		}
  
  $http(request)
    .then(function(response) {
	  w = response.data;
	 vm.desc =  Tradw(w.weather[0].description);
	 vm.temp =  w.main.temp;
	 vm.temp_min =  w.main.temp_min;
	 vm.temp_max =  w.main.temp_max;
	 vm.img = "http://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/" + w.weather[0].icon + ".png"
		
    }).
    catch(function(response) {
      vm.data = response.data;
    });
 

});


	   
function Tradw(w){
	switch(w.toString()){
		case "cielo claro": w = "Cielo despejado";break;
                case "algo de nubes": w = "Nubes dispersas";break;
                case "nubes dispersas": w = "Nubes dispersas";break; 
                case "nubes rotas": w = "Parcialmente nublado";break;
	}
	return w;
}


function Fecha(){
    var HOY = new Date();
    var h = HOY.getHours();
    var m = HOY.getMinutes();
   
    m = Hora(m);
  
	
	document.getElementById("footer").innerHTML = h + ":" + m 
	setTimeout(function(){ Fecha(); }, 1000);	
}	   




function Hora(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}	
Fecha();



function DMA(){
var dias_semana = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado");
var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
var fecha_hoy = new Date();

document.getElementById("Fechaa").innerHTML = dias_semana[fecha_hoy.getDay()] + '&nbsp' + fecha_hoy.getDate() + " de " + meses[fecha_hoy.getMonth()] + " de " + fecha_hoy.getFullYear();
}  
DMA();

$(document).ready(function() {
  getLocation();
})

function getLocation() {
  var location;
  $.ajax({
    format: "jsonp",
    dataType: "jsonp",
    url: "http://ip-api.com/json",
    success: function(data) {
      location = (data.lat + "," + data.lon);
      $("#weather-location").html(data.city + ", " + data.region);
      getURL(location)
    },
    error: function() {
      httpsLocation();
    },
    method: "GET"
  });

  function httpsLocation() {
    if (navigator.geolocation) {
      var location;
      navigator.geolocation.getCurrentPosition(passLocation);
    }
  }

  function passLocation(position) {
    location = position.coords.latitude + ", " + position.coords.longitude;
    setCity(location);
    getURL(location);
  }
}

function setCity(latLon) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLon + "&sensor=true";
  url = url.replace(/\s/g, "");
  $.ajax({
    format: "json",
    dataType: "json",
    url: url,
    success: function(data) {
      $('#weather-location').html(data.results[0].address_components[2].long_name);
    },
    method: "GET"
  });
}

function getURL(location, tempSetting) {
  var url = ("https://api.forecast.io/forecast/2b4b9e2d0c9c7ba61f588616d2967c9c/" + location+"?units=si");
  //console.log(url);
  getJson(url);

}

function getJson(url) {
  //console.log("started getJson with this url: " + url);

  $.ajax({
      format: "jsonp",
      dataType: "jsonp",
      url: url,
      success: function(json) {
        //console.log("great success");
        $("#weather-current").html(Math.round(json.currently.temperature) + "°");
        $("#weather-high").html("Max: "+ Math.round(json.daily.data[0].temperatureMax) + "°");
        $("#weather-low").html("Min: "+ Math.round(json.daily.data[0].temperatureMin) + "°");

      }

    })
    .error(function(jqXHR, textStatus, errorThrown) {
      alert("error: " + JSON.stringify(jqXHR));
    })
}


function setBackground(weatherIcon) {
  //console.log(weatherIcon);
  switch (weatherIcon) {
    case "clear-day":
      document.getElementById("body").style.backgroundImage = 'url("http://feelgrafix.com/data_images/out/15/899301-sunny-day.jpg")';
      break;
    case "clear-night":
      document.getElementById("body").style.backgroundImage = 'url("https://tcklusman.files.wordpress.com/2014/05/tumblr_static_dark-starry-night-sky-226736.jpg")';
      break;
    case "rain":
      document.getElementById("body").style.backgroundImage = 'url("http://wearechange.org/wp-content/uploads/2015/03/1_See_It.jpg")';
      break;
    case "cloudy":
      document.getElementById("body").style.backgroundImage = 'url("http://www.tripwire.com/state-of-security/wp-content/uploads/cache//shutterstock_106367810/4261234929.jpg")';
      break;
    case "partly-cloudy-day":
      document.getElementById("body").style.backgroundImage = 'url("http://www.sturdyforcommonthings.com/wp-content/uploads/2013/03/wind_blowing.jpg")';
      break;
    case "partly-cloudy-night":
      document.getElementById("body").style.backgroundImage = 'url("http://scienceblogs.com/startswithabang/files/2013/04/night-sky-stars.jpeg")';
      break;
    case "snow":
      document.getElementById("body").style.backgroundImage = 'url("http://www.vancitybuzz.com/wp-content/uploads/2015/12/shutterstock_315123593-984x500.jpg")';
      break;
    default:
      break;

  }

} 




	   
