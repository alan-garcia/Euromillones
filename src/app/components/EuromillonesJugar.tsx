import { Casilla } from "./Casilla";

type Props = {
  open: boolean;
  numeros: number[];
  estrellas: number[];
  numerosSeleccion: number[];
  estrellasSeleccion: number[];
  seleccionarNumeros: (n: number) => void;
  seleccionarEstrellas: (n: number) => void;
  juegoIniciado: boolean;
  probarSuerte: () => void;
  jugarOtraVez: () => void;
  numerosGanadoresSeleccion: number[];
  estrellasGanadorasSeleccion: number[];
  getNumeroAciertos: () => string;
  tablaPremios: any[];
};

export const EuromillonesJugar = (props: Props) => {
  if (!props.open) return null;

  const {
    numeros,
    estrellas,
    numerosSeleccion,
    estrellasSeleccion,
    seleccionarNumeros,
    seleccionarEstrellas,
    juegoIniciado,
    probarSuerte,
    jugarOtraVez,
    numerosGanadoresSeleccion,
    estrellasGanadorasSeleccion,
    getNumeroAciertos,
    tablaPremios
  } = props;

  return (
    <section id="euromillones-jugar">
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
          <h3>Estrellas ⭐</h3>
          <div className="euromillones-jugar-numeros">
            {
              estrellas.map((estrella) => (
                <Casilla key={`est-${estrella}`} numero={estrella} isSelected={estrellasSeleccion.includes(estrella)} onClick={seleccionarEstrellas} />
              ))
            }
          </div>
        </div>
        {!juegoIniciado && (
          <div className="euromillones-jugar-suerte-container">
            <button className="euromillones-acciones-btn euromillones-suerte-btn" onClick={probarSuerte}>¡PROBAR SUERTE!</button>
          </div>
        )}
        <div className="euromillones-resultado-container">
          { juegoIniciado && (
          <>
            <div className="euromillones-resultado-numeros">
              <div>
                <div className="euromillones-resultado-mis-numeros">
                  <div>Mis números 📝</div>
                  <span>{ numerosSeleccion.join(" - ")} ⭐ {estrellasSeleccion.join(" - ") }</span>
                </div>
                <div className="euromillones-resultado-combinacion-ganadora">
                  <div>Combinación ganadora 👑</div>
                  <span>{ numerosGanadoresSeleccion.join(" - ")} ⭐ {estrellasGanadorasSeleccion.join(" - ") }</span>
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
    </section>
  );
};
