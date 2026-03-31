import { useState } from 'react';
import Modal from  "./Modal"
import { createBasketName, isValidBasketName, getBasketsFromStorage } from "../utils/basketUtilities";
import { createBasket } from "../api/basketApi";
import type { BasketUrls, BasketToken } from "../types";
import BasketList from './BasketList';

function BasketNameError({error}: {error: string}) {
  return (
    <div id="basket-name-error">{error}</div>
  );
}

export default function Home() {
  const [basketName, setBasketName] = useState(createBasketName());
  const [visibleModal, setVisibleModal] = useState(false);
  const [error, setError] = useState('');
  const [urls, setUrls] = useState<BasketUrls>({viewBasket: '', sendToBasket: ''});
  const [basketTokens, setBasketTokens] = useState<Array<BasketToken>>(getBasketsFromStorage());

  async function handleCreateBasket(e: React.SyntheticEvent) {
    e.preventDefault();
    setError('');
    
    if (!isValidBasketName(basketName)) {
      setError('Basket name must be 8-25 chars, and can only include letters and numbers');
      
      return;
    }

    try {
      const token: BasketToken = await createBasket(basketName);
      localStorage.setItem(Object.keys(token)[0], Object.values(token)[0]);
      const urls: BasketUrls = {
        viewBasket: `/api/baskets/${basketName}`,
        sendToBasket: `/${basketName}`,
      };
      setUrls(urls);
      setVisibleModal(true);
      setBasketTokens(getBasketsFromStorage());
    } catch (e: Error | unknown) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }
  
  return (
    <>
      {visibleModal && <Modal urls={urls}
                              setVisibleModal={setVisibleModal}/>}
      {error && <BasketNameError error={error}/>}     
      <form onSubmit={handleCreateBasket}>
        Basket Name:<input type="text"
          value={basketName}
          onChange={(e) => setBasketName(e.target.value)}></input>
        <button type="submit">Create Basket</button>
      </form>
      <BasketList basketTokens={basketTokens}/>
    </>
  )
}