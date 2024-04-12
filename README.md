# design patterns

## Creational Design Patterns

### Module Pattern

```javascript
var testModule = (function () {
  var counter = 0;
  return {
    incrementCounter: function () {
      return counter++;
    },
    resetCounter: function () {
      console.log("counter value prior to reset: " + counter);
      counter = 0;
    },
  };
})();

// Usage:
testModule.incrementCounter();
testModule.resetCounter();
```

### Singleton

```javascript
var Singleton = (function () {
  var instance;
  function createInstance() {
    var object = new Object("I am the instance");
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

function run() {
  var instance1 = Singleton.getInstance();
  var instance2 = Singleton.getInstance();
  alert("Same instance? " + (instance1 === instance2));
}

run();
```

### Proxy pattern

```javascript
function GeoCoder() {
  this.getLatLng = function (address) {
    if (address === "Amsterdam") {
      return "52.3700° N, 4.8900° E";
    } else if (address === "London") {
      return "51.5171° N, 0.1062° W";
    } else if (address === "Paris") {
      return "48.8742° N, 2.3470° E";
    } else if (address === "Berlin") {
      return "52.5233° N, 13.4127° E";
    } else {
      return "";
    }
  };
}

function GeoProxy() {
  var geocoder = new GeoCoder();
  var geocache = {};

  return {
    getLatLng: function (address) {
      if (!geocache[address]) {
        geocache[address] = geocoder.getLatLng(address);
      }
      log.add(address + ": " + geocache[address]);
      return geocache[address];
    },
    getCount: function () {
      var count = 0;
      for (var code in geocache) {
        count++;
      }
      return count;
    },
  };
}

// log helper
var log = (function () {
  var log = "";

  return {
    add: function (msg) {
      log += msg + "\n";
    },
    show: function () {
      console.log(log);
      log = "";
    },
  };
})();

function run() {
  var geo = new GeoProxy();

  // geolocation requests
  geo.getLatLng("Paris");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("London");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("Amsterdam");
  geo.getLatLng("London");
  geo.getLatLng("London");

  log.add("\nCache size: " + geo.getCount());
  log.show();
}

run();
```

### Factory

```javascript
function Factory() {
  this.createEmployee = function (type) {
    var employee;
    if (type === "fulltime") {
      employee = new FullTime();
    } else if (type === "parttime") {
      employee = new PartTime();
    } else if (type === "temporary") {
      employee = new Temporary();
    } else if (type === "contractor") {
      employee = new Contractor();
    }
    employee.type = type;
    employee.say = function () {
      log.add(this.type + ": rate " + this.hourly + "/hour");
    };
    return employee;
  };
}
```
