import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from 'axios';

const apiClient = axios.create({baseURL: 'http://localhost:3001'});
const METRIC_INFOS_API = '/api/v1/metric_infos';

const metricInfosAdapter = createEntityAdapter();

const initialState = metricInfosAdapter.getInitialState({
  addStatus: "idle",
  error: null,
});

export const addNewMetricInfo = createAsyncThunk(
  "metricInfo/addNew",
  async ({ params }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(METRIC_INFOS_API, { metric_info: params });
      return response.data;
    } catch (err) {
      return rejectWithValue({
        ...err.response.data,
        status: err.response.status,
      });
    }
  }
);

const metricInfosSlice = createSlice({
  name: "metricInfos",
  initialState,
  reducers: {
    metricInfosReloaded: (state) => {
      state.status = "idle";
      state.addStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewMetricInfo.pending, (state) => {
      state.addStatus = "pending";
    });

    builder.addCase(addNewMetricInfo.fulfilled, (state, action) => {
      state.addStatus = "succeeded";
      metricInfosAdapter.upsertOne(state, action.payload);
    });

    builder.addCase(addNewMetricInfo.rejected, (state) => {
      state.addStatus = "failed";
    });
  },
});

export const selectors = metricInfosAdapter.getSelectors(state => state.metricInfos);
export const getAddMetricInfoStatus = (state) => state.metricInfos.addStatus;

export default metricInfosSlice.reducer;

