<script lang="ts">
	import FootprintIcon from '../icons/FootprintIcon.svelte';
	import Tooltip from './Tooltip.svelte';
	import type { FootprintData } from '$lib/apis/chats';

	export let data: FootprintData | null = null;
	export let header: string = 'Environmental Footprint';
	export let subheader: string = 'Usage for this query:';
	export let loading: boolean = false;
	export let iconClass: string = 'size-4';
	export let iconCircleColor: string = 'transparent';

	function openFootprintInfo() {
		window.open('https://sdia.io', '_blank');
	}

	// Helper to format small numbers with appropriate units
	function formatValue(value: string | undefined, unit: string): string {
		if (!value) return '...';
		const num = parseFloat(value);
		if (isNaN(num)) return '...';

		// For very small values, use scientific notation or smaller units
		if (num < 0.001) {
			if (unit === 'kWh') {
				// Convert to Wh for small values
				return `${(num * 1000).toFixed(4)} Wh`;
			} else if (unit === 'kg CO2-eq') {
				// Convert to grams for small values
				return `${(num * 1000).toFixed(4)} g CO2-eq`;
			} else if (num === 0) {
				return `0 ${unit}`;
			}
			// Use scientific notation for other small values
			return `${num.toExponential(2)} ${unit}`;
		}

		// For normal values, show with appropriate precision
		return `${num.toFixed(6)} ${unit}`;
	}
</script>

<Tooltip
	content={`
    <div class=\"font-semibold mb-2\">${header}</div>
    <div class=\"mb-2\">${subheader}</div>
    <div class=\"space-y-1\">
      <div>Energy Use: ${formatValue(data?.energyUse, 'kWh')}</div>
      <div>Water Use: ${formatValue(data?.waterUse, 'm³')}</div>
      <div>Resource Use: ${formatValue(data?.resourceUse, 'kg SB-eq')}</div>
      <div>Operational CO2: ${formatValue(data?.co2Operational, 'kg CO2-eq')}</div>
      <div>Embedded CO2: ${formatValue(data?.co2Embedded, 'kg CO2-eq')}</div>
    </div>
    <div class=\"mt-2 border-t pt-2 text-sm text-gray-500\">
      Click the icon to see how this is calculated
    </div>
  `}
	placement="bottom"
>
	<button
		type="button"
		aria-label="Environmental Footprint"
		class="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition text-gray-500 dark:text-gray-400"
		on:click={openFootprintInfo}
		disabled={loading}
	>
		<FootprintIcon className={iconClass} circleColor={iconCircleColor} />
	</button>
</Tooltip>
