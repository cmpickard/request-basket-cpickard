import { router } from '../server';
import { basketController } from '../controllers/basketController';

// Homepage - serve React app
// GET all user baskets
router.get('/baskets', basketController.handleGetBaskets);

// Redirect root path to `/baskets`
router.get('/', basketController.handleRedirectToBaskets);

// POST: Create a new basket.
router.post('/baskets/:endpoint', basketController.handleCreateNewBasket);

// POST: Send a requests to a specific basket.
router.all('/:endpoint', basketController.handleWebhookRequest);

// PUT: Clear a basket
router.put('/:endpoint/clear', basketController.handleClearBasket);

// $http POST localhost:3000/1234
// REST client

export default router;