import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

import { addNewMetric, getAddMetricStatus } from './metricsSlice';

const MetricFormModal = ({ initialName, open, handleClose, handleMetricAdded }) => {
  const dispatch = useDispatch();
  const [metricName, setMetricName] = useState(initialName);
  const addStatus = useSelector(getAddMetricStatus);

  const handleSubmit = () => {
    const params = { name: metricName };
    dispatch(addNewMetric({ params }));
  };

  useEffect(() => {
    setMetricName(initialName);
  }, [initialName]);

  useEffect(() => {
    if(addStatus === 'succeeded') {
      handleMetricAdded(metricName);
    }
  }, [addStatus])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a new metric</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          value={metricName}
          onChange={event => setMetricName(event.target.value)}
          label="Metric name"
          type="text"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

MetricFormModal.propTypes = {
  open: PropTypes.bool,
  initialName: PropTypes.string,
  handleClose: PropTypes.func,
  handleMetricAdded: PropTypes.func,
};

export default MetricFormModal;
