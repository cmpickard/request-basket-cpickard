import type { HeadersType } from '../types';

export function Headers({ headers }: { headers: HeadersType }) {
  return (
    <code>{Object.entries(headers).map(([ key, value ]) => {
      return <div key={key}>{key + ': ' + value}</div>
    })}
    </code>
  );
};