type Teste = {
  valor: string;
};

const Component = ({ valor }: Teste) => {
  const teste = 'test';

  return <h2>{valor} te</h2>;
};

export default function Home() {
  return <Component valor={2} />;
}
