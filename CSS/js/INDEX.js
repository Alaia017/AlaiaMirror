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





	   
