import { Application } from 'express';

import { appPromise } from './index';
import { envConfig } from './config';

appPromise.then((app: Application) => {
  app.listen(envConfig.PORT, () => {
    console.log(`Server listened on port ${envConfig.PORT}`);
  });
});
