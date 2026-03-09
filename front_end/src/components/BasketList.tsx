import type { BasketToken } from "../types/Token";
import { Link } from "react-router-dom";

export default function BasketList({ basketTokens }: {
  basketTokens: Array<BasketToken>
}) {
  let nextKey = 0;

  return (
    <div className="basket-list">
      {basketTokens.length === 0 && <p>no baskets yet..</p>}
      <ul>
        {basketTokens.map(basketToken => {
          let basketName: string = Object.keys(basketToken)[0];
          return <li key={++nextKey}><Link to={`/baskets/${basketName}`}>{basketName}</Link></li>
        })}
      </ul>
    </div>
  );
}