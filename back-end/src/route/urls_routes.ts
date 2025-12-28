import { Router } from "express";
import * as URLS from "../controller/urls_controller";

const router = Router();

router.get("/urls", URLS.getURLS);

export default router;
