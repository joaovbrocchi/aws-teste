import  { useState, useEffect } from 'react';
import './index.css'; // Importando o arquivo CSS

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Função para buscar os dados da rota GET
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handlePostUsuario = async () => {
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email }),
      });
      const newUsuario = await response.json();
      setUsuarios([...usuarios, newUsuario]);
      setNome('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Adicionar Usuário</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePostUsuario();
          }}
        >
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Adicionar</button>
        </form>
      </div>

      <div className="list-container">
        <h2>Lista de Usuários</h2>
        <ul>
          {usuarios.map((usuario) => (
            <li key={usuario.id}>
              {usuario.nome} - {usuario.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
