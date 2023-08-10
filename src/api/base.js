import http from '../utils/http';

const login = (data)=>{
    return http.POST('/api/login',data);
}
const getFunctions = ()=>{
    return http.GET('SYS001/Getfunctions');
}
const getNoticeMessage = ()=>{
    return http.GET('SYS001/GetNoticeMessage');
}

export { login, getFunctions, getNoticeMessage };