import type { BasketUrls } from "../types/BasketUrls";
import { Link } from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function Modal({urls, setVisibleModal}:
  { urls: BasketUrls,
    setVisibleModal: (value: React.SetStateAction<boolean>) => void
  }) {

  const basketName = urls.sendToBasket.split('/').slice(-1)[0];
  const copyURL = `http://3.239.38.255/api/${basketName}`;
  return (
    <div id="overlay"
         onClick={() => setVisibleModal(false)}>
      <main id="modal"
            onClick={e => e.stopPropagation()}>
        <p>Congratulations! Your basket has been created.</p>
        <ul>
          <li>To look at the contents of your basket, visit
            <Link to={`/baskets/${basketName}`}> {urls.viewBasket}
            </Link>
          </li>
          <li>To send an HTTP request to your basket, use
            <CopyToClipboard text={copyURL}>
              <button>Copy URL</button>
            </CopyToClipboard>
          </li>
        </ul>
      </main>
    </div>
  );
}