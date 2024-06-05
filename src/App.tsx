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

  const tablaPremios = [
    { col1: '1', col2: '5 + 2', col3: 'To the moon 🚀' },
    { col1: '2', col2: '5 + 1', col3: '461.186,22 €' },
    { col1: '3', col2: '5 + 0', col3: '21.557,46 €' },
    { col1: '4', col2: '4 + 2', col3: '1.017,37 €' },
    { col1: '5', col2: '4 + 1', col3: '138,36 €' },
    { col1: '6', col2: '4 + 0', col3: '51,72 €' },
    { col1: '7', col2: '3 + 2', col3: '49,99 €' },
    { col1: '8', col2: '2 + 2', col3: '11,35 €' },
    { col1: '9', col2: '3 + 1', col3: '11,15 €' },
    { col1: '10', col2: '3 + 0', col3: '10,38 €' },
    { col1: '11', col2: '1 + 2', col3: '5,27 €' },
    { col1: '12', col2: '2 + 1', col3: '5,03 €' },
    { col1: '13', col2: '2 + 0', col3: '4,14 €' },
  ];

  const [openJugar, setOpenJugar] = useState(false);
  const [openInstrucciones, setOpenInstrucciones] = useState(false);
  const [openProbarSuerte, setOpenProbarSuerte] = useState(false);
  const [numerosSeleccion, setNumerosSeleccion] = useState([]);
  const [estrellasSeleccion, setEstrellasSeleccion] = useState([]);
  let [numerosGanadoresSeleccion, setNumerosGanadoresSeleccion] = useState<number[]>([]);
  let [estrellasGanadorasSeleccion, setEstrellasGanadorasSeleccion] = useState<number[]>([]);

  const jugar = () => setOpenJugar(!openJugar);

  const jugarOtra = () => {
    setOpenProbarSuerte(!openProbarSuerte);

    numerosSeleccion.length = 0;
    estrellasSeleccion.length = 0;
  }

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
    if (numerosSeleccion.length === 5 && estrellasSeleccion.length === 2) {
      setOpenProbarSuerte(!openProbarSuerte);
      generarCombinacionGanadora();
      aciertos();
    }
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

    const estrellasPosibles = [];
    for (let j = 1; j <= 12; j++) {
      estrellasPosibles.push(j);
    }

    for (let j = estrellasPosibles.length - 1; j > 0; j--) {
      const estrella: number = Math.floor(Math.random() * (j + 1));
      [estrellasPosibles[j], estrellasPosibles[estrella]] = [estrellasPosibles[estrella], estrellasPosibles[j]];
    }
    
    estrellasGanadorasSeleccion = estrellasPosibles.slice(0, 2);
    setEstrellasGanadorasSeleccion(estrellasGanadorasSeleccion);
  }

  const aciertos = (): string => {
    let numerosAcertados: number[] = [];
    let estrellasAcertadas: number[] = [];
    let acertados: string = "";

    numerosAcertados = numerosSeleccion.filter(n => numerosGanadoresSeleccion.includes(n));
    estrellasAcertadas = estrellasSeleccion.filter(n => estrellasGanadorasSeleccion.includes(n));
    acertados = numerosAcertados.length + " + " + estrellasAcertadas.length;
    
    return acertados;
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
            <button className="euromillones-acciones-btn euromillones-suerte-btn" onClick={probarSuerte} disabled={openProbarSuerte}>¡PROBAR SUERTE!</button>
          </div>
          <div className="euromillones-resultado-container">
            { openProbarSuerte && (
            <>
              <div className="euromillones-resultado-numeros">
                <div>
                  <div className="euromillones-resultado-mis-numeros">
                    <div>Mis números</div>
                    <span>{numerosSeleccion.map(item => item + " ")} + {estrellasSeleccion.map(item => item + " ")}</span>
                  </div>
                  <div className="euromillones-resultado-combinacion-ganadora">
                    <div>Combinación ganadora</div>
                    <span>{numerosGanadoresSeleccion.map(item => item + " ")} + {estrellasGanadorasSeleccion.map(item => item + " ")}</span>
                  </div>
                </div>
                <div className="euromillones-resultado-aciertos-container">
                  <span className="euromillones-resultado-aciertos">Has acertado { aciertos() }</span>
                </div>
                <div className="euromillones-jugar-suerte-container">
                  <button className="euromillones-acciones-btn euromillones-reintentar-btn" onClick={jugarOtra}>JUGAR OTRA VEZ</button>
                </div>
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
                    {
                      tablaPremios.map((fila) => (
                        <tr key={fila.col1} className={`${ aciertos() === fila.col2 ? 'acierto': '' }`}>
                          <td>{fila.col1}</td>
                          <td>{fila.col2}</td>
                          <td className="importe">{fila.col3}</td>
                        </tr>
                      ))
                    }
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
