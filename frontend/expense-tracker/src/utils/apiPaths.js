export const BASE_URL = "https://localhost:8000";


// utils/apiPath.js

export const API_PATHS = {
    AUTH:{
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getuser"
    },
    DASHBOARD:{
        GET_DATA:"/api/dashboard"
    },
    INCOME:{
        ADD_INCOME:"/api/income/add",
        GET_ALL_INCOME: "/api/income/get",
        DELETE_INCOME: (incomeId) => `/api/income/${
            incomeId
        }`,
        
    }
}