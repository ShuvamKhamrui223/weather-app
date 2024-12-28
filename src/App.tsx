import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./Layout/AppLayout";
import Errorpage from "./pages/Errorpage";
import Homepage from "./pages/Homepage";
import { lazy } from "react";

const SearchedResultpage = lazy(() => import("./pages/SearchedResultpage"));
function App() {
  const weatherAppRoutes = createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />} errorElement={<Errorpage />}>
        <Route index element={<Homepage />} />
        <Route path="city" element={<SearchedResultpage />} />
        <Route path="*" element={<Errorpage />} />
      </Route>
    </>
  );

  return (
    <>
      <RouterProvider router={createBrowserRouter(weatherAppRoutes)} />
    </>
  );
}

export default App;
