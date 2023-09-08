import express from 'express';
import path from 'path';
import { verifyEmail } from '../controllers/userController';

const router = express.Router();
const _dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/verifiedPage.html"));
});
export default router;