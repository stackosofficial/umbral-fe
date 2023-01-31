import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const auth =
  'Basic ' +
  Buffer.from(
    '2Fem68edEb9fUr9NO5dWl65uP2Q' + ':' + '0c82ba52279e78ead4cfeb8d3487b8d3'
  ).toString('base64');

export const ipfsConfig = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});
