function EstadoErro({ mensagem }) {
  return (
    <div className="estado estado-erro">
      <strong>Ocorreu um erro.</strong>
      <p>{mensagem}</p>
    </div>
  );
}

export default EstadoErro;