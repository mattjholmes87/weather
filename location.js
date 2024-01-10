//Current location retrieval function

export function getLocation() {
  return new Promise((resolve, reject) => {
    const locationOptions = {
      enableHighAccuracy: true, //Enables GPS
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      successLoc,
      errorLoc,
      locationOptions
    );

    function successLoc(locationData) {
      resolve(locationData);
    }

    function errorLoc(err) {
      reject(err);
    }
  });
}
