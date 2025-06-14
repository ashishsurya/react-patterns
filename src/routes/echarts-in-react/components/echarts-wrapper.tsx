import { useEffect, useRef, useState, type ComponentRef } from "react";
import * as echarts from "echarts";
import { CustomEchartsLegend } from "./custom-echarts-legend";

export interface EchartsWrapperProps {
	options: echarts.EChartsCoreOption;
}

export const EchartsWrapper = (props: EchartsWrapperProps) => {
	const [isChartReady, setIsChartReady] = useState(false);
	const echartsRef = useRef<ComponentRef<"div">>(null);

	useEffect(() => {
		const chart = echarts.init(echartsRef.current, null, {
			renderer: "svg",
		});

		chart.on("legendselectchanged", (...args) => {
			console.log("legendselectchanged", args);
		});

		setIsChartReady(true);

		// setting the default font-family of chart to "var(--font-sans)"
		chart.setOption({
			textStyle: {
				fontFamily: "var(--font-sans)",
				fontSize: 10,
			},
			grid: {
				top: 40,
				bottom: 60,
				left: 40,
				right: 20,
			},
		});

		const resizeObserver = new ResizeObserver(() => {
			chart.resize();
		});
		resizeObserver.observe(echartsRef.current as HTMLElement);

		return () => {
			chart.dispose();
			if (echartsRef.current) {
				resizeObserver.unobserve(echartsRef.current);
			}
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		const chart = echarts.getInstanceByDom(echartsRef.current as HTMLElement);
		if (chart) {
			chart.setOption(props.options);
		}
	}, [props.options]);

	return (
		<div className="w-full h-full border p-2 relative">
			<div ref={echartsRef} className="w-full h-full" />
			{isChartReady && (
				<div className="absolute bottom-4 left-4 ">
					<CustomEchartsLegend chartRef={echartsRef} />
				</div>
			)}
		</div>
	);
};
