import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  //Essa função é parecida com o catch
  static getDerivedStateFromError(error) {
    // Atualiza o state para que a próxima renderização mostre a UI alternativa
    return { 
      hasError: true,
      errorMessage: error.message
    };
  }

  componentDidCatch(error, info) {
    //Você tambem pode registrar o erro em um serviço de relatórios de erro
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    // logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Voce pode renderizar qualquer UI alternativa
      return <p>Houve um erro: {this.state.errorMessage}</p>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;