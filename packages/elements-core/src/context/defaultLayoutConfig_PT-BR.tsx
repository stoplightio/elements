import { LayoutConfig } from '../types';

export const defaultLayoutConfig: LayoutConfig = {
  api: {
    descriptionUrlErrorTitle: 'Documento não pôde ser carregado',
    descriptionUrlError:
      'O documento de descrição do API não pôde ser obtido. Isto poderia indicar problemas de conectividade, ou problemas com o servidor que aloja o arquivo.',
  },
  apiTree: {
    overview: 'Sobre',
    endpoints: 'Rotas',
    schemas: 'Esquemas',
  },
  serverInfo: {
    title: 'URL Base do API',
  },
  securitySchemes: {
    title: 'Segurança',
  },
  additionalInfo: {
    title: 'Informações Adicionais',
    contact: 'Contato',
    license: 'Licença',
    termsOfService: 'Termos de Serviço',
  },
  operationParameters: {
    title: 'Parâmetros',
  },
  tryIt: {
    sendApiRequest: 'Enviar solicitação ao API',
    authTitle: 'Autenticação',
    formDataBodyTitle: 'Corpo',
  },
  requestSamples: {
    title: 'Exemplo de Solicitação',
  },
  responseExamples: {
    title: 'Exemplos de Resposta',
  },
  request: {
    header: 'Solicitação',
    queryParameters: 'Parâmetros de Consulta',
    cookiesParameters: 'Cookies',
    headerParameters: 'Headers',
    pathParameters: 'Parâmetros da Rota',
    bodyHeader: 'Corpo',
  },
  responses: {
    header: 'Respostas',
    bodyHeader: 'Corpo',
  },
  badges: {
    deprecated: 'Depreciada',
    deprecatedTip:
      'Esta operação foi marcada como depreciada, o que significa que poderá ser removida em algum momento no futuro.',
    internalTip: isHttpService =>
      ` ${
        isHttpService ? 'Esta operação' : 'Este modelo'
      } é marcado como interno e não será visível em documentos públicos.`,
  },
  modelExamples: {
    title: 'Exemplo',
  },
};
