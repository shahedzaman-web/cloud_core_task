import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import config from '../../utils/constants';

// Custom error type
export interface ApiError {
    status: number;
    data: {
        status?: boolean;
        message?: string;
        errors?: Record<string, string[]>;
    };
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: config.BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = (state as { auth?: { token?: string } }).auth?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: builder => ({
        getIndustries: builder.query<any[], void>({
            query: () => '/api/industry/get',
            transformResponse: (res: any) => res.data,
        }),
        getJobs: builder.query<any[], void>({
            query: () => '/api/job/get',
            transformResponse: (res: any) => res.data,
        }),
        getCompanies: builder.query<any[], void>({
            query: () => '/api/company/get',
            transformResponse: (res: any) => res.data,
        }),
        login: builder.mutation({
            query: (body) => ({
                url: '/api/job_seeker/login',
                method: 'POST',
                body,
            }),
            transformResponse: (response: any) => {
                console.log({response})
                return response;
            },
        }),
        register: builder.mutation({
            query: (body) => ({
                url: '/api/job_seeker/register',
                method: 'POST',
                body,
            }),
            transformResponse: (response: any) => {
                return response;
            },
        }),
        verifyOtp: builder.mutation({
            query: (body) => ({
                url: '/api/job_seeker/phone_verify',
                method: 'POST',
                body,
            }),
            transformResponse: (response: any) => {
                return response;
            },
        }),
    }),
});

// Helper function to extract error message from API response
export const getErrorMessage = (error: any): string => {
    // Check if error has data property (RTK Query error structure)
    if (error?.data) {
        // Check for message in data
        if (error.data.message) {
            return error.data.message;
        }
        // Check for errors object (validation errors)
        if (error.data.errors) {
            const firstErrorKey = Object.keys(error.data.errors)[0];
            if (firstErrorKey && error.data.errors[firstErrorKey][0]) {
                return error.data.errors[firstErrorKey][0];
            }
        }
        // Check for status false with message
        if (error.data.status === false && error.data.message) {
            return error.data.message;
        }
    }
    
    // Check for network error
    if (error?.status === 'FETCH_ERROR') {
        return 'Network error. Please check your connection.';
    }
    
    // Check for timeout
    if (error?.status === 'TIMEOUT_ERROR') {
        return 'Request timeout. Please try again.';
    }
    
    // Fallback error message
    return 'An error occurred. Please try again.';
};

export const {
    useGetIndustriesQuery,
    useGetJobsQuery,
    useGetCompaniesQuery,
    useLoginMutation,
    useRegisterMutation,
    useVerifyOtpMutation,
} = apiSlice;