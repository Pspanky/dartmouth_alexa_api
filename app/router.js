import { Router } from 'express';
import * as Specials from './controllers/special_controller';


const router = Router();

router.route('/specials')
  .post(Specials.createSpecial)
  .get(Specials.findSpecialsByDateAndLocation);

router.route('/test')
.get(Specials.testGet);

router.route('/collis')
.get(Specials.collisGet);

router.route('/collistoday')
.get(Specials.collisTodayGet);

export default router;
