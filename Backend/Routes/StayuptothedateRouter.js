// just_home/Backend/Routes/StayuptothedateRouter.js

import express from 'express'

import { getAllEntries, addEntry} from '../Controller/StayuptothedateController.js'

const StayUpToDateRouter = express.Router();

StayUpToDateRouter.get('/',getAllEntries);
StayUpToDateRouter.post('/',addEntry);

export default  StayUpToDateRouter;
