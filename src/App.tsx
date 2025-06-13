import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./routes/home/home";
import { EchartsInReact } from "./routes/echarts-in-react";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/echarts-in-react" element={<EchartsInReact />} />
			</Routes>
		</BrowserRouter>
	);
};
