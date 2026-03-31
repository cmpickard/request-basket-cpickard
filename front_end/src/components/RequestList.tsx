import type { Request }  from '../types';
import SingleRequest from './SingleRequest.tsx';

export default function RequestList({requests}: {requests: Array<Request>}) {
  return (
    <>
      {requests.length === 0 && <p>No requests...</p>}
      <div className="request-list">
        {requests.map((request) => (
          <ul className="request-list-item" key={request._id}>
            <SingleRequest request={request} />
          </ul>
        ))}
      </div>
    </>
  );
}