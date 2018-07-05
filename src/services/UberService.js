"use strict";
import Geocode from './Geocode';
import axios from 'axios';

class UberService {
    constructor() {
        this.geocode = new Geocode();
    }
    async getPriceEstimates(pickup, drop) {
      const [start, end] = await Promise.all([this.geocode.getFirstLocation(pickup), this.geocode.getFirstLocation(drop) ]);
      return axios.get("https://api.uber.com/v1.2/estimates/price", {
          params: {
              start_latitude: start.lat,
              start_longitude: start.lng,
              end_latitude: end.lat,
              end_longitude: end.lng
          },
          headers: {
              "Authorization": "Token <Your Uber Server Token>"
          }
      });
    }

    async getTimeEstimates(address) {
      const start = await this.geocode.getFirstLocation(address);
      return axios.get("https://api.uber.com/v1.2/estimates/time", {
          params: {
              start_latitude: start.lat,
              start_longitude: start.lng
          },
          headers: {
              "Authorization": "Token <Your Uber Server Token>"
          }
      });
    }
}
export default UberService
