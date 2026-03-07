import mongoose from 'mongoose';
const { Schema } = mongoose;

const basketSchema = new Schema({
  endpoint: String,
  payload: Object, 
});

// webhook request -> mongo -> endpoint key : [req1, req2 ...]
// postgreql -> list of endpoints


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
