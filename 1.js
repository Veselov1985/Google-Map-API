var map;
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: {lat:50.00467742493268,lng: 36.23359680175781}
        });
     
      }

window.onload = function () {

var arr;
      var neighborhoods = [];
      var markers = [];
      var textarea =document.getElementsByTagName("textarea")[0];
      var input = document.getElementById("input");
    
    input.onclick = function(){
      drop();
    }  
	 
      
       
       

       function drop() {
        clearMarkers();
        chekEnter(textarea.value);
        for (var i = 0; i < neighborhoods.length; i++) {
          if(neighborhoods[i].lat==false) continue;
          addMarkerWith(neighborhoods[i],i);
        }
    
      }

      function addMarkerWith(position,i) {
        
         markers.push(new google.maps.Marker({
            position: position,
            map: map,
            animation: google.maps.Animation.DROP
          }));
         markers[i].setMap(map);

var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">Marks</h3>'+
      '<div id="bodyContent">'+
       '<p><b>Строка : </b>' +(i+1)+
     '</p>'+
      '<p><b>Широта: </b>' +position.lat+
     '</p>'+
     '<p><b>Долгота: </b>' +position.lng+
     '</p>'+
      '</div>'+
      '</div>';


var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

markers[i].addListener('click', function() {
    infowindow.open(map, markers[i]);
  });

   }
      

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }
        markers = [];
        neighborhoods = [];
        arr=[];
      }



     function chekEnter (str) {
    arr = str.split("\n");
    var reg = /-?\d{1,3}\.?\d+/;
    //проверка валидности введенных данных в n-строке
    for(var i=0;i<arr.length;i++) {

      arr[i]=arr[i].trim();
     var arr1 =arr[i].split(" ");

     //создадим массив для отсева пробелов между значениями долготы и широты
     var arrRes = [];
     for(var j=0;j<arr1.length;j++){
      if(arr1[j]=="") continue;
      arrRes.push(arr1[j]);
     }

     if(arrRes.length!=2) {
     neighborhoods[i]= {lat:false,lng:false};
      continue;
     }

     if(!(reg.test(arrRes[0]) && reg.test(arrRes[1]))) {
      neighborhoods[i]= {lat:false,lng:false};
      continue;
  }
      neighborhoods[i]={lat:+arrRes[0],lng:+arrRes[1]};
  }

  }



 document.getElementsByTagName('textarea')[0].onkeypress = function(e) {

      e = e || event;

      if (e.ctrlKey || e.altKey || e.metaKey) return;

      var chr = getChar(e);
      if (chr == null) return;
       var reg = /[^0-9\b\.\ \n\-]/gi;
      if (reg.test(chr)) {
        return false;
      }


    }

    function getChar(event) {
      if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) 
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) 
      }

      return null; 
    }

}