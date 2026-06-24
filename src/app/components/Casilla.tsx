interface CasillaProps {
  numero: number;
  isSelected: boolean;
  onClick: (numero: number) => void;
}

export const Casilla = ({ numero, isSelected, onClick }: CasillaProps) => {
  const className = `numero ${isSelected ? 'numero-selected' : ''}`;

  return (
    <div className={className} onClick={() => onClick(numero)}>
      {numero}
    </div>
  );
};
