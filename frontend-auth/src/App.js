import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8085/auth/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Usuario creado: ${data.username}`);
        setUsername('');
        setPassword('');
      } else {
        setMensaje('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setMensaje('Error en la conexión con el backend. Verifica que esté corriendo en puerto 8085');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8085/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Login exitoso! Token: ${data.token ? 'Recibido' : 'Error'}`);
        setUsername('');
        setPassword('');
      } else {
        setMensaje('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setMensaje('Error en la conexión con el backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h2>Conexión Backend - Frontend</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setMensaje('')}>Limpiar mensajes</button>
      </div>

      <form onSubmit={handleRegister}>
        <h3>Registro de Usuario</h3>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <hr />

      <form onSubmit={handleLogin}>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? 'Iniciando sesión...' : 'Login'}
        </button>
      </form>

      {mensaje && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: mensaje.includes('Error') ? '#ffebee' : '#e8f5e8',
          border: '1px solid ' + (mensaje.includes('Error') ? '#f44336' : '#4caf50'),
          borderRadius: '4px'
        }}>
          {mensaje}
        </div>
      )}

      <div style={{ marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <p>🔗 Backend URL: http://localhost:8085</p>
        <p>🌐 Frontend URL: http://localhost:3000</p>
        <p>📝 Endpoints: /auth/create, /auth/login, /auth/validate</p>
      </div>
    </div>
  );
}

export default App;