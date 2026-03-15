import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import DailyScrumPage from "./pages/DailyScrumPage";
import DailyReportPage from "./pages/DailyReportPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import ReviewReportPage from "./pages/ReviewReportPage";
import TeamManagePage from "./pages/TeamManagePage";
import TeamSharePage from "./pages/TeamSharePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: DailyScrumPage },
      { path: "reports/daily", Component: DailyReportPage },
      { path: "reports/weekly", Component: WeeklyReportPage },
      { path: "reports/monthly", Component: MonthlyReportPage },
      { path: "reports/review", Component: ReviewReportPage },
      { path: "setting", Component: TeamManagePage },
      { path: "team/daily", Component: TeamSharePage },
      { path: "team/weekly", Component: TeamSharePage },
    ],
  },
]);