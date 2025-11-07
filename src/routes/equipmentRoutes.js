import express from "express";
import { getAllEquipment, addEquipment } from "../controller/equipmentController.js";

const router = express.Router();

router.get("/", getAllEquipment);
router.post("/", addEquipment);

export default router;
