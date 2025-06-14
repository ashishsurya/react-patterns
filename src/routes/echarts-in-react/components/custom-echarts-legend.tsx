import * as echarts from "echarts";
import {
	getAllSeriesInTheEcharts,
	getColorPalletteUsed,
} from "../utils/get-echarts-series";
import { useState } from "react";
import { MultiSelect } from "@mantine/core";

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

	return (
		<MultiSelect
			className="border-none"
			multiple
			size="xs"
			placeholder="Select series"
			value={selectedSeries}
			data={series?.map((s) => ({
				value: s.name as string,
				label: s.name as string,
			}))}
			styles={{
				input: {
					border: "none",
				},
			}}
			onChange={(value) => {
				setSelectedSeries(value);
			}}
			maxLength={4}
			renderOption={(item) => {
				const indexFromSeries = series?.findIndex(
					(s) => s.name === item.option.value,
				);
				const color = colors[indexFromSeries];
				return (
					<div
						className="flex gap-1 items-center w-full"
						onMouseEnter={() => {
							console.log({ indexFromSeries });
							const chart = echarts.getInstanceByDom(
								props.chartRef.current as HTMLElement,
							);

							chart?.dispatchAction({
								type: "highlight",
								seriesIndex: indexFromSeries,
							});
						}}
						onMouseLeave={() => {
							console.log({ indexFromSeries });
							const chart = echarts.getInstanceByDom(
								props.chartRef.current as HTMLElement,
							);

							chart?.dispatchAction({
								type: "downplay",
								seriesIndex: indexFromSeries,
							});
						}}
					>
						<span className={`invisible ${item.checked && "visible"}`}>✅</span>
						<div
							className="w-2 h-2 rounded-full"
							style={{ backgroundColor: color }}
						/>
						<div>{item.option.label}</div>
					</div>
				);
			}}
		/>
	);
};
