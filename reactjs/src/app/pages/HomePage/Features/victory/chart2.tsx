import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory';

const sampleData = []

export const Chart2 = () => {
  return (
    <div>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryArea data={sampleData} />
        <VictoryAxis />
      </VictoryChart>
      <VictoryChart polar theme={VictoryTheme.material}>
        <VictoryArea data={sampleData} />
        <VictoryPolarAxis />
      </VictoryChart>
    </div>
  );
};
