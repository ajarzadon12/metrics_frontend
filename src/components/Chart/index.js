import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const Chart = ({ title, series, options = {}, type }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <ApexCharts
        type={type}
        series={series}
        options={options}
        height="100%"
        width="100%"
      />
    </Card>
  );
};

Chart.propTypes = {
  title: PropTypes.string,
  series: PropTypes.arrayOf(PropTypes.object),
  options: PropTypes.object,
  type: PropTypes.string,
};

export default Chart;
