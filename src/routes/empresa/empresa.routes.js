import { Router } from "express";
import { getEmpresaInfo, updateEmpresaInfo } from "../../controllers/empresa/empresa.controller.js";
import { verifyBearerToken } from "../../middleware/auth.middleware.js";

const routerEmpresa = Router()

routerEmpresa.get("/getInfoEmpresa", verifyBearerToken, getEmpresaInfo)
routerEmpresa.put("/updateInfoEmpresa/:id", verifyBearerToken, updateEmpresaInfo)

export default routerEmpresa