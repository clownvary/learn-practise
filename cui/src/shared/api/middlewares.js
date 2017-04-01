import { presetRedux } from 'react-base-ui/lib/middlewares';
import syncSessionMiddleware from './syncSessionMiddleware';

const middlewares = presetRedux.concat([
  syncSessionMiddleware()
]);

export default middlewares;
