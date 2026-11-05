import multer from 'multer';
import multerConfig from '../config/multerConfig';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, (error) => {
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

      return res.json(req.file);
    });
  }
}

export default new FotoController();
