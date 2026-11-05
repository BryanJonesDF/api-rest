import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/Foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.message],
        });
      }

      if (!req.file) {
        return res.status(400).json({
          errors: ['Nenhum arquivo enviado.'],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const foto = await Foto.create({ originalname, filename, aluno_id });
        return res.json(foto);
      } catch (e) {
        const mensagem = e.name === 'SequelizeForeignKeyConstraintError'
          ? 'Aluno não existe.'
          : 'Erro ao salvar a foto.';

        return res.status(400).json({
          errors: [mensagem],
        });
      }
    });
  }
}

export default new FotoController();
