import {
  NumberOfAppointmentsStatisticsCard,
  NumberOfDoctorsStatisticsCard,
  NumberOfPatientsStatisticsCard,
} from "@/components/home/StatisticsCard";
import TopDoctors from "@/components/home/TopDoctors";

export default async function Home() {
  return (
    <div className=" flex-1">
      <div className="h-full py-5 flex flex-col gap-4 overflow-hidden">
        <div className="flex flex-wrap *:flex-1 justify-between gap-4">
          <NumberOfDoctorsStatisticsCard />
          <NumberOfPatientsStatisticsCard />
          <NumberOfAppointmentsStatisticsCard />
        </div>
        <div className="flex-1 min-h-[400px] grid overflow-hidden">
          <TopDoctors />
        </div>
      </div>
    </div>
  );
}
