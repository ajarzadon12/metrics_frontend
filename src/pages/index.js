import React from 'react';
import { Grid } from '@mui/material';

import ApplicationLayout from '../layouts/ApplicationLayout';
import { MetricInfoForm, MetricViewer } from '../features/Metrics';

const Index = () => {
  return (
    <ApplicationLayout>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <MetricInfoForm />
        </Grid>
        <Grid item xs={9}>
          <MetricViewer />
        </Grid>
      </Grid>
    </ApplicationLayout>
  );
};

export default Index;
