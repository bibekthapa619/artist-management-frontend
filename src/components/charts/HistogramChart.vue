<template>
  <h2 v-if="title" class="mb-4 text-lg font-semibold">{{ title }}</h2>

  <div class="flex items-start">
    <!-- SVG Chart (Histogram) -->
    <svg ref="svg"></svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import * as d3 from "d3";

const {
  data,
  title,
  height = 200,
  width = 400,
} = defineProps<{
  data: Record<string, number>;
  title?: string;
  height?: number;
  width?: number;
}>();

const svg = ref<SVGSVGElement | null>(null);

const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Define a color scale for bars and labels
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

const getColor = (key: string): string => {
  return colorScale(key);
};

const drawHistogram = (data: Record<string, number>) => {
  if (!svg.value) return;

  const svgElement = d3.select(svg.value);
  svgElement.selectAll("*").remove(); // Clear previous chart

  const genres = Object.keys(data);
  const counts = Object.values(data);

  // Set up the x-axis scale (categories)
  const x = d3.scaleBand().domain(genres).range([0, chartWidth]).padding(0.1);

  // Set up the y-axis scale (values)
  const maxCount = d3.max(counts) || 0;
  let tickStep = 1;

  // Dynamically adjust tick step based on the max value
  if (maxCount > 1000) {
    tickStep = 200;
  } else if (maxCount > 500) {
    tickStep = 100;
  } else if (maxCount > 100) {
    tickStep = 50;
  } else if (maxCount > 50) {
    tickStep = 10;
  } else if (maxCount > 10) {
    tickStep = 5;
  } else {
    tickStep = 1;
  }

  const y = d3
    .scaleLinear()
    .domain([0, Math.ceil(maxCount / tickStep) * tickStep]) // Round up to the nearest tick step
    .nice() // Round to a "nice" number
    .range([chartHeight, 0]);

  const chart = svgElement
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Draw the bars with colors from the color scale
  chart
    .append("g")
    .selectAll("rect")
    .data(genres)
    .enter()
    .append("rect")
    .attr("x", (d) => x(d)!)
    .attr("y", (d) => y(data[d]))
    .attr("width", x.bandwidth())
    .attr("height", (d) => chartHeight - y(data[d]))
    .attr("fill", (d) => getColor(d));

  // Add x-axis
  chart
    .append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(d3.axisBottom(x));

  // Add y-axis with dynamic tick step
  chart.append("g").call(
    d3
      .axisLeft(y)
      .ticks(Math.ceil(maxCount / tickStep)) // Set the number of ticks based on maxCount
      .tickFormat(d3.format("d")) // Ensure integer ticks only
  );
};

// Watch for data changes and re-render the chart
watch(
  () => data,
  (newData) => {
    drawHistogram(newData);
  }
);

// Render the chart when the component is mounted
onMounted(() => {
  drawHistogram(data);
});
</script>

<style scoped>
svg {
  font-family: Arial, sans-serif;
}

div {
  font-family: Arial, sans-serif;
}
</style>
