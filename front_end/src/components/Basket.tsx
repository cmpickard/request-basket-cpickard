import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RequestList from './RequestList.tsx';
import { getBasketRequests, clearBasket } from '../api/basketApi';
import type { Request } from '../types';

export default function Basket() {
  const [requests, setRequests] = useState<Array<Request>>([]);
  const { url } = useParams();

  function getRequests() {
    (async () => {
      try {
        setRequests(await getBasketRequests(url!));
      } catch (e: Error | unknown) {
        if (e instanceof Error) {
          console.error(e);
        }
      }
    })();
  }

  useEffect(getRequests, []);
  
  async function handleClearBasket() {
    try {
      const { deletedCount } = await clearBasket(url!);
      console.log(`Deleted ${deletedCount} responses`);
      setRequests([]);
    } catch (error: Error | unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  

  return (
    <div className="basket-container" id="basket">
      <h1 className="basket-title">Basket Name: {url}</h1>
      <div className="basket-list-wrapper">
        <RequestList requests={requests} />
      </div>
      <button onClick={handleClearBasket}
              style={{"backgroundColor": 'red'}}>
                Clear Basket
      </button>
      <Link className="back-link" to="/">Back</Link>
    </div>
  )
}