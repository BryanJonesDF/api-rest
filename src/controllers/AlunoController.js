import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

const opcoesDeBusca = {
  attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
  order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
  include: {
    model: Foto,
    attributes: ['url', 'filename'],
  },
};

class AlunoController {
  // Lista todos os alunos, com as fotos
  async index(req, res) {
    const alunos = await Aluno.findAll(opcoesDeBusca);
    return res.json(alunos);
  }

  // Cria um aluno
  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : ['Erro ao criar aluno.'];
      return res.status(400).json({ errors });
    }
  }

  // Mostra um aluno, com as fotos
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const aluno = await Aluno.findByPk(id, opcoesDeBusca);

      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe.'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: ['Erro ao buscar aluno.'],
      });
    }
  }

  // Atualiza um aluno
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe.'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);
      return res.json(alunoAtualizado);
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : ['Erro ao atualizar aluno.'];
      return res.status(400).json({ errors });
    }
  }

  // Apaga um aluno
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID.'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ['Aluno não existe.'],
        });
      }

      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: ['Erro ao apagar aluno.'],
      });
    }
  }
}

export default new AlunoController();
