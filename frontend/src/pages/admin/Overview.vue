<template>
    <div class="sm:ml-32 max-w-2xl grid grid-cols-3 gap-4 text-gray-700">
        <div class="border rounded px-4 py-2 text-center">
            <router-link to="/admin/users/general">
                <div class="text-xl">{{stats.userCount}}</div>
                <div>Users</div>
            </router-link>
            <div class="w-full grid grid-cols-2 pt-1 mt-2 border-t">
                <div>{{stats.adminCount}} {{ $filters.pluralize(stats.adminCount,'admin')}}</div>
                <div><router-link to="/admin/users/invitations">{{stats.inviteCount}} {{ $filters.pluralize(stats.inviteCount,'invite')}}</router-link></div>
            </div>
        </div>
        <div class="border rounded p-4 text-center">
            <router-link to="/admin/teams">
                <div class="text-xl">{{stats.teamCount}}</div>
                <div>{{ $filters.pluralize(stats.teamCount,'Team')}}</div>
            </router-link>
        </div>
        <div class="border rounded p-4 text-center">
            <div class="text-xl">{{stats.projectCount}}</div>
            <div>{{ $filters.pluralize(stats.projectCount,'Project')}}</div>
        </div>

        <div class="border rounded p-4 col-span-3">
            <div class="text-xl mb-1 border-b">License</div>
            <table v-if="license">
                <tr><td class="font-medium p-2 pr-4 align-top">Type</td><td class="p-2">FlowForge Enterprise Edition</td></tr>
                <tr><td class="font-medium p-2 pr-4 align-top">Organisation</td><td class="p-2">{{license.organisation}}</td></tr>
                <tr><td class="font-medium p-2 pr-4 align-top">Tier</td><td class="p-2">{{license.tier}}</td></tr>
                <tr><td class="font-medium p-2 pr-4 align-top">Expires</td><td class="p-2">{{license.expires}}<br><span class="text-xs">{{license.expiresAt}}</span></td></tr>
            </table>
            <div v-else>
                <table>
                    <tr><td class="font-medium p-2 pr-4 align-top">Type</td><td class="p-2">FlowForge Community Edition</td></tr>
                </table>
            </div>
        </div>
    </div>


</template>

<script>
import FormRow from '@/components/FormRow'
import FormHeading from '@/components/FormHeading'
import adminApi from '@/api/admin'
import Breadcrumbs from '@/mixins/Breadcrumbs';

export default {
    name: 'AdminSettingsGeneral',
    mixins: [ Breadcrumbs ],
    components: {
        FormRow,
        FormHeading
    },
    data: function() {
        return {
            license: {},
            stats: {},
        }
    },
    async mounted() {
        this.stats = await adminApi.getStats();
        this.license = await adminApi.getLicenseDetails();
    },
    created() {
        this.setBreadcrumbs([
            {label:"Admin", to:{name:"Admin Settings"}},
            {label:"Overview"}
        ]);
    }
}
</script>
