import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFirestore, collection, addDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

const db = getFirestore();

export const postsApi = createApi({
reducerPath: 'postsApi',
baseQuery: fetchBaseQuery({
baseUrl: '',
}),
tagTypes: ['Post'],
endpoints: (builder) => ({
addPost: builder.mutation({
    query: (post) => ({
    url: '',
    method: 'POST',
    body: post,
    }),
    async queryFn(post) {
    const docRef = await addDoc(collection(db, "posts"), post);
    return { id: docRef.id, ...post };
    },
    invalidatesTags: ['Post'],
}),
showPost: builder.query({
    query: (id) => ({
    url: '',
    method: 'GET',
    params: { id },
    }),
    async queryFn(id) {
    const docRef = await getDoc(doc(db, "posts", id));
    return docRef.data();
    },
    providesTags: ['Post'],
}),
showPosts: builder.query({
    query: () => ({
    url: '',
    method: 'GET',
    }),
    async queryFn() {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = [];
    querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
    },
    providesTags: ['Post'],
}),
deletePost: builder.mutation({
    query: (id) => ({
    url: '',
    method: 'DELETE',
    params: { id },
    }),
    async queryFn(id) {
    await deleteDoc(doc(db, "posts", id));
    return { id };
    },
    invalidatesTags: ['Post'],
}),
}),
});

export const { useAddPostMutation, useShowPostQuery, useShowPostsQuery, useDeletePostMutation } = postsApi;