import { PrismaClient } from "@prisma/client";
import MyError from "../../utils/error";
import prisma from "../../config/prisma";


export const getEmpresaInfoSvc = async ({ id }) => {

  try {

    const empresaInfo = await prisma.empresas.findUnique({
      where: {
        id_emp: parseInt(id)
      }
    })

    if (!empresaInfo) {
      throw new MyError('La empresa no existe', 400)
    }

    const empresa = {
      id: empresaInfo.id_emp,
      nombre: empresaInfo.nom_emp,
      ruc: empresaInfo.ruc_emp,
      direccion: empresaInfo.dir_emp,
      ciudad: empresaInfo.ciu_emp,
      telefono: empresaInfo.telf_emp,
      codigoTelf: empresaInfo.telf_code_emp,
    }
    return empresa
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}

export const updateEmpresaInfoSvc = async ({
  id,
  ruc,
  razonSocial,
  imagen,
  dueno,
  agenteRetencion,
  iva,
  telefono,
  codigoTelf,
  direccion,
  ciudad
}) => {

  try {
    const existEmpresa = await prisma.empresas.findUnique({
      where: {
        id_emp: parseInt(id)
      }
    })

    if (!existEmpresa) {
      throw new MyError('La empresa no existe', 400)
    }

    const dataEmpresa = await prisma.empresas.update({
      where: {
        id_emp: parseInt(id)
      },
      data: {
        ruc_emp: ruc,
        nom_emp: razonSocial,
        img_emp: imagen,
        dueno_emp: dueno,
        agente_retencion_emp: agenteRetencion,
        iva_emp: iva,
        telf_emp: telefono,
        telf_code_emp: codigoTelf,
        dir_emp: direccion,
        ciu_emp: ciudad
      }
    })

    return dataEmpresa
  } catch (error) {
    throw new MyError(error.message, error.status);
  } finally {
    prisma.$disconnect()
  }
}