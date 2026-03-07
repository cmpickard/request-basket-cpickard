import { router } from '../server';
import { basketController } from '../controllers/basketController';

router.ws('/baskets/:endpoint', basketController.handleGetBasketRequests);