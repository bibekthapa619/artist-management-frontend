<template>
  <div class="flex flex-row items-start">
    <svg ref="svg" :width="height" :height="width" class="mr-4"></svg>
    <div class="flex flex-col justify-center">
      <h2 v-if="title" class="mb-4 text-lg font-semibold">{{ title }}</h2>
      <div class="space-y-1">
        <div v-for="(value, key) in data" :key="key" class="flex items-center">
          <div
            class="w-4 h-4 mr-2"
            :style="{
              backgroundColor: getColor(key),
              border: '1px solid white',
            }"
          ></div>
          <span class="text-sm">{{ key }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import * as d3 from "d3";

const { data, title, height, width } = defineProps<{
  data: Record<string, number>;
  title?: string;
  height: number;
  width: number;
}>();

const svg = ref<SVGSVGElement | null>(null);
const tooltip = ref<d3.Selection<HTMLElement, unknown, null, undefined> | null>(
  null
);

const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const getColor = (key: string): string => {
  return colorScale(key);
};

onMounted(() => {
  if (svg.value) {
    drawChart(data);
  }
});

watch(
  () => data,
  (newData) => {
    console.log(data);
    if (svg.value) {
      drawChart(newData);
    }
  }
);

interface PieData {
  key: string;
  value: number;
}

const drawChart = (data: Record<string, number>) => {
  const radius = Math.min(width, height) / 2;

  const pie = d3.pie<PieData>().value((d) => d.value);
  const arc = d3
    .arc<d3.PieArcDatum<PieData>>()
    .innerRadius(0)
    .outerRadius(radius);

  const g = d3
    .select(svg.value)
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pieData = pie(
    Object.entries(data).map(([key, value]) => ({ key, value }))
  );

  tooltip.value = d3
    .select("body")
    .append("div")
    .attr(
      "class",
      "tooltip absolute bg-white border border-gray-300 p-2 rounded-md hidden"
    )
    .style("opacity", 0);

  g.selectAll<SVGPathElement, d3.PieArcDatum<PieData>>("path")
    .data(pieData)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d) => getColor(d.data.key))
    .attr("stroke", "white")
    .attr("stroke-width", "2px")
    .on("mouseover", function (event, d) {
      tooltip.value!.transition().duration(200).style("opacity", 0.9);
      tooltip
        .value!.html(`${d.data.key}: ${d.data.value}`)
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY - 28 + "px")
        .classed("hidden", false);
    })
    .on("mouseout", function () {
      tooltip
        .value!.transition()
        .duration(500)
        .style("opacity", 0)
        .classed("hidden", true);
    });
};
</script>

<style scoped>
svg {
  font-family: Arial, sans-serif;
}

.tooltip {
  pointer-events: none;
}
</style>
