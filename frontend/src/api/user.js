import client from './client';
import daysSince from '@/utils/daysSince';
import elapsedTime from '@/utils/elapsedTime';

const login = (username, password, remember) => {
    return client.post('/account/login',{
        username,
        password,
        remember
    }).then(res => res.data)
}
const logout = () => {
    return client.post('/account/logout').then(res => res.data)
}

const registerUser = async(options) => {
    return client.post('/account/register',options).then(res => res.data)
}

const getUser = () => {
    return client.get('/api/v1/user/').then(res => res.data);
}

const changePassword = (old_password, password) => {
    return client.put('/api/v1/user/change_password',{
        old_password,
        password
    }).then(res => res.data)
}

const updateUser = async(options) => {
    return client.put(`/api/v1/user`, options).then(res => {
        return res.data
    })
}
const getTeamInvitations = async () => {
    return client.get('/api/v1/user/invitations').then(res => {
        res.data.invitations = res.data.invitations.map(r => {
            r.createdSince = daysSince(r.createdAt)
            r.expires = elapsedTime((new Date(r.expiresAt)).getTime() - Date.now())
            return r;
        });
        return res.data
    });
}
const acceptTeamInvitation = async (invitationId) => {
    return client.patch('/api/v1/user/invitations/'+invitationId).then(res => {
        return res.data
    });
}

const rejectTeamInvitation = async (invitationId) => {
    return client.delete('/api/v1/user/invitations/'+invitationId).then(res => {
        return res.data
    });
}
const triggerVerification = async() => {
    return client.post('/account/verify').then(res => {
        return res.data
    });
}
export default {
    registerUser,
    getUser,
    login,
    logout,
    changePassword,
    updateUser,
    getTeamInvitations,
    acceptTeamInvitation,
    rejectTeamInvitation,
    triggerVerification
}
