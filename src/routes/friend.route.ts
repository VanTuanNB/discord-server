import FriendController from '@/controllers/friend.controller';
import { Router } from 'express';

const router: Router = Router();
const friendController = new FriendController();
router.route('/request').post(friendController.postInvitationFriend.bind(friendController));

router.route('/accept').post(friendController.postAcceptationFriend.bind(friendController));

export default router;
