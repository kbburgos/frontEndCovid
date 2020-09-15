import React from "react";
import { Chart } from "react-google-charts";

class information extends React.Component {
  render() {
    return (
      <di>
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="GeoChart"
          data={[
            ["Country", "Latitude"],
            ["Brazil", 4349544],
            ["Peru", 733860],
            ["Colombia", 721892],
            ["Argentina", 565446],
            ["Chile", 437983],
            ["Ecuador", 118911],
            ["Uruguay", 1812],
          ]}
          options={{
            region: "005", // Africa
            colorAxis: { colors: ["#00853f", "black", "#e31b23"] },
            backgroundColor: "#81d4fa",
            datalessRegionColor: "#f8bbd0",
            defaultColor: "#f5f5f5",
          }}
          rootProps={{ "data-testid": "4" }}
        />
      </di>
    );
  }
}

export default information;
