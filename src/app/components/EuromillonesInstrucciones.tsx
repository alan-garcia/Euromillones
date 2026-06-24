type Props = {
  open: boolean;
};

export const EuromillonesInstrucciones = ({ open }: Props) => {
  if (!open) return null;

  return (
    <section id="euromillones-instrucciones">
      { open && (
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

            <p className="aviso">* Si aciertas 1 número, o 1 número y 1 estrella, tienes <i>nada</i>.</p>
          </div>
          </>
          )
        }
    </section>
  );
};
