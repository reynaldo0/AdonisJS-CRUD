import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Kela from "App/Models/Kela";

export default class KelasController {
  public async index({ view }: HttpContextContract) {
    const kelas = await Kela.query().where({ dihapus: 0 });
    const listKelas = kelas.map((d, idx) => {
      return { ...d.toJSON(), idx: idx + 1 };
    });
    console.log(listKelas);

    return view.render("kelas.index", { kelas: listKelas });
  }
  public async store({ request, response }: HttpContextContract) {
    const { nama, kode, guru } = request.all();
    console.log(nama, kode, guru);

    await Kela.create({
      nama,
      kode,
      namaGuru: guru,
      dihapus: 0,
    });

    return response.redirect("/kelas");
  }
  public async show({ view, params }: HttpContextContract) {
    const id = params.id;
    const kelas = await Kela.query()
      .where({ dihapus: 0 })
      .andWhere({ id })
      .firstOrFail();

    return view.render("kelas.show", { kelas });
  }
  public async update({
    request,
    response,
    params,
    session,
  }: HttpContextContract) {
    const { nama, kode, guru } = request.all();
    const id = params.id;

    await Kela.query().where({ id }).update({
      nama,
      kode,
      namaGuru: guru,
      dihapus: 0,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/kelas/${id}`);
  }

  public async delete({ response, params, session }: HttpContextContract) {
    const id = params.id;

    await Kela.query().where({ id }).update({
      dihapus: 1,
    });
    session.flash({ notifivation: "Data Berhasil Diupdate!" });

    return response.redirect(`/kelas`);
  }
}
