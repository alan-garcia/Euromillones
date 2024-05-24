import { useState } from 'react';
import logoEuromillones from '../src/img/logo-euromillones.png';
import './App.css'

const Casilla = ({ numero, isSelected, onClick }) => {
  const className = `numero ${isSelected ? 'numero-selected' : ''}`;

  return (
    <div className={className} onClick={() => onClick(numero)}>
      {numero}
    </div>
  )
}

function App() {
  const numeros = Array.from({ length: 50 }, (v, i) => i + 1);
  const estrellas = Array.from({ length: 12 }, (v, i) => i + 1);

  const [openJugar, setOpenJugar] = useState(false);
  const [openInstrucciones, setOpenInstrucciones] = useState(false);
  const [numerosSeleccion, setNumerosSeleccion] = useState([]);
  const [estrellasSeleccion, setEstrellasSeleccion] = useState([]);

  const jugar = () => setOpenJugar(!openJugar);
  const verInstrucciones = () => setOpenInstrucciones(!openInstrucciones);

  const seleccionarNumeros = (numero) => {
    if (numerosSeleccion.length === 5) return;

    setNumerosSeleccion(prevState => {
      if (prevState.length === 5) return;
      else if (prevState.includes(numero)) {
        return prevState.filter(n => n !== numero);
      } else {
        return [...prevState, numero];
      }
    });
  };

  const seleccionarEstrellas = (numero) => {
    if (estrellasSeleccion.length === 2) return;

    setEstrellasSeleccion(prevState => {
      if (prevState.includes(numero)) {
        return prevState.filter(n => n !== numero);
      } else {
        return [...prevState, numero];
      }
    });
  };
  
  return (
    <main id="euromillones">
      <section id="euromillones-bienvenida">
        <header id="euromillones-bienvenida-container">
          <img src={logoEuromillones} alt="logo euromillones" />
          <p className='euromillones-descripcion'>Bienvenido al juego del sorteo del <strong>Euromillones</strong> de la Lotería del Estado. Pulse en cualquiera de los 2 botones de abajo para comenzar a interactuar con la aplicación.</p>
          <h2>¿Acepta el reto?</h2>
          <div className="euromillones-acciones">
            <button className="euromillones-acciones-btn euromillones-jugar-btn" onClick={jugar}>JUGAR</button>
            <button className="euromillones-acciones-btn euromillones-instrucciones-btn" onClick={verInstrucciones}>INSTRUCCIONES</button>
          </div>
        </header>
      </section>
      <section id="euromillones-instrucciones">
        { openInstrucciones && (
        <>
          <div>
            <h2>¿Cómo se juega a Euromillones?</h2>
            <p>Cada apuesta de Euromillones consiste en <strong>seleccionar 5 números de una tabla de 50</strong> (números del 1 al 50) <strong>y dos estrellas de una tabla de 12 números</strong> (del 1 al 12).</p>
          </div>
          <div id="euromillones-instrucciones-premios">
            <h2>¿Cuáles son los premios?</h2>
            <p>Los premios se distribuyen entre las siguientes categorías:</p>
            <ul>
              <li><strong>1ª Categoría:</strong> Si aciertas los 5 números y <u>las 2 estrellas</u> (5 + 2).</li>
              <li><strong>2ª Categoría:</strong> Si aciertas <u>5 números</u> y <u>1 estrella</u> (5 + 1).</li>
              <li><strong>3ª Categoría:</strong> Si aciertas <u>5 números</u> (5 + 0).</li>
              <li><strong>4ª Categoría:</strong> Si aciertas <u>4 números</u> y <u>2 estrellas</u> (4 + 2).</li>
              <li><strong>5ª Categoría:</strong> Si aciertas <u>4 números</u> y <u>1 estrella</u> (4 + 1).</li>
              <li><strong>6ª Categoría:</strong> Si aciertas <u>4 números</u> (4 + 0).</li>
              <li><strong>7ª Categoría:</strong> Si aciertas <u>3 números</u> y <u>2 estrellas</u> (3 + 2).</li>
              <li><strong>8ª Categoría:</strong> Si aciertas <u>2 números</u> y <u>2 estrellas</u> (2 + 2).</li>
              <li><strong>9ª Categoría:</strong> Si aciertas <u>3 números</u> y <u>1 estrella</u> (3 + 1).</li>
              <li><strong>10ª Categoría:</strong> Si aciertas <u>3 números</u> (3 + 0).</li>
              <li><strong>11ª Categoría:</strong> Si aciertas <u>1 número</u> y <u>2 estrellas</u> (1 + 2).</li>
              <li><strong>12ª Categoría:</strong> Si aciertas <u>2 números</u> y <u>1 estrella</u> (2 + 1).</li>
              <li><strong>13ª Categoría:</strong> Si aciertas <u>2 números</u> (2 + 0).</li>
            </ul>

            <p className="aviso">* Si aciertas 1 número, o 1 número y 1 estrella, tienes <i>null</i>.</p>
          </div>
          </>
          )
        }
      </section>
      <section id="euromillones-jugar">
        { openJugar && (
        <>
          <div className="euromillones-jugar-container">
            <h3>Números</h3>
            <div className="euromillones-jugar-numeros">
              {
                numeros.map((numero) => (
                  <Casilla key={`num-${numero}`} numero={numero} isSelected={numerosSeleccion.includes(numero)} onClick={seleccionarNumeros} />
              ))
            }
            </div>
          </div>
          <div className="euromillones-jugar-estrellas-container">
            <h3>Estrellas</h3>
            <div className="euromillones-jugar-numeros">
              {
                estrellas.map((estrella) => (
                  <Casilla key={`est-${estrella}`} numero={estrella} isSelected={estrellasSeleccion.includes(estrella)} onClick={seleccionarEstrellas} />
                ))
              }
            </div>
          </div>
          </>
          )
        }
        </section>
    </main>
  )
}

export default App
