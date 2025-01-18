import { TimeInput } from "@nextui-org/react";
import { Time } from "@internationalized/date";
import { useState, useEffect } from "react";
import { Switch } from "@nextui-org/react";

const parseTime = (time) => {
  return time.toString().slice(0, 5);
};

export const HourIntervals = ({ setIntervals }) => {
  // Primer intervalo horario
  const [startTimeInterval1, setStartTimeInterval1] = useState(new Time(6, 0));
  const [endTimeInterval1, setEndTimeInterval1] = useState(new Time(12, 0));

  // Segundo intervalo horario
  const [startTimeInterval2, setStartTimeInterval2] = useState(new Time(13, 0));
  const [endTimeInterval2, setEndTimeInterval2] = useState(new Time(19, 0));

  // Selección para manejar dos intervalos
  const [doubleInterval, setDoubleInterval] = useState(false);

  // Objeto con los intervalos de tiempo
  const times = {
    firstInterval: {
      start: parseTime(startTimeInterval1),
      end: parseTime(endTimeInterval1),
    },
    secondInterval: {
      start: parseTime(startTimeInterval2),
      end: parseTime(endTimeInterval2),
    },
    doubleInterval: doubleInterval,
  };

  // Actualizar el objeto de intervalos automáticamente al cambiar los valores
  useEffect(() => {
    setIntervals(times);
  }, [
    startTimeInterval1,
    endTimeInterval1,
    startTimeInterval2,
    endTimeInterval2,
    doubleInterval,
  ]);

  return (
    <div className="flex flex-col w-full px-6 gap-4">
      {doubleInterval ? (
        <p className="font-semibold text-medium">Intervalo 1</p>
      ) : null}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <TimeInput
          hourCycle={12}
          value={startTimeInterval1}
          defaultValue={startTimeInterval1}
          label={doubleInterval ? "Inicio intervalo" : "Hora de inicio"}
          labelPlacement="outside"
          onChange={(value) => {
            setStartTimeInterval1(value);
          }}
        />
        <TimeInput
          hourCycle={12}
          value={endTimeInterval1}
          defaultValue={endTimeInterval1}
          label={
            doubleInterval ? "Finalización intervalo" : "Hora de finalización"
          }
          labelPlacement="outside"
          onChange={(value) => {
            setEndTimeInterval1(value);
          }}
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
              value={startTimeInterval2}
              defaultValue={startTimeInterval2}
              label={"Inicio intervalo"}
              labelPlacement="outside"
              onChange={(value) => setStartTimeInterval2(value)}
            />
            <TimeInput
              hourCycle={12}
              value={endTimeInterval2}
              defaultValue={endTimeInterval2}
              label={"Finalización intervalo"}
              labelPlacement="outside"
              onChange={(value) => setEndTimeInterval2(value)}
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
