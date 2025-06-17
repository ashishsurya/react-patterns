import * as echarts from "echarts";
import {
	getAllSeriesInTheEcharts,
	getColorPalletteUsed,
} from "../utils/get-echarts-series";
import { useState } from "react";

export interface CustomEchartsLegendProps {
	chartRef: React.RefObject<HTMLDivElement | null>;
}

export const CustomEchartsLegend = (props: CustomEchartsLegendProps) => {
	const series = getAllSeriesInTheEcharts({
		chartRef: props.chartRef,
	}) as Array<Record<string, unknown>>;
	const [selectedSeries, setSelectedSeries] = useState<string[]>(
		series?.map((s) => s.name as string),
	);

	const colors = getColorPalletteUsed({ chartRef: props.chartRef });

	return <></>;
};
