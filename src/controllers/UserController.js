import User from '../models/User';

class UserController {
  // Cria um usuário
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : ['Erro ao criar usuário.'];
      return res.status(400).json({ errors });
    }
  }

  // Lista todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email'],
      });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // Mostra um usuário
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // Atualiza um usuário
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : ['Erro ao atualizar usuário.'];
      return res.status(400).json({ errors });
    }
  }

  // Apaga um usuário
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({
          errors: ['Usuário não existe.'],
        });
      }

      await user.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: ['Erro ao apagar usuário.'],
      });
    }
  }
}

export default new UserController();
