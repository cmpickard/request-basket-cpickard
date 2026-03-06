import type { Request, Response } from 'express';
import { basketModel } from '../models/basketModel';

export const basketController = {
  handleGetBaskets(req: Request, res: Response) {
    // Serve React app.
    res.send("Hello world");
  },
  
  handleRedirectToBaskets(req: Request, res: Response) {
    res.redirect("/baskets");
  },

  handleGetBasketRequests(req: Request, res: Response) {
    const { endpoint } = req.params;
    const requests = basketModel.getBasketRequests(endpoint);
    // requests is json.
    res.send(requests);
  },

  handleCreateNewBasket(req: Request, res: Response) {
    const { endpoint } = req.params;

    // concurrent request to same endpoint by different user?
    if (basketModel.basketExists(endpoint)) {
      res.status(409).json({ message: "Endpoint name is invalid."});
    } else {
      basketModel.addEndpoint(endpoint);
      res.status(200).json({ message: "endpoint is available"});
    }
  },

  handleWebhookRequest(req: Request, res: Response) {
    const { endpoint } = req.params;
    const { method, headers, body } = req;
    const timestamp = new Date();
    const json = {
      method: method,
      headers: headers,
      body: body,
      timestamp: timestamp,
    }
    
    basketModel.addWebhookRequest(endpoint, json);
    res.status(200);
  },

  handleClearBasket(req: Request, res: Response) {
    const { endpoint } = req.params;
    
    if (basketModel.basketExists(endpoint)) {
      basketModel.clearBasket(endpoint);
      res.status(200);
    } else {
      res.status(400).send({ message: "Basket doesn't exist!"});
    }
  },
}
