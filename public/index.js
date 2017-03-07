// *****************
// Control
// *****************
waterfall({}, [getLocation, getTemperature], renderData);


function waterfall(obj, tasks, cb) {
  if (tasks.length === 0) {
    return cb(null, obj);
  }

  tasks[0](obj, function(err, res) {
    if (err) {
      return cb(err);
    }
    waterfall(res, tasks.slice(1), cb);
  });
}


function getLocation(obj, cb) {
  var locationUrl = 'https://geoip.nekudo.com/api/';

  makeRequest(locationUrl, function(err, responseText) {
    if (err) {
      return cb(err);
    }
    cb(null, handleLocation(obj, responseText));
  });
}


function getTemperature(obj, cb) {
  var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${obj.latitude}&lon=${obj.longitude}&units=metric&APPID=93b0b9be965a11f0f099c8c7f74afa63`;

  makeRequest(weatherUrl, function(err, responseText) {
    if (err) {
      return cb(err);
    }
    cb(null, handleWeather(obj, responseText));
  });
}


function handleLocation(obj, responseText) {
  var locationObj = JSON.parse(responseText);
  obj.latitude = locationObj.location.latitude;
  obj.longitude = locationObj.location.longitude;
  obj.city = locationObj.city;
  return obj;
}


function handleWeather(obj, responseText) {
  var weatherObj = JSON.parse(responseText);
  obj.temperature = weatherObj.main.temp;
  return obj;
}


function makeRequest(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    }
  }

  xhr.onerror = function() {
    cb('API Error');
  }
  xhr.send();
}



// *****************
// View
// *****************
function renderData(err, data) {
  if (err) {
    return console.log('renderData', err);
  }
  var locationDOM = document.querySelector('.location');
  locationDOM.textContent = `City: ${data.city}, Latitude: ${data.latitude}, Longitude: ${data.longitude}`;

  var temperatureDOM = document.querySelector('.temperature');
  temperatureDOM.textContent = `Current temperature: ${data.temperature}°C`;
}
