<template>
    <div class="forge-badge" :class="['forge-status-'+status,pendingStateChange?'opacity-40':'']">
        <ExclamationCircleIcon v-if="status === 'error'" class="w-4 h-4" />
        <PlayIcon v-if="status === 'running'" class="w-4 h-4" />
        <StopIcon v-if="status === 'stopped'" class="w-4 h-4" />
        <DotsCircleHorizontalIcon v-if="status === 'starting'" class="w-4 h-4" />
        <SupportIcon v-if="status === 'safe'" class="w-4 h-4" />
        <span class="ml-1">{{status}}</span>
    </div>
</template>

<script>
import { ExclamationCircleIcon, PlayIcon, StopIcon, DotsCircleHorizontalIcon, SupportIcon } from '@heroicons/vue/outline'

export default {
    name: "ProjectStatusBadge",
    props: ['status','pendingStateChange'],
    components: {
        ExclamationCircleIcon, PlayIcon, StopIcon, DotsCircleHorizontalIcon, SupportIcon
    }
}
</script>
