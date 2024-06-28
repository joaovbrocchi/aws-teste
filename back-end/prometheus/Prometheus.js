import { Counter } from "prom-client";
export const counter = new Counter({
  name: 'request_total',
  help: 'Contador de Reequest',
});
