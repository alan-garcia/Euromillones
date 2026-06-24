import { useState } from 'react';
import { Casillas, LimiteCasillasValidas, limiteNumerosSeleccionados, limiteEstrellasSeleccionadas, tablaPremios, mostrarMensajeAlerta } from '../euromillones';
import logoEuromillones from '../img/logo-euromillones.png';
import './App.css'
import { EuromillonesInstrucciones } from './components/EuromillonesInstrucciones';
import { EuromillonesJugar } from './components/EuromillonesJugar';

function App() {
  const numeros: number[] = Array.from({ length: Casillas.NUMEROS }, (_, i) => i + 1);
  const estrellas: number[] = Array.from({ length: Casillas.ESTRELLAS }, (_, i) => i + 1);

  const [openJugar, setOpenJugar] = useState(false);
  const [openInstrucciones, setOpenInstrucciones] = useState(false);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [numerosSeleccion, setNumerosSeleccion] = useState<number[]>([]);
  const [estrellasSeleccion, setEstrellasSeleccion] = useState<number[]>([]);
  const [numerosGanadoresSeleccion, setNumerosGanadoresSeleccion] = useState<number[]>([]);
  const [estrellasGanadorasSeleccion, setEstrellasGanadorasSeleccion] = useState<number[]>([]);

  const jugar = () => setOpenJugar(!openJugar);
  const verInstrucciones = () => setOpenInstrucciones(!openInstrucciones);

  const jugarOtraVez = () => {
    setJuegoIniciado(false);

    setNumerosSeleccion([]);
    setEstrellasSeleccion([]);
    setNumerosGanadoresSeleccion([]);
    setEstrellasGanadorasSeleccion([]);
  }

  const seleccionarNumeros = (numeroSeleccionado: number) => {
    setNumerosSeleccion(lista => {
      if (lista.includes(numeroSeleccionado)) {
        return lista.filter(num => num !== numeroSeleccionado);
      }

      if (lista.length < LimiteCasillasValidas.NUMEROS) {
        return [...lista, numeroSeleccionado];
      }
      
      mostrarMensajeAlerta("¡Cuidado!", `Solo puedes seleccionar ${LimiteCasillasValidas.NUMEROS} números. Para rectificar, haga click en un número ya seleccionado.`);

      return lista;
    });
  };

  const seleccionarEstrellas = (numeroSeleccionado: number) => {
    setEstrellasSeleccion(lista => {
      if (lista.includes(numeroSeleccionado)) {
        return lista.filter(num => num !== numeroSeleccionado);
      }

      if (lista.length < LimiteCasillasValidas.ESTRELLAS) {
        return [...lista, numeroSeleccionado];
      }

      mostrarMensajeAlerta("¡Cuidado!", `Solo puedes seleccionar ${LimiteCasillasValidas.ESTRELLAS} estrellas. Para rectificar, haga click en una estrella ya seleccionada.`);

      return lista;
    });
  };

  const probarSuerte = () => {
    if (limiteNumerosSeleccionados(numerosSeleccion) && limiteEstrellasSeleccionadas(estrellasSeleccion)) {
      setJuegoIniciado(true);
      generarCombinacionGanadora();
      getNumeroAciertos();
    }
    else {
      mostrarMensajeAlerta("¡Cuidado!", `Tienes que seleccionar obligatoriamente ${ LimiteCasillasValidas.NUMEROS } números y ${ LimiteCasillasValidas.ESTRELLAS } estrellas.`);
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

  const getNumerosGanadores = (numeroMaximo: number, numeroLimite: number) => {
      const numerosPosibles = [];
  
      for (let i = 1; i <= numeroMaximo; i++) {
        numerosPosibles.push(i);
      }
  
      for (let i = numerosPosibles.length - 1; i > 0; i--) {
        const numero: number = Math.floor(Math.random() * (i + 1));
        [numerosPosibles[i], numerosPosibles[numero]] = [numerosPosibles[numero], numerosPosibles[i]];
      }
  
      return numerosPosibles.slice(0, numeroLimite);
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

      <EuromillonesInstrucciones open={openInstrucciones} />
    
      <EuromillonesJugar
        open={openJugar}
        numeros={numeros}
        estrellas={estrellas}
        numerosSeleccion={numerosSeleccion}
        estrellasSeleccion={estrellasSeleccion}
        seleccionarNumeros={seleccionarNumeros}
        seleccionarEstrellas={seleccionarEstrellas}
        juegoIniciado={juegoIniciado}
        probarSuerte={probarSuerte}
        jugarOtraVez={jugarOtraVez}
        numerosGanadoresSeleccion={numerosGanadoresSeleccion}
        estrellasGanadorasSeleccion={estrellasGanadorasSeleccion}
        getNumeroAciertos={getNumeroAciertos}
        tablaPremios={tablaPremios}
      />
    </main>
  )
}

export default App
