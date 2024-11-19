/* eslint-disable react/prop-types */
import { Clock } from "lucide-react";

const formatTime = (timeString) => {
  const time = new Date(`2000-01-01T${timeString}`);
  return time
    .toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
};

const ScheduleDisplay = ({ timeData }) => {
  if (!timeData)
    return <p className="text-neutral-600">Horario no disponible</p>;

  const {
    time_start_day_one,
    time_end_day_one,
    time_start_day_two,
    time_end_day_two,
    double_day,
    working_days,
    state,
  } = timeData;

  if (!state) {
    return <p className="text-neutral-600">Horario no establecido</p>;
  }

  const getScheduleText = () => {
    if (double_day) {
      return (
        <>
          {formatTime(time_start_day_one)} - {formatTime(time_end_day_one)} y{" "}
          {formatTime(time_start_day_two)} - {formatTime(time_end_day_two)}
        </>
      );
    }
    return (
      <>
        {formatTime(time_start_day_one)} - {formatTime(time_end_day_one)}
      </>
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-neutral-600">
        <Clock size={20} />
        <span>Horario: {getScheduleText()}</span>
      </div>
      {working_days && working_days.length > 0 && (
        <p className="text-sm text-neutral-500">
          Días: {working_days.join(", ")}
        </p>
      )}
    </div>
  );
};

export default ScheduleDisplay;
