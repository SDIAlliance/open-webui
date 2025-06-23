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
</script>

<Tooltip
	content={`
    <div class=\"font-semibold mb-2\">${header}</div>
    <div class=\"mb-2\">${subheader}</div>
    <div class=\"space-y-1\">
      <div>Energy Use: ${data?.energyUse ?? '...'} kWh</div>
      <div>Water Use: ${data?.waterUse ?? '...'} m³</div>
      <div>Resource Use: ${data?.resourceUse ?? '...'} kg SB-eq</div>
      <div>Operational CO2: ${data?.co2Operational ?? '...'} kg CO2-eq</div>
      <div>Embedded CO2: ${data?.co2Embedded ?? '...'} kg CO2-eq</div>
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
