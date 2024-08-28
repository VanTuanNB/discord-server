import { InviteController } from '@/controllers/invite.controller';
import { Router } from 'express';

const router: Router = Router();
const inviteController = new InviteController();
router.route('/send').post(inviteController.inviteMembers.bind(inviteController));
router.route('/accept').post(inviteController.acceptTheInvitation.bind(inviteController));
export default router;
