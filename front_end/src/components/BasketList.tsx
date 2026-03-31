import type { BasketToken } from "../types";
import { Link } from "react-router-dom";

export default function BasketList({ basketTokens }: {
  basketTokens: Array<BasketToken>
}) {
  return (
    <>
      <h1 className="basket-list-title">Your Baskets</h1>
      <div className="basket-list">
        {basketTokens.length === 0 && <p>no baskets yet..</p>}
           <ul className="basket-list">
          {basketTokens.map(basketToken => {
            const basketName: string = Object.keys(basketToken)[0];
            return (
              <li className="basket-list-item" key={basketName}>
                <Link to={`/baskets/${basketName}`}>{basketName}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}