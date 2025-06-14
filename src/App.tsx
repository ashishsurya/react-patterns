import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./routes/home/home";
import { EchartsInReact } from "./routes/echarts-in-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const App = () => {
	return (
		<MantineProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/echarts-in-react" element={<EchartsInReact />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
};
