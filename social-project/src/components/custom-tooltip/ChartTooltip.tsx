const ChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="tooltip">
        <p>{label}</p>
        <p>Total Session: {data.sessions}</p>
        <p>Completed: {data.session_completed}</p>
        <p>Canceled: {data.session_cancelled}</p>
        <p>Completion rate: {data.completion_rate.toFixed(2)}%</p>
      </div>
    );
  }
  return null;
};

export default ChartTooltip;
