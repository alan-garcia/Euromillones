import { useState } from 'react';
import { tablaPremios, EuromillonesConfig, limiteNumerosSeleccionados, limiteEstrellasSeleccionadas } from './config/euromillonesConfig';
import logoEuromillones from '../img/logo-euromillones.png';
import './App.css'
import { Casilla } from './ui/Casilla';
import { notificacion } from './infra/notifications';

function App() {
  const numeros: number[] = Array.from({ length: EuromillonesConfig.totalNumeros }, (_, i) => i + 1);
  const estrellas: number[] = Array.from({ length: EuromillonesConfig.totalEstrellas }, (_, i) => i + 1);
  const [openJugar, setOpenJugar] = useState(false);
  const [openInstrucciones, setOpenInstrucciones] = useState(false);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [numerosSeleccionados, setNumerosSeleccionados] = useState<number[]>([]);
  const [estrellasSeleccion, setEstrellasSeleccion] = useState<number[]>([]);
  const [numerosGanadoresSeleccion, setNumerosGanadoresSeleccion] = useState<number[]>([]);
  const [estrellasGanadorasSeleccion, setEstrellasGanadorasSeleccion] = useState<number[]>([]);

  const jugar = () => setOpenJugar(!openJugar);
  const verInstrucciones = () => setOpenInstrucciones(!openInstrucciones);

  const jugarOtraVez = () => {
    setJuegoIniciado(false);

    setNumerosSeleccionados([]);
    setEstrellasSeleccion([]);
    setNumerosGanadoresSeleccion([]);
    setEstrellasGanadorasSeleccion([]);
  }

  const seleccionarNumeros = (numeroSeleccionado: number) => {
    setNumerosSeleccionados(lista => {
      if (lista.includes(numeroSeleccionado)) {
        return lista.filter(num => num !== numeroSeleccionado);
      }

      if (lista.length < EuromillonesConfig.numerosValidos) {
        return [...lista, numeroSeleccionado];
      }
      
      notificacion.warn("¡Cuidado!", `Solo puedes seleccionar ${EuromillonesConfig.numerosValidos} números. Para rectificar, haga click en un número ya seleccionado.`);

      return lista;
    });
  };

  const seleccionarEstrellas = (numeroSeleccionado: number) => {
    setEstrellasSeleccion(lista => {
      if (lista.includes(numeroSeleccionado)) {
        return lista.filter(num => num !== numeroSeleccionado);
      }

      if (lista.length < EuromillonesConfig.estrellasValidas) {
        return [...lista, numeroSeleccionado];
      }

      notificacion.warn("¡Cuidado!", `Solo puedes seleccionar ${EuromillonesConfig.estrellasValidas} estrellas. Para rectificar, haga click en una estrella ya seleccionada.`);

      return lista;
    });
  };

  const probarSuerte = () => {
    if (!limiteNumerosSeleccionados(numerosSeleccionados) || !limiteEstrellasSeleccionadas(estrellasSeleccion)) {
      notificacion.warn("¡Cuidado!", `Tienes que seleccionar obligatoriamente ${ EuromillonesConfig.numerosValidos } números y ${ EuromillonesConfig.estrellasValidas } estrellas.`);
      return;
    }

    setJuegoIniciado(true);
    generarCombinacionGanadora();
    getNumeroAciertos();
  }

  const generarCombinacionGanadora = () => {
    const numerosPosibles = getNumerosGanadores(EuromillonesConfig.totalNumeros, EuromillonesConfig.numerosValidos);
    const estrellasPosibles = getNumerosGanadores(EuromillonesConfig.totalEstrellas, EuromillonesConfig.estrellasValidas);

    setNumerosGanadoresSeleccion(numerosPosibles);
    setEstrellasGanadorasSeleccion(estrellasPosibles);
  }

  const getNumeroAciertos = (): string => {
    let numerosAcertados: number[] = [];
    let estrellasAcertadas: number[] = [];
    let acertados: string = "";

    console.log(numerosSeleccionados)
    console.log(estrellasSeleccion)
    numerosAcertados = numerosSeleccionados.filter(n => numerosGanadoresSeleccion.includes(n));
    estrellasAcertadas = estrellasSeleccion.filter(n => estrellasGanadorasSeleccion.includes(n));
    acertados = numerosAcertados.length + " + " + estrellasAcertadas.length;
    
    return acertados;
  }

  const getNumerosGanadores = (numeroMaximo: number, numeroLimite: number): number[] => {
    const numeros = Array.from({ length: numeroMaximo }, (_, i) => i + 1);

    for (let i = numeros.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }

    return numeros.slice(0, numeroLimite);
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

      <section id="euromillones-instrucciones" className={openInstrucciones ? "instrucciones" : ""}>
        <header className="acordeon">
          <article id="euromillones-instrucciones-como-jugar">
            <h2>¿Cómo se juega a Euromillones?</h2>
            <p>Cada apuesta de Euromillones consiste en <strong>seleccionar 5 números de una tabla de 50</strong> (números del 1 al 50) <strong>y dos estrellas de una tabla de 12 números</strong> (del 1 al 12).</p>
          </article>
          <article id="euromillones-instrucciones-premios">
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

            <p className="aviso">* Si aciertas 1 número, o 1 número y 1 estrella, tienes <i>nada</i>.</p>
          </article>
        </header>
      </section>

      <section id="euromillones-jugar" className={openJugar ? "jugar" : ""}>
        <header className="acordeon">
          <div className="euromillones-jugar-container">
            <h3>Números</h3>
            <Casilla items={numeros} seleccionados={numerosSeleccionados} onToggle={seleccionarNumeros} disabled={juegoIniciado} sufijoKey="num" />
          </div>
          <div className="euromillones-jugar-estrellas">
            <h3>Estrellas ⭐</h3>
            <Casilla items={estrellas} seleccionados={estrellasSeleccion} onToggle={seleccionarEstrellas} disabled={juegoIniciado} sufijoKey="est" />
          </div>
          {!juegoIniciado && (
            <div className="euromillones-jugar-suerte">
              <button className="euromillones-acciones-btn euromillones-suerte-btn" onClick={probarSuerte}>¡PROBAR SUERTE!</button>
            </div>
          )}
          <div id="euromillones-resultado-suerte" className={juegoIniciado ? "suerte" : ""}>
            { juegoIniciado && (
            <div className="acordeon">
              <div className="euromillones-resultado-numeros">
                <div>
                  <div className="euromillones-resultado-mis-numeros">
                    <div>Mis números 📝</div>
                    <span>{ numerosSeleccionados.join(" - ")} ⭐ { estrellasSeleccion.join(" - ") }</span>
                  </div>
                  <div className="euromillones-resultado-combinacion-ganadora">
                    <div>Combinación ganadora 👑</div>
                    <span>{ numerosGanadoresSeleccion.join(" - ")} ⭐ { estrellasGanadorasSeleccion.join(" - ") }</span>
                  </div>
                </div>
                
                <div className="euromillones-resultado-aciertos">
                  <span className="euromillones-resultado-aciertos">Has acertado { getNumeroAciertos() }</span>
                </div>
                <div className="euromillones-jugar-suerte">
                  <button className="euromillones-acciones-btn euromillones-reintentar-btn" onClick={jugarOtraVez}>JUGAR OTRA VEZ</button>
                </div>
              </div>
  
              <div className="euromillones-resultado-tabla-premios">
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
            </div>
          )}
          </div>
        </header>
      </section>
    </main>
  )
}

export default App
