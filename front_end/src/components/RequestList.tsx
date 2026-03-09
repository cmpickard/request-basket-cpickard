import type { Request } from '../types/Request.ts';

export default function RequestList({requests}: {requests: Array<Request>}) {
  let nextKey = 0;
  return (
    <div className="request-list">
      {requests.map((request) => (
        <ul className="request-list-item" key={nextKey++}>
          <li className="request-method" key={nextKey++}>Method: {request.method}</li>
          <li className="request-timestamp" key={nextKey++}>Timestamp: {request.timestamp}</li>
          <li className="request-body" key={nextKey++}>Body:<br/>
            {typeof request.body !== 'string' ? JSON.stringify(request.body) : request.body}
          </li>
          <li className="request-headers" key={nextKey++}>Headers:<br/>
            {JSON.stringify(request.headers)}
          </li>
        </ul>
      ))}
    </div>
  );
}

/*

const DUMMY_REQUESTS

*/