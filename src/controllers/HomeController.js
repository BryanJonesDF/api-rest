import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: 'Ana',
        sobrenome: 'Souza',
        email: 'ana@email.com',
        idade: 20,
        peso: 60,
        altura: 1.65,
      });

      res.json(novoAluno);
    } catch (e) {
      console.log(e);
      res.status(500).json({ erro: 'Erro ao criar aluno.' });
    }
  }
}

export default new HomeController();
