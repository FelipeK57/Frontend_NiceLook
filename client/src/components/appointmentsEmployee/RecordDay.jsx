import { Card, Badge } from "@nextui-org/react";
import RecordList from "./RecordList";
function RecordDay(props) {
    return (
        <div className="flex-col  flex gap-4 ">
            <div key={props.index} className="flex-row flex w-full "> {/* Ancho aumentado de cada día */}
                <Card className="bg-[#1270B0] flex p-3 text-center text-[#F5F7FA] rounded-2xl border border-gray-300 mb-4  z-5 w-[350px] ">
                    <div className="flex flex-row justify-between items-center">
                        <p className="font-bold text-xl">{props.day.name}</p>
                        <div className="w-10 h-10 rounded-full justify-center items-center bg-white flex ">
                            <Badge color="secondary" content={props.day.date} size="xl" className="flex text-[#1270B0] bg-transparent text-3xl rounded-full border-none"></Badge>
                        </div>
                    </div>
                </Card>

            </div>
            <RecordList />
        </div>

    );
}

export default RecordDay;
