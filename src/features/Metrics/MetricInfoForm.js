import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';

import { selectors as metricsSelectors, fetchAllMetrics, showMetricValues } from './metricsSlice';
import { addNewMetricInfo, getAddMetricInfoStatus } from './metricInfosSlice';
import MetricFormModal from './MetricFormModal';

const filter = createFilterOptions();

const MetricInfoForm = () => {
  const dispatch = useDispatch();
  const allMetrics = useSelector(metricsSelectors.selectAll);
  const addMetricInfoStatus = useSelector(getAddMetricInfoStatus);
  const [metric, setMetric] = useState(null);
  const [newMetric, setNewMetric] = useState(null);
  const [value, setValue] = useState(0);
  const [timestamp, setTimestamp] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const filterMetricOptions = (options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`,
      });
    }
    return filtered;
  };

  const handleMetricChanged = (event, newValue) => {
    if (typeof newValue === 'string') {
      setTimeout(() => {
        setModalOpen(true);
        setNewMetric(newValue);
      });
    } else if (newValue && newValue.inputValue) {
      setModalOpen(true);
      setNewMetric(newValue.inputValue);
    } else {
      setMetric(newValue);
    }
  };

  const handleMetricAdded = (name) => {
    const selected = allMetrics.filter(metric => metric.name === name)[0];
    setMetric(selected);
    handleModalClose();
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleTimestampChange = (value) =>{
    setTimestamp(value);
  };

  const handleSubmit = () => {
    const params = {
      metric_id: metric.id,
      value,
      timestamp,
    };
    dispatch(addNewMetricInfo({ params }));
  };

  useEffect(() => {
    dispatch(fetchAllMetrics());
  }, []);

  useEffect(() => {
    if(metric !== null && addMetricInfoStatus === 'succeeded') {
      alert('Add metric info successful');
      dispatch(showMetricValues({ metric_id: metric.id }));
    }
  }, [addMetricInfoStatus]);

  useEffect(() => {
    if(metric !== null) {
      dispatch(showMetricValues({ metric_id: metric.id }));
    }
  }, [metric]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          id="metric-input"
          value={metric}
          key={option => option.id}
          sx={{ width: 300 }}
          options={allMetrics}
          getOptionLabel={option => option.name}
          filterOptions={filterMetricOptions}
          onChange={handleMetricChanged}
          renderInput={params => <TextField {...params} label="Metric" />}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Value"
          id="metric-value"
          value={value}
          sx={{ width: 300 }}
          onChange={handleValueChange}
        />
      </Grid>
      <Grid item xs={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDateTimePicker
            value={timestamp}
            onChange={handleTimestampChange}
            renderInput={params => <TextField {...params} sx={{ width: 300 }} label="Timestamp" />}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </Grid>
      <MetricFormModal
        initialName={newMetric}
        open={modalOpen}
        handleClose={handleModalClose}
        handleMetricAdded={handleMetricAdded}
      />
    </Grid>
  );
};

MetricInfoForm.propTypes = {};

export default MetricInfoForm;
