import { Middlewares } from 'react-base-ui';
import syncSessionMiddleware from 'shared/middlewares/syncSessionMiddleware';
import '../../json/mockup';

const middlewares = Middlewares.presetRedux.concat([
  syncSessionMiddleware()
]);

export default middlewares;
