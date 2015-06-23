
angular.module('starter.controllers', [])
 
.controller('AppCtrl', function() {})
 
.controller('DeviceCtrl', function($ionicPlatform, $scope, $cordovaDevice) {
    $ionicPlatform.ready(function() {
        $scope.$apply(function() {
            // sometimes binding does not work! :/
 
            // getting device infor from $cordovaDevice
            var device = $cordovaDevice.getDevice();
 
            $scope.manufacturer = device.manufacturer;
            $scope.model = device.model;
            $scope.platform = device.platform;
            $scope.uuid = device.uuid;
 
        });
 
    });
})

.controller('BatteryCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaBatteryStatus) {
 
    $ionicPlatform.ready(function() {
 
        // This code never worked on my Samsung Note III
        $rootScope.$on('$cordovaBatteryStatus:status', function(result) {
            $scope.$apply(function() {
                // sometimes binding does not work! :/
 
                $scope.batteryLevel = result.level; // (0 - 100)
                $scope.isPluggedIn = result.isPlugged; // bool
            });
        });
 
        // But this code works!!
        // $scope.onBatteryStatus = function(result) {
        //     $scope.batteryLevel = result.level; // (0 - 100)
        //     $scope.isPluggedIn = result.isPlugged; // bool
        // }
 
        // if (!$rootScope.batteryEvtAttached) {
        //     // prevent from registering multiple times
        //     // Ideally needs to be added in .run()
        //     // This is for the sake of example
 
        //      window.addEventListener('batterystatus', $scope.onBatteryStatus, false);
        //     $rootScope.batteryEvtAttached = true;
        // }
    });
})

.controller('CameraCtrl', function($ionicPlatform, $rootScope, $scope, $cordovaCamera) {
    $ionicPlatform.ready(function() {
       
	   
	    var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $scope.takePicture = function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgSrc = "data:image/jpeg;base64," + imageData;
            }, function(err) {
                console.log(err);
            });
        }
 
    });
})

.controller('NotificationsCtrl', function($ionicPlatform, $scope, $cordovaLocalNotification) {
    $ionicPlatform.ready(function() {
 
        $scope.notify = function() {
            $cordovaLocalNotification.add({
                id: 'welcome_notif',
                title: "Jajajaja",
                text: 'Hejsan Gurra'
            }).then(function() {
                console.log('notification fired');
            });
        };
 
 
    });
})






.controller('testCtrl', function($scope, $timeout, $cordovaBackgroundGeolocation, $ionicPlatform, $window)
{
  $scope.latgeonf = "loading lat..dd.";
  $scope.longgeonf = "loading long...";


  //-- Geolocal launch
  var options = {
    enableHighAccuracy : false,
    desiredAccuracy: 0,
    stationaryRadius: 1,
    distanceFilter: 5,
    notificationTitle: 'Background tracking', // <-- android only, customize the title of the notification
    notificationText: 'ENABLED', // <-- android only, customize the text of the notification
    activityType: 'AutomotiveNavigation',
    debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    stopOnTerminate: false // <-- enable this to clear background location settings when the app terminates
  };

  
  $ionicPlatform.ready(function()
  {
  // document.addEventListener("deviceready", function ()
  // {
    console.log("[IONIC PLATFORM IS NOW READY]");

    //-- First launch a basic geolocalisation to get user acceptance of geosharing ;)
    navigator.geolocation.getCurrentPosition(function(location) {
        console.log('[GEOLOCAL JS1] Location from Phonegap');
    },
    function (error){
        console.log('[GEOLOCAL JS1] error with GPS: error.code: ' + error.code + ' Message: ' + error.message);
    },options);

    // // `configure` calls `start` internally
    // $cordovaBackgroundGeolocation.configure(options)
    // .then(
    //   null, // Background never resolves
    //   function (err) { // error callback
    //     console.error("[GEOLOCAL JS2] Error: "+err);
    //   },
    //   function (location) { // notify callback each time it updates
    //     console.log("[GEOLOCAL JS2] Location update: "+location);
    //   });
    //   // $scope.stopBackgroundGeolocation = function () {
    //   // $cordovaBackgroundGeolocation.stop();
    //   // };


    //-- test adaptation depuis l'app jquery
    var callbackFn = function(location) {
        // console.log('[BackgroundGeoLocation] Update callback:  ' + location.latitude + ',' + location.longitude);
        console.log('[BG CALLBACK DUDE]');
    };

    var failureFn = function(error) {
        console.log('[BackgroundGeoLocation] Error: '+error);
    };

    // Only ios emits this stationary event
    // $cordovaBackgroundGeolocation.onStationary(function(location)
    // {
    //    console.log("[BackgroundGeoLocation] I think that you are not moving :)");
    // });

    // BackgroundGeoLocation is highly configurable.
    $cordovaBackgroundGeolocation.configure(callbackFn, failureFn, options);

    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    $cordovaBackgroundGeolocation.start();



    //-- Just a timeout to retreive long / lat
    $timeout(function()
    {
      navigator.geolocation.getCurrentPosition(function(location)
      {
        console.log('[GEOLOCAL JS3] Location from Phonegap');
        startPos = location;
        $scope.$apply(function () {
          $scope.latggeonf = startPos.coords.latitude;
          $scope.longgeonf = startPos.coords.longitude;
        });
        console.log("[GEOLOCAL BASIC] OK this time :), lat: "+startPos.coords.longitude);
      },
      function (error){
        console.log('[GEOLOCAL JS3] error with GPS: error.code: ' + error.code + ' Message: ' + error.message);
      },options);
    }, 4000);



  // }, false);
  });
  //-- End Geolocal
});
/*
.controller('GeoCtrl', function($ionicPlatform, $scope, $cordovaGeolocation) {
	
	 $ionicPlatform.ready(function() {
       
	    $scope.crearNota = function() {
            $cordovaGeolocation.getCurrentPosition().then(function (position) {
                          var lat  = position.coords.latitude
                          var lgt = position.coords.longitude
                          console.log('POSITIONS');
                          console.log(lat);
                          console.log(lgt);
                }, function(err) {
                          // error
                          alert(err);
                });
		
        };
		});
});

*/