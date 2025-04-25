import { getEmpresaInfoSvc, updateEmpresaInfoSvc } from "../../services/empresa/empresa.services";
import MyError from "../../utils/error";


export const getEmpresaInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await getEmpresaInfoSvc({ id })
    return res.json({
      status: "ok",
      message: "Empresa obtenida exitosamente",
      data: response
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}

export const updateEmpresaInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const { ruc, razonSocial, imagen, dueno, agenteRetencion, iva, telefono, codigoTelf, direccion, ciudad } = req.body
    const response = await updateEmpresaInfoSvc({ id, ruc, razonSocial, imagen, dueno, agenteRetencion, iva, telefono, codigoTelf, direccion, ciudad })
    return res.json({
      status: "ok",
      message: "Empresa actualizada exitosamente",
      data: response
    })
  } catch (error) {
    if (!error?.serverMessage) {
      next(new MyError(error.message, ('Error interno'), 500, true));
      return;
    }
    next(new MyError(error?.message, (error?.serverMessage), error?.statusCode, error?.display));
  }
}