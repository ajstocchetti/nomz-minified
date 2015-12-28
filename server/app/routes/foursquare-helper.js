var fsVenue = require('foursquarevenues')(process.env.FOURSQUARE_CLIENT_ID, process.env.FOURSQUARE_CLIENT_SECRET);
var Promise = require('bluebird');

var getVenues = function(ll) {
  let fsGetVenues = Promise.promisify(fsVenue.getVenues, { context: fsVenue }),
      fsGetVenue = Promise.promisify(fsVenue.getVenue, { context: fsVenue });
  let radius = 2000;
  let params = {
    'll': ll,
    'categoryId': '4d4b7105d754a06374d81259',
    'radius': radius
  };

  return fsGetVenues(params)
      .then((res) => {
          let venues = res.response.venues;
          let getVenuePromises = [];

          // "venues" does not contain all the data that we want.
          // therefore, for each of these venues, make another call
          // to grab the "venue details (e.g. photo's, best photo, etc)" as well
          venues.forEach((v) => {
              let venue = v;
              getVenuePromises.push(
                  fsGetVenue({
                      venue_id: venue.id
                  })
                  .then((res) => {
                      venue.details = res.response.venue;
                      return venue;
                  }));
          });
          return Promise.all(getVenuePromises)
              .then(() => {
                  return venues;
              });
      });
}

var getVenue = function(params) {
  return new Promise(function(resolve, reject) {
    fsVenue.getVenue(params, function(err, venue) {
      if(err) {
        reject(err);
      } else {
        resolve(venue);
      }
    });
  });
}

module.exports = {
  venue: getVenue,
  venues: getVenues
}
