var jest = require('jest');


jest
  .mock('../Libraries/Core/Devtools/setupDevtools')
  .mock('npmlog');

