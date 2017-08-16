import { Router } from 'express';
import * as Mails from './controllers/email_controller';


const router = Router();

router.route('/')
  .post(Mails.sendEmail);

router.route('/candidates')
  .post(Mails.sendCandidateEmail);

export default router;
