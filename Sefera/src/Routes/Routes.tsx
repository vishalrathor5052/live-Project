import LandingPage from "../Screens/LandingPage/LandingPage";
import Layout from "../Components/HOC/Layout";


const LandingLayout = Layout(LandingPage)
interface RouteItem {
    id: number; path: string; element: unknown,
}
export const LandingRoutes: RouteItem[] = [
    {
        id:1,
        path: "/",
        element: <LandingLayout />,
    },
]