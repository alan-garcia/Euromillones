interface ICasilla {
  items: number[];
  seleccionados: number[];
  onToggle: (numero: number) => void;
  sufijoKey: string;
  disabled?: boolean;
}

export const Casilla = ({
  items,
  seleccionados,
  onToggle,
  sufijoKey,
  disabled
}: ICasilla) => {
  return (
    <div className="euromillones-jugar-numeros">
      {items.map((numero) => {
        const isSelected = seleccionados.includes(numero);

        return (
          <div key={`${sufijoKey}-${numero}`}
            className={`numero ${isSelected ? "numero-selected" : ""} ${disabled ? "numero-disabled" : ""} `}
            onClick={() => {
              if (!disabled) {
                  onToggle(numero);
              }
            }}
          >
            {numero}
          </div>
        );
      })}
    </div>
  );
};
