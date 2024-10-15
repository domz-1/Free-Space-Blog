    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import { auth } from './../../firestoreConfig';
    import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";




    export const fetchUser = createAsyncThunk('user/fetchUser', async ({ email, password }, thunkAPI) => {
        try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem('userLoggedIn', true);
        localStorage.setItem('userData', JSON.stringify({ uid: user.uid, email: user.email, displayName: user.displayName }));
        thunkAPI.dispatch(setUser({ uid: user.uid, email: user.email, displayName: user.displayName }));
        return { uid: user.uid, email: user.email, displayName: user.displayName };
        } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    });
    // Create new user
    export const createUser = createAsyncThunk('user/createUser', async ({ email, password }, thunkAPI) => {
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem('userLoggedIn', true);
            localStorage.setItem('userData', JSON.stringify({ uid: newUser.user.uid, email: newUser.user.email, displayName: newUser.user.displayName }));
            thunkAPI.dispatch(setUser({ uid: newUser.user.uid, email: newUser.user.email, displayName: newUser.user.displayName }));
            return { uid: newUser.user.uid, email: newUser.user.email, displayName: newUser.user.displayName };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });

    // Logout user
    export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
        try {
            await signOut(auth);
            localStorage.removeItem('userLoggedIn')
            localStorage.removeItem('userData');
            thunkAPI.dispatch(setUser(null));
                    return true;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    });
    const initialState = {

        user: null,
        uid: null,
        isLoggedIn: false,
        loading: false,
        error: null
    };

    const userSlice = createSlice({
        name: 'user',
        initialState ,
        reducers: {
            setUser: (state, action) => {
                state.user = action.payload;
                state.uid = action.payload.uid;
                state.isLoggedIn = true;
            },
        },
        extraReducers: (builder) => {
            builder
                // Handle login
                .addCase(fetchUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchUser.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.uid = action.payload.uid;
                    state.isLoggedIn = true;
                    state.loading = false;
                })
                .addCase(fetchUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                // Handle user creation
                .addCase(createUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(createUser.fulfilled, (state, action) => {
                    state.user = action.payload;
                    state.loading = false;
                })
                .addCase(createUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                // Handle logout
                .addCase(logout.fulfilled, (state) => {
                    state.user = null;
                    state.uid = null;
                    state.isLoggedIn = false;
                    state.loading = false;
                })
                .addCase(logout.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        }
    });


    export const { setUser } = userSlice.actions;

    export const userReducer = userSlice.reducer;
