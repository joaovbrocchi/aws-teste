import { Counter, Gauge, Histogram, Summary } from "prom-client";


export const counter = new Counter({
  name: 'request_total',
  help: 'Contador de Reequest',
});

export const gauge = new Gauge({
  name: 'request_gauge',
  help: 'metric_help',
});

export const histogram = new Histogram({
  name: 'request_histogram',
  help: 'metric_help',
  buckets: [0.1, 0.2, 0.3, 0.4, 0.5]
});
export const summary = new Summary({
  name: 'request_summary',
  help: 'metric_help',
  percentiles: [0.01, 0.1, 0.9, 0.99],
});