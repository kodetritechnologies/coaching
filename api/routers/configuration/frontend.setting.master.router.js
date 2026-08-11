import express from "express";
const router = express.Router();
import { getBrandsFrontend } from "../../controllers/configuration/master/brands.controller.js";
import { getFooterSettingByType } from "../../controllers/configuration/setting/footer.controller.js";
import { getRegionsPublicByType } from "../../controllers/configuration/master/regions.controller.js";
import { getCategoryByType } from "../../controllers/configuration/master/categories.controller.js";
import { getTagesByType } from "../../controllers/configuration/master/tages.controller.js";
import { getCurrenciesPublic } from "../../controllers/configuration/setting/currency.controller.js";

router.get("/brands/all", getBrandsFrontend);
router.get("/footerSetting/:type", getFooterSettingByType);
router.get("/regions/:type", getRegionsPublicByType);
router.get("/categories/:type", getCategoryByType);
router.get("/tages/:type", getTagesByType);
router.get("/currencies", getCurrenciesPublic);

export default router;
