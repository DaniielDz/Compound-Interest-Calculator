import React, { useState, useEffect } from "react";
import Graph from "./components/HighChart";
import PieGraph from "./components/PieGraph";
import TableComponent from "./components/Table";
import InputComponent from "./components/InputComponent";
import { calculateContributions } from "./Helpers";

function App() {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [contributions, setContributions] = useState(150);
  const [intervalType, setIntervalType] = useState("monthly"); // Default to monthly
  const [rateOfReturn, setRateOfReturn] = useState(4);
  const [yearsOfGrowth, setYearsOfGrowth] = useState(10);
  const [result, setResult] = useState(null);

  const [activeComponent, setActiveComponent] = useState("graph"); // Estado para controlar qué componente se muestra

  // Funciones para manejar el cambio de componente
  const handleGraphClick = () => setActiveComponent("graph");
  const handlePieGraphClick = () => setActiveComponent("pie");
  const handleTableClick = () => setActiveComponent("table");

  // Función para calcular y establecer el resultado
  const calculateAndSetResult = () => {
    const intervalMultiplier = intervalType === "monthly" ? 12 : 1; // Adjust multiplier based on interval type
    const newResult = calculateContributions(
      initialAmount,
      contributions,
      intervalMultiplier,
      rateOfReturn,
      yearsOfGrowth
    );
    setResult(newResult);
  };

  // Efecto secundario para calcular los resultados iniciales y actualizarlos cuando los datos cambien
  useEffect(() => {
    calculateAndSetResult();
  }, [initialAmount, contributions, intervalType, rateOfReturn, yearsOfGrowth]);

  // Función para manejar el cambio en los inputs
  const handleInputChange = (label, value) => {
    // Convertir el valor a un número
    const numericValue = isNaN(parseFloat(value)) ? value : parseFloat(value);

    switch (label) {
      case "Initial Amount":
        setInitialAmount(numericValue);
        break;
      case "Contributions":
        setContributions(numericValue);
        break;
      case "Rate of Return":
        setRateOfReturn(numericValue);
        break;
      case "Years of Growth":
        setYearsOfGrowth(numericValue);
        break;
      default:
        break;
    }
  };

  // Función para manejar el cambio en el tipo de intervalo (mensual o anual)
  const handleIntervalTypeChange = (value) => {
    setIntervalType(value);
  };

  return (
    <div className="my-8 m-auto py-2 px-8 w-[425px] sm:w-full sm:m-0 lg:my-8 lg:m-auto lg:py-2 lg:w-[1150px] ">
      <div className="sm:w-full lg:w-[1038px] lg:flex lg:m-auto lg:gap-3 lg:mt-10 ">
        <div className="w-max flex flex-col items-center mt-10 m-auto gap-3 sm:w-full lg:m-0 lg:w-[25%]  ">
          <InputComponent
            label={"Initial Amount"}
            value={initialAmount}
            onChange={(value) => handleInputChange("Initial Amount", value)}
            step={100}
          />
          <InputComponent
            label={"Contributions"}
            value={contributions}
            onChange={(value) => handleInputChange("Contributions", value)}
            step={50}
          />
          <div className="w-full flex justify-between mb-3 sm:justify-evenly lg:justify-between">
            <label className="flex gap-3 text-base text-[#292929]">
              <input
                type="radio"
                value="monthly"
                checked={intervalType === "monthly"}
                onChange={() => handleIntervalTypeChange("monthly")}
              />
              Monthly
            </label>
            <label className="flex gap-3 text-base text-[#292929]">
              <input
                type="radio"
                value="annually"
                checked={intervalType === "annually"}
                onChange={() => handleIntervalTypeChange("annually")}
              />
              Annually
            </label>
          </div>
          <InputComponent
            label={"Rate of Return"}
            value={rateOfReturn}
            onChange={(value) => handleInputChange("Rate of Return", value)}
            step={0.25}
          />
          <InputComponent
            label={"Years of Growth"}
            value={yearsOfGrowth}
            onChange={(value) => handleInputChange("Years of Growth", value)}
            step={1}
          />
        </div>

        <div className="lg:w-[75%]">
          <p className="text-center text-[#292929] text-2xl w-[200px] m-auto mb-2 sm:w-[520px] sm:my-7">
            After {yearsOfGrowth} years, your total balance is{" "}
            <span className="font-semibold">
              ${result && result.balances[result.balances.length - 1]}
            </span>
          </p>
          <div className="mx-6 mt-5 mb-12 flex justify-center">
            <div
              className={`cursor-pointer mr-5 pr-5 border-r-2 border-solid border-[#efeff1] cursor-pointer ${
                activeComponent === "graph" ? "active" : ""
              }`}
              onClick={handleGraphClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#02295D"
                    d="M23.844 0a2.464 2.464 0 0 0-2.461 2.46c0 .552.182 1.061.489 1.472l-4.003 4.343a2.46 2.46 0 0 0-1.95.341l-2.852-2.138a2.464 2.464 0 0 0-2.348-3.197A2.464 2.464 0 0 0 8.37 6.478L5.52 8.616a2.464 2.464 0 0 0-3.824 2.048 2.464 2.464 0 0 0 2.46 2.461 2.464 2.464 0 0 0 2.349-3.197l2.85-2.138a2.46 2.46 0 0 0 2.727 0l2.85 2.138a2.464 2.464 0 0 0 2.348 3.197 2.464 2.464 0 0 0 2.462-2.46 2.45 2.45 0 0 0-.489-1.472l4.003-4.343a2.464 2.464 0 0 0 3.049-2.39A2.464 2.464 0 0 0 23.844 0M4.156 11.484a.821.821 0 0 1 0-1.64.821.821 0 0 1 0 1.64m6.563-4.921a.821.821 0 0 1 0-1.641.821.821 0 0 1 0 1.64zm6.562 4.921a.821.821 0 0 1 0-1.64.821.821 0 0 1 0 1.64m6.563-8.203a.821.821 0 0 1 0-1.64.821.821 0 0 1 0 1.64"
                  ></path>
                  <path
                    fill="#02295D"
                    d="M27.18 26.36h-.82V10.663a.82.82 0 0 0-.82-.82h-3.337a.82.82 0 0 0-.82.82V26.36h-1.64v-9.132a.82.82 0 0 0-.821-.82H15.64a.82.82 0 0 0-.82.82v9.132h-1.64V13.945a.82.82 0 0 0-.82-.82H9.077a.82.82 0 0 0-.82.82V26.36h-1.64v-7.492a.82.82 0 0 0-.821-.82H2.46a.82.82 0 0 0-.82.82v7.492H.82a.82.82 0 0 0 0 1.64h26.36a.82.82 0 0 0 0-1.64m-22.203 0H3.28v-6.672h1.696v6.671zm6.562 0H9.9V14.765h1.64v11.593zm6.563 0H16.46v-8.313h1.64v8.312zm6.617 0h-1.696V11.483h1.696z"
                  ></path>
                </g>
              </svg>
            </div>
            <div
              className={`cursor-pointer mr-5 pr-5 border-r-2 border-solid border-[#efeff1] cursor-pointer ${
                activeComponent === "pie" ? "active" : ""
              }`}
              onClick={handlePieGraphClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
              >
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#02295D"
                    d="M24.17 14.687H13.275V3.792A.79.79 0 0 0 12.483 3C5.603 3 .003 8.6.003 15.48c0 6.879 5.6 12.479 12.48 12.479s12.48-5.6 12.48-12.48a.797.797 0 0 0-.793-.792M12.483 26.374c-6.005 0-10.895-4.89-10.895-10.895 0-5.74 4.461-10.46 10.102-10.865v10.865c0 .44.352.793.793.793h10.865c-.405 5.64-5.125 10.102-10.865 10.102"
                  ></path>
                  <path
                    fill="#02295D"
                    d="M27.956 12.439a12.5 12.5 0 0 0-3.123-8.218A12.49 12.49 0 0 0 15.476 0a.79.79 0 0 0-.792.792V12.48c0 .44.352.792.792.792h11.688a.79.79 0 0 0 .792-.792zm-11.687-.746V1.62a10.9 10.9 0 0 1 7.373 3.657 10.9 10.9 0 0 1 2.7 6.416z"
                  ></path>
                </g>
              </svg>
            </div>
            <div
              className={`cursor-pointer ${
                activeComponent === "table" ? "active" : ""
              }`}
              onClick={handleTableClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30px"
                height="30px"
              >
                <path
                  fill="#02295D"
                  fill-rule="evenodd"
                  d="M25 .2A4.8 4.8 0 0 1 29.8 5v20a4.8 4.8 0 0 1-4.8 4.8H5A4.8 4.8 0 0 1 .2 25V5A4.8 4.8 0 0 1 5 .2zm3.199 8.599h-26.4L1.8 25a3.2 3.2 0 0 0 3.018 3.195L5 28.2h20a3.2 3.2 0 0 0 3.2-3.2zM13 22.2a.8.8 0 0 1 .1 1.594l-.1.006H5a.8.8 0 0 1-.1-1.594L5 22.2zm12 0a.8.8 0 0 1 .1 1.594l-.1.006h-8a.8.8 0 0 1-.1-1.594l.1-.006zm-12-5a.8.8 0 0 1 .1 1.594l-.1.006H5a.8.8 0 0 1-.1-1.594L5 17.2zm12 0a.8.8 0 0 1 .1 1.594l-.1.006h-8a.8.8 0 0 1-.1-1.594l.1-.006zm-12-5a.8.8 0 0 1 .1 1.594l-.1.006H5a.8.8 0 0 1-.1-1.594L5 12.2zm12 0a.8.8 0 0 1 .1 1.594l-.1.006h-8a.8.8 0 0 1-.1-1.594l.1-.006zm0-10.4H5A3.2 3.2 0 0 0 1.8 5l-.001 2.199h26.4L28.2 5a3.2 3.2 0 0 0-3.018-3.195z"
                ></path>
              </svg>
            </div>
          </div>

          {/* Mostrar el componente activo */}
          <div className="w-full">
            {activeComponent === "graph" && result && <Graph data={result} />}
            {activeComponent === "pie" && result && <PieGraph data={result} />}
            {activeComponent === "table" && result && (
              <TableComponent data={result} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
