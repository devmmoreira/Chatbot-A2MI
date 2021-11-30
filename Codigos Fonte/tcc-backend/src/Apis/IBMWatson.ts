import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'
import { AssistantConfig } from '../Config/WatsonConfig'

export default new AssistantV2({
  version: AssistantConfig.version,
  authenticator: new IamAuthenticator({
    apikey: AssistantConfig.apikey,
  }),
  serviceUrl: AssistantConfig.serviceUrl,
  headers: AssistantConfig.headers
})