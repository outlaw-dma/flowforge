<template>
    <div>
        <FormHeading>
            Pending Invitations
        </FormHeading>
        <form class="space-y-6">
            <div class="text-right"></div>
            <ItemTable :items="invitations" :columns="inviteColumns" />
        </form>
    </div>
</template>

<script>
import teamApi from '@/api/team'
import { markRaw } from "vue"
import FormHeading from '@/components/FormHeading'
import ItemTable from '@/components/tables/ItemTable'
import InviteUserCell from '@/components/tables/cells/InviteUserCell'
import { TrashIcon } from '@heroicons/vue/outline'
import { useRoute, useRouter } from 'vue-router';
import { Roles } from '@core/lib/roles'

const MemberInviteRemoveButton = {
    template: `<button type="button" class="forge-button-inline px-2 py-2" @click="removeInvite"><TrashIcon class="w-5" /></button>`,
    props: ['id','team','onremove'],
    components: {
        TrashIcon
    },
    methods: {
        async removeInvite() {
            await this.onremove(this.team.id, this.id)
        }
    }
}

export default {
    name: 'MemberInviteTable',
    props:[ "team", "teamMembership" ],
    data() {
        return {
            invitations: [],
            inviteColumns: [
                {name: 'User', class:['flex-grow'], component: { is: markRaw(InviteUserCell) }, property: 'invitee'},
                {name: 'Expires In',class: ['w-40'], property: 'expires'},
                {name: '', class: ['w-16'], component: {is: markRaw(MemberInviteRemoveButton) } }
            ]
        }
    },
    watch: {
        teamMembership: 'fetchData',
        team: 'fetchData'
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async removeInvite(teamId, inviteId) {
            await teamApi.removeTeamInvitation(teamId, inviteId)
            await this.fetchData();
        },
        async fetchData () {
            if (this.team && this.teamMembership) {
                if (this.teamMembership.role !== Roles.Owner) {
                    useRouter().push({ path: `/team/${useRoute().params.id}/members/general` })
                    return
                }
                const invitations = await teamApi.getTeamInvitations(this.team.id)
                this.invitations = invitations.invitations.map(invite => {
                    invite.onremove = (teamId, inviteId) => { this.removeInvite(teamId,inviteId) }
                    return invite;
                })

                this.invitationCount = invitations.count;
            }
        }
    },
    components: {
        FormHeading,
        ItemTable
    }
}

</script>
