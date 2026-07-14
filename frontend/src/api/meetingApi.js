import axios from 'axios';

export const createMeeting = async (title) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/meeting/create`,{title},{withCredentials:true});
    return response.data;
}

export const joinMeeting = async (meetingId) => {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/meeting/join`,{meetingId},{withCredentials:true});
    return response.data;
}

export const fetchMeeting = async (meetingId) => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/meeting/${meetingId}`,{withCredentials:true});
    return response.data;
}


export const endMeeting = async (meetingId) => {
    const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/meeting/${meetingId}/end`,{},{withCredentials:true});
    return response.data;
}
