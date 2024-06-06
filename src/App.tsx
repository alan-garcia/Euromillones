import { useState } from 'react';
import { Casillas, LimiteCasillasValidas, limiteNumerosSeleccionados, limiteEstrellasSeleccionadas, getNumerosGanadores, tablaPremios } from './euromillones';
import logoEuromillones from '../src/img/logo-euromillones.png';
import './App.css'

interface CasillaProps {
  numero: number;
  isSelected: boolean;
  onClick: (numero: number) => void;
}

const Casilla: React.FC<CasillaProps> = ({ numero, isSelected, onClick }) => {
  const className = `numero ${isSelected ? 'numero-selected' : ''}`;

  return (
    <div className={className} onClick={() => onClick(numero)}>
      {numero}
    </div>
  )
}

function App() {
  const numeros: number[] = Array.from({ length: Casillas.NUMEROS }, (_, i) => i + 1);
  const estrellas: number[] = Array.from({ length: Casillas.ESTRELLAS }, (_, i) => i + 1);

  const [openJugar, setOpenJugar] = useState(false);
  const [openInstrucciones, setOpenInstrucciones] = useState(false);
  const [openProbarSuerte, setOpenProbarSuerte] = useState(false);
  const [numerosSeleccion, setNumerosSeleccion] = useState<number[]>([]);
  const [estrellasSeleccion, setEstrellasSeleccion] = useState<number[]>([]);
  const [numerosGanadoresSeleccion, setNumerosGanadoresSeleccion] = useState<number[]>([]);
  const [estrellasGanadorasSeleccion, setEstrellasGanadorasSeleccion] = useState<number[]>([]);

  const jugar = () => setOpenJugar(!openJugar);
  const verInstrucciones = () => setOpenInstrucciones(!openInstrucciones);

  const jugarOtraVez = () => {
    setOpenProbarSuerte(!openProbarSuerte);

    numerosSeleccion.length = 0;
    estrellasSeleccion.length = 0;
  }

  const seleccionarNumeros = (numeroSeleccionado: number) => {
    if (limiteNumerosSeleccionados(numerosSeleccion)) return;

    setNumerosSeleccion(listaNumeros => {
      if (listaNumeros.includes(numeroSeleccionado)) {
        return listaNumeros.filter(num => num !== numeroSeleccionado);
      } else {
        return [...listaNumeros, numeroSeleccionado];
      }
    });
  };

  const seleccionarEstrellas = (numeroSelecionado: number) => {
    if (limiteEstrellasSeleccionadas(estrellasSeleccion)) return;

    setEstrellasSeleccion(listaNumeros => {
      if (listaNumeros.includes(numeroSelecionado)) {
        return listaNumeros.filter(num => num !== numeroSelecionado);
      } else {
        return [...listaNumeros, numeroSelecionado];
      }
    });
  };

  const probarSuerte = () => {
    if (limiteNumerosSeleccionados(numerosSeleccion) && limiteEstrellasSeleccionadas(estrellasSeleccion)) {
      setOpenProbarSuerte(!openProbarSuerte);
      generarCombinacionGanadora();
      getNumeroAciertos();
    }
  }

  const generarCombinacionGanadora = () => {
    const numerosPosibles = getNumerosGanadores(Casillas.NUMEROS, LimiteCasillasValidas.NUMEROS);
    const estrellasPosibles = getNumerosGanadores(Casillas.ESTRELLAS, LimiteCasillasValidas.ESTRELLAS);

    setNumerosGanadoresSeleccion(numerosPosibles);
    setEstrellasGanadorasSeleccion(estrellasPosibles);
  }

  const getNumeroAciertos = (): string => {
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
                  <span className="euromillones-resultado-aciertos">Has acertado { getNumeroAciertos() }</span>
                </div>
                <div className="euromillones-jugar-suerte-container">
                  <button className="euromillones-acciones-btn euromillones-reintentar-btn" onClick={jugarOtraVez}>JUGAR OTRA VEZ</button>
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
                        <tr key={fila.categoria} className={`${ getNumeroAciertos() === fila.aciertos ? 'acierto': '' }`}>
                          <td>{fila.categoria}</td>
                          <td>{fila.aciertos}</td>
                          <td className="importe">{fila.importe}</td>
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
