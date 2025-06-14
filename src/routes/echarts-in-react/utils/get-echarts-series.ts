import * as echarts from "echarts";

interface GetAllSeriesInTheEchartsOptions {
	chartRef: React.RefObject<HTMLDivElement | null>;
}

export const getAllSeriesInTheEcharts = (
	options: GetAllSeriesInTheEchartsOptions,
) => {
	const chart = echarts.getInstanceByDom(
		options.chartRef.current as HTMLElement,
	);

	return chart?.getOption().series;
};

export const getColorPalletteUsed = (
	options: GetAllSeriesInTheEchartsOptions,
) => {
	const chart = echarts.getInstanceByDom(
		options.chartRef.current as HTMLElement,
	);

	return chart?.getOption().color as string[];
};
