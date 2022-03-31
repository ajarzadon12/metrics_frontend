import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from 'axios';
import { replace } from 'lodash';

const apiClient = axios.create({baseURL: 'http://localhost:3001'});
const METRICS_API = '/api/v1/metrics';
const SHOW_METRIC_API = '/api/v1/metrics/:id';

const metricsAdapter = createEntityAdapter();

const initialState = metricsAdapter.getInitialState({
  status: "idle",
  selectedMetric: {},
  addStatus: "idle",
  error: null,
});

export const fetchAllMetrics = createAsyncThunk(
  "metric/fetchAllMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(METRICS_API);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        ...err.response.data,
        status: err.response.status,
      });
    }
  }
);

export const showMetricValues = createAsyncThunk(
  "metric/show",
  async ({ metric_id }, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(replace(SHOW_METRIC_API, ':id', metric_id));
      return response.data;
    } catch (err) {
      return rejectWithValue({
        ...err.response.data,
        status: err.response.status,
      });
    }
  }
);

export const addNewMetric = createAsyncThunk(
  "metric/addNew",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(METRICS_API, { metric: params });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        ...err.response.data,
        status: err.response.status,
      });
    }
  }
);

const metricsSlice = createSlice({
  name: "metrics",
  initialState,
  reducers: {
    metricsReloaded: (state) => {
      state.status = "idle";
      state.addStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMetrics.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAllMetrics.fulfilled, (state, action) => {
      state.status = "succeeded";
      metricsAdapter.upsertMany(state, action.payload);
    });

    builder.addCase(fetchAllMetrics.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(showMetricValues.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(showMetricValues.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedMetric = action.payload;
    });

    builder.addCase(showMetricValues.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(addNewMetric.pending, (state) => {
      state.addStatus = "pending";
    });

    builder.addCase(addNewMetric.fulfilled, (state, action) => {
      state.addStatus = "succeeded";
      metricsAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(addNewMetric.rejected, (state) => {
      state.addStatus = "failed";
    });
  },
});

export const selectors = metricsAdapter.getSelectors(state => state.metrics);
export const getSelectedMetric = (state) => state.metrics.selectedMetric;
export const getAddMetricStatus = (state) => state.metrics.addStatus;

export default metricsSlice.reducer;

