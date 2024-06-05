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
  const numeros: number[] = Array.from({ length: 50 }, (_, i) => i + 1);
  const estrellas: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

  const [openJugar, setOpenJugar] = useState(false);
  const [openInstrucciones, setOpenInstrucciones] = useState(false);
  const [openProbarSuerte, setOpenProbarSuerte] = useState(false);
  const [numerosSeleccion, setNumerosSeleccion] = useState([]);
  const [estrellasSeleccion, setEstrellasSeleccion] = useState([]);
  let [numerosGanadoresSeleccion, setNumerosGanadoresSeleccion] = useState<number[]>([]);
  let [estrellasGanadorasSeleccion, setEstrellasGanadorasSeleccion] = useState<number[]>([]);

  const jugar = () => setOpenJugar(!openJugar);
  const verInstrucciones = () => setOpenInstrucciones(!openInstrucciones);

  const seleccionarNumeros = (numero: number) => {
    if (numerosSeleccion.length === 5) return;

    setNumerosSeleccion(prevState => {
      if (prevState.includes(numero)) {
        return prevState.filter(n => n !== numero);
      } else {
        return [...prevState, numero];
      }
    });
  };

  const seleccionarEstrellas = (numero: number) => {
    if (estrellasSeleccion.length === 2) return;

    setEstrellasSeleccion(prevState => {
      if (prevState.includes(numero)) {
        return prevState.filter(n => n !== numero);
      } else {
        return [...prevState, numero];
      }
    });
  };

  const probarSuerte = () => {
    setOpenProbarSuerte(!openProbarSuerte);
    generarCombinacionGanadora();
  }

  const generarCombinacionGanadora = () => {
    const numerosPosibles = [];
    for (let i = 1; i <= 50; i++) {
      numerosPosibles.push(i);
    }

    for (let i = numerosPosibles.length - 1; i > 0; i--) {
      const numero: number = Math.floor(Math.random() * (i + 1));
      [numerosPosibles[i], numerosPosibles[numero]] = [numerosPosibles[numero], numerosPosibles[i]];
    }

    numerosGanadoresSeleccion = numerosPosibles.slice(0, 5);
    setNumerosGanadoresSeleccion(numerosGanadoresSeleccion);
    console.log(numerosPosibles);

    const estrellasPosibles = [];
    for (let i = 1; i <= 12; i++) {
      estrellasPosibles.push(i);
    }

    for (let i = estrellasPosibles.length - 1; i > 0; i--) {
      const estrella: number = Math.floor(Math.random() * (i + 1));
      [estrellasGanadorasSeleccion[i], estrellasGanadorasSeleccion[estrella]] = [estrellasGanadorasSeleccion[estrella], estrellasGanadorasSeleccion[i]];
    }
    
    estrellasGanadorasSeleccion = estrellasPosibles.slice(0, 2);
    setEstrellasGanadorasSeleccion(estrellasGanadorasSeleccion);
    console.log(estrellasGanadorasSeleccion);
  }
  
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
          <div className="euromillones-jugar-suerte-container">
            <button className="euromillones-acciones-btn euromillones-suerte-btn" onClick={probarSuerte}>¡PROBAR SUERTE!</button>
          </div>
          <div className="euromillones-resultado-container">
            { openProbarSuerte && (
            <>
              <div className="euromillones-resultado-numeros">
                <div className="euromillones-resultado-mis-numeros">
                  <div>Mis numeros: {numerosSeleccion.map(item => item + " ")} | {estrellasSeleccion.map(item => item + " ")}</div>
                </div>
                <div className="euromillones-resultado-combinacion-ganadora">
                  <div>Combinación ganadora: {numerosGanadoresSeleccion.map(item => item + " ")} | {estrellasGanadorasSeleccion.map(item => item + " ")}</div>
                </div>
                <div className="euromillones-resultado-aciertos">

                </div>
                <button className="euromillones-acciones-btn euromillones-reintentar-btn">JUGAR OTRA</button>
              </div>

              <div className="euromillones-resultado-tabla-premios-container">
                <h3>Tabla de premios</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Aciertos (Números + Estrellas)</th>
                      <th>Importe del premio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>5 + 2</td>
                      <td className="importe">To the moon 🚀</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>5 + 1</td>
                      <td className="importe">461.186,22 €</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>5 + 0</td>
                      <td className="importe">21.557,46 €</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>4 + 2</td>
                      <td className="importe">1.017,37 €</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>4 + 1</td>
                      <td className="importe">138,36 €</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>4 + 0</td>
                      <td className="importe">51,72 €</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>3 + 2</td>
                      <td className="importe">49,99 €</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>2 + 2</td>
                      <td className="importe">11,35 €</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>3 + 1</td>
                      <td className="importe">11,15 €</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>3 + 0</td>
                      <td className="importe">10,38 €</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>1 + 2</td>
                      <td className="importe">5,27 €</td>
                    </tr>
                    <tr>
                      <td>12</td>
                      <td>2 + 1</td>
                      <td className="importe">5,03 €</td>
                    </tr>
                    <tr>
                      <td>13</td>
                      <td>2 + 0</td>
                      <td className="importe">4,14 €</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
          </div>
        </>
        )}
      </section>
    </main>
  )
}

export default App
