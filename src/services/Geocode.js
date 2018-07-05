import GoogleMapsClient from '@google/maps';

class Geocode {
    constructor() {
        this.client = GoogleMapsClient.createClient({
            key: <Your Google API Key>,
            Promise
        });
    }

    async getFirstLocation(address) {
        try {
          const { json } = await this.client.geocode({ address }).asPromise();
          const { results: locations } = json;

          if (locations.length > 0) {
              return {
                  lat: locations[0].geometry.location.lat,
                  lng: locations[0].geometry.location.lng
              }
          } else {
              return Promise.reject({
                "error": "No locations found"
              });
          }
        } catch(err) {
            const { json } = err;
            return Promise.reject(json);
        }
    }
}

export default Geocode;
