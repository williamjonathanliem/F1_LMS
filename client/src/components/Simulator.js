import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

export default function Simulator() {
  const [engine, setEngine] = useState("Balanced");
  const [tires, setTires] = useState("Soft");
  const [raceLength, setRaceLength] = useState(40);
  const [pitInput, setPitInput] = useState("15-Medium, 30-Hard");
  const [driverStyle, setDriverStyle] = useState("Balanced");
  const [weather, setWeather] = useState("Dry");
  const [runs, setRuns] = useState([]);

  const compoundColors = {
    Soft: "red",
    Medium: "orange",
    Hard: "white",
  };

  const runSim = () => {
    let results = [];
    let baseTime = 90;

    const engineBoosts = {
      Balanced: 0,
      "Power-focused": -0.8,
      "Reliability-focused": 0.5,
    };

    const tireStats = {
      Soft: { pace: -1.5, deg: 0.25 },
      Medium: { pace: -0.5, deg: 0.12 },
      Hard: { pace: 0.8, deg: 0.05 },
    };

    const weatherMods = {
      Dry: 1,
      Hot: 1.3,
      Rain: 0.7,
    };

    const driverStyles = {
      Conservative: { aggression: 3, risk: 0.9 },
      Balanced: { aggression: 5, risk: 1.0 },
      Aggressive: { aggression: 8, risk: 1.2 },
    };

    let driver = driverStyles[driverStyle];
    let currentTire = tireStats[tires];

    let pits = pitInput
      .split(",")
      .map((s) => s.trim().split("-"))
      .filter(([lap, comp]) => !isNaN(parseInt(lap)) && comp in tireStats)
      .map(([lap, comp]) => ({ lap: parseInt(lap), compound: comp }));

    let pitHistory = [{ lap: 0, compound: tires }];

    let currentTime = baseTime + engineBoosts[engine] + currentTire.pace;

    for (let i = 1; i <= raceLength; i++) {
      let pitPenalty = 0;

      let pit = pits.find((p) => p.lap === i);
      if (pit) {
        pitPenalty = 20 + Math.random() * 2;
        currentTire = tireStats[pit.compound];
        pitHistory.push({ lap: i, compound: pit.compound });
      }

      let degPenalty =
        currentTire.deg * i * weatherMods[weather] * (1 + driver.aggression / 10);
      let aggressionBoost = -0.1 * driver.aggression * driver.risk;

      let lapTime =
        currentTime +
        degPenalty +
        pitPenalty +
        aggressionBoost +
        Math.random() * 0.5;

      results.push({
        lap: i,
        time: parseFloat(lapTime.toFixed(2)),
        compound: pitHistory[pitHistory.length - 1].compound,
        run: `${engine}-${tires}-${driverStyle}-${weather}`,
      });
    }

    results.pitHistory = pitHistory;
    setRuns((prev) => [...prev, results]);
  };

  const calculateSummary = (run) => {
    const totalTime = run.reduce((sum, lap) => sum + lap.time, 0).toFixed(2);
    const avgLap = (totalTime / run.length).toFixed(2);
    const pits = run.pitHistory.length - 1;

    // Build stint summary
    let stints = [];
    for (let i = 0; i < run.pitHistory.length; i++) {
      const startLap = run.pitHistory[i].lap + 1;
      const compound = run.pitHistory[i].compound;
      const endLap =
        run.pitHistory[i + 1]?.lap || run[run.length - 1].lap;
      stints.push(`${startLap}-${endLap} (${compound})`);
    }

    return { totalTime, avgLap, pits, stints };
  };

  return (
    <div className="container mt-4">
      <h2 className="text-danger">🏎 Ultimate F1 Race Simulator</h2>

      {/* Controls */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label className="form-label">Engine Setup</label>
          <select className="form-select" value={engine} onChange={(e) => setEngine(e.target.value)}>
            <option>Balanced</option>
            <option>Power-focused</option>
            <option>Reliability-focused</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Starting Tire</label>
          <select className="form-select" value={tires} onChange={(e) => setTires(e.target.value)}>
            <option>Soft</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Driver Style</label>
          <select className="form-select" value={driverStyle} onChange={(e) => setDriverStyle(e.target.value)}>
            <option>Conservative</option>
            <option>Balanced</option>
            <option>Aggressive</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Weather</label>
          <select className="form-select" value={weather} onChange={(e) => setWeather(e.target.value)}>
            <option>Dry</option>
            <option>Hot</option>
            <option>Rain</option>
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <label className="form-label">Race Length (laps)</label>
          <select className="form-select" value={raceLength} onChange={(e) => setRaceLength(parseInt(e.target.value))}>
            <option value={20}>20</option>
            <option value={40}>40</option>
            <option value={60}>60</option>
            <option value={78}>78 (Monaco GP)</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Pit Strategy (e.g. 12-Soft, 30-Hard)</label>
          <input type="text" className="form-control" value={pitInput} onChange={(e) => setPitInput(e.target.value)} />
        </div>
      </div>

      <button className="btn btn-danger mb-3" onClick={runSim}>Run Simulation</button>

      {/* Graph */}
      {runs.length > 0 && (
        <>
          <div style={{ width: "100%", height: 500 }}>
            <ResponsiveContainer>
              <LineChart>
                <CartesianGrid stroke="#444" />
                <XAxis dataKey="lap" type="number" stroke="#fff" domain={[1, raceLength]} />
                <YAxis stroke="#fff" label={{ value: "Lap Time (s)", angle: -90, position: "insideLeft" }} />
                <Tooltip formatter={(value) => [`${value}s`, "Lap Time"]} />
                <Legend />

                {runs.map((runData, idx) => (
                  <Line
                    key={idx}
                    type="monotone"
                    data={runData}
                    dataKey="time"
                    stroke={["#e10600", "#00e1ff", "#ffae00", "#4caf50"][idx % 4]}
                    strokeWidth={2}
                    dot={false}
                    name={runData[0]?.run || `Run ${idx + 1}`}
                  />
                ))}

                {runs[runs.length - 1].pitHistory?.map((pit, i) => (
                  pit.lap > 0 && (
                    <ReferenceLine
                      key={i}
                      x={pit.lap}
                      stroke={compoundColors[pit.compound]}
                      strokeDasharray="3 3"
                      label={{
                        value: `Pit @${pit.lap} (${pit.compound})`,
                        angle: -90,
                        fill: compoundColors[pit.compound],
                      }}
                    />
                  )
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Summary Table */}
          <h3 className="text-white mt-4">📊 Simulation Summary</h3>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Run</th>
                <th>Total Time (s)</th>
                <th>Avg Lap (s)</th>
                <th>Pit Stops</th>
                <th>Stints</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run, idx) => {
                const { totalTime, avgLap, pits, stints } = calculateSummary(run);
                return (
                  <tr key={idx}>
                    <td>{run[0]?.run || `Run ${idx + 1}`}</td>
                    <td>{totalTime}</td>
                    <td>{avgLap}</td>
                    <td>{pits}</td>
                    <td>{stints.join(", ")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
