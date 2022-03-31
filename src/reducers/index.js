import { combineReducers } from "redux";
import { MetricsReducer, MetricInfosReducer } from "../features/Metrics";

const rootReducer = combineReducers({
  metrics: MetricsReducer,
  metricInfos: MetricInfosReducer,
});

export default rootReducer;
