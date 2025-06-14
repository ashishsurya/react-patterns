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

	const [seriesVisibilityIndex, setSeriesVisibilityIndex] = useState(() =>
		series?.map(
			(s) => !!(s?.silent === null || s?.silent === undefined || !!s?.silent),
		),
	);
	console.log({ seriesVisibilityIndex });

	const colors = getColorPalletteUsed({ chartRef: props.chartRef });

	return (
		<div className="flex gap-2  w-full  overflow-auto">
			{series.map((s, index) => {
				console.log(s.color);

				return (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						data-series-visible={seriesVisibilityIndex[index]}
						className="flex items-center cursor-pointer group gap-1 hover:data-[series-visible=true]:bg-blue-200 px-1 data-[series-visible=false]:opacity-50"
						key={s.name as string}
						onMouseEnter={() => {
							const chart = echarts.getInstanceByDom(
								props.chartRef.current as HTMLElement,
							);

							chart?.dispatchAction({
								type: "highlight",
								seriesIndex: index,
							});
						}}
						onMouseLeave={() => {
							const chart = echarts.getInstanceByDom(
								props.chartRef.current as HTMLElement,
							);

							chart?.dispatchAction({
								type: "downplay",
								seriesIndex: index,
							});
						}}
						onClick={() => {
							const chart = echarts.getInstanceByDom(
								props.chartRef.current as HTMLElement,
							);

							chart?.dispatchAction({
								type: "legendToggleSelect",
								// legend name
								name: s.name,
							});
						}}
					>
						<div
							className="w-3 h-3 border-white  relative"
							style={{ backgroundColor: colors[index] }}
						>
							<div className="hidden group-hover:inline-flex absolute top-0 left-0 w-full h-full bg-black/50 justify-center items-center text-white">
								x
							</div>
						</div>
						<div className="whitespace-nowrap">{s.name as string}</div>
					</div>
				);
			})}
		</div>
	);
};
