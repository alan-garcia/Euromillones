import logoEuromillones from '../src/img/logo-euromillones.png';
import './App.css'

function App() {
  return (
    <main id="euromillones">
      <section id="euromillones-bienvenida">
        <header id="euromillones-bienvenida-container">
          <img src={logoEuromillones} alt="logo euromillones" />
          <p className='euromillones-descripcion'>Bienvenido al juego del sorteo del <strong>Euromillones</strong> de la Lotería del Estado. Pulse en cualquiera de los 2 botones de abajo para comenzar a interactuar con la aplicación.</p>
          <h2>¿Acepta el reto?</h2>
          <div className="euromillones-acciones">
            <button className="euromillones-acciones-btn euromillones-jugar-btn">JUGAR</button>
            <button className="euromillones-acciones-btn euromillones-instrucciones-btn">INSTRUCCIONES</button>
          </div>
        </header>
      </section>
    </main>
  )
}

export default App
