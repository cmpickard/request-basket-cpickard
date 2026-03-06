import mongoose from 'mongoose';
const { Schema } = mongoose;

const basketSchema = new Schema({
  endpoint: String,
  payload: Object, 
});

export const basketModel = {
  getBasketRequests(endpoint: string) {
    // Return as JSON
    // logic
  },

  getExistingBaskets() {
    // logic
  },

  addEndpoint(endpoint) {
    //
  },
  
  basketExists(endpoint) {

    // logic
  },
  
  addWebhookRequest(endpoint, payload) {
    // logic
  },

  clearBasket(endpoint) {
    // logic

  },

}
