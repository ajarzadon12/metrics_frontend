import React from 'react';
import { useSelector } from "react-redux";
import { Grid, Typography } from '@mui/material';
import { isEmpty } from 'lodash';

import Chart from '../../components/Chart';
import { getSelectedMetric } from './metricsSlice';

const MetricViewer = () => {
  const metric = useSelector(getSelectedMetric);
  const { name, values, average_min, average_hour, average_day } = metric;

  const timelineChartOptions = {
    chart: {
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
      style: 'hollow',
    },
    xaxis: {
      type: 'datetime',
      tickAmount: 6,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy hh:mm'
      }
    },
  };

  const averageChartOptions = {
    chart: {
      height: 350,
      zoom: {
        autoScaleYaxis: true
      }
    },
    dataLabels: {
      enabled: false
    },
  };

  return (
    <div>
      {!isEmpty(metric) && !isEmpty(metric.values) ? (
         <Grid container spacing={2}>
           <Grid item xs={12}>
             <Chart
               type="area"
               title={name}
               series={[{ data: values }]}
               options={timelineChartOptions}
             />
           </Grid>
           <Grid item xs={4}>
             <Chart
               type="area"
               title="Average per min (last hour)"
               series={[{ data: average_min }]}
               options={averageChartOptions}
             />
           </Grid>
           <Grid item xs={4}>
             <Chart
               type="area"
               title="Average per hour (last day)"
               series={[{ data: average_hour }]}
               options={averageChartOptions}
             />
           </Grid>
           <Grid item xs={4}>
             <Chart
               type="area"
               title="Average per day (last 30 days)"
               series={[{ data: average_day }]}
               options={averageChartOptions}
             />
           </Grid>
         </Grid>
      ) : (
         <Typography variant="caption">No data found</Typography>
      )}
    </div>
  );
};

MetricViewer.propTypes = {};

export default MetricViewer;
