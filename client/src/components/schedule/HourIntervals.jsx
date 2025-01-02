import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { useState } from "react";
import { Switch } from "@nextui-org/react";

export const HourIntervals = ({ times, setTimes }) => {
  // Primer intervalo horario
  const [startTimeInterval1, setStartTimeInterval1] = useState();
  const [endTimeInterval1, setEndTimeInterval1] = useState();

  // Segundo intervalo horario
  const [startTimeInterval2, setStartTimeInterval2] = useState();
  const [endTimeInterval2, setEndTimeInterval2] = useState();

  // Selección para manejar dos intervalos
  const [doubleInterval, setDoubleInterval] = useState();

  const handleTimeChange = (interval, field, value) => {
    setTimes((prevTimes) => ({
      ...prevTimes,
      [interval]: {
        ...prevTimes[interval],
        [field]: value,
      },
    }));
    console.log(times);
  };

  return (
    <div className="flex flex-col w-full px-6 gap-4">
      {doubleInterval ? (
        <p className="font-semibold text-medium">Intervalo 1</p>
      ) : null}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <TimeInput
          hourCycle={12}
          defaultValue={new Time(6, 0)}
          label={doubleInterval ? "Inicio intervalo" : "Hora de inicio"}
          labelPlacement="outside"
          onChange={(value) =>
            handleTimeChange("firstInterval", "start", value)
          }
        />
        <TimeInput
          hourCycle={12}
          defaultValue={new Time(12, 0)}
          label={
            doubleInterval ? "Finalización intervalo" : "Hora de finalización"
          }
          labelPlacement="outside"
          onChange={(value) => handleTimeChange("firstInterval", "end", value)}
        />
      </div>
      {!doubleInterval ? (
        <>
          <p>¿Te gustaría manejar otro intervalo en el dia?</p>
        </>
      ) : (
        <>
          {doubleInterval ? (
            <p className="font-semibold text-medium">Intervalo 2</p>
          ) : null}
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <TimeInput
              hourCycle={12}
              defaultValue={new Time(13, 0)}
              label={"Inicio intervalo"}
              labelPlacement="outside"
              onChange={(value) =>
                handleTimeChange("secondInterval", "start", value)
              }
            />
            <TimeInput
              hourCycle={12}
              defaultValue={new Time(19, 0)}
              label={"Finalización intervalo"}
              labelPlacement="outside"
              onChange={(value) =>
                handleTimeChange("secondInterval", "end", value)
              }
            />
          </div>
        </>
      )}
      <Switch
        size="sm"
        isSelected={doubleInterval}
        onValueChange={setDoubleInterval}
      >
        Dos intervalos
      </Switch>
    </div>
  );
};
