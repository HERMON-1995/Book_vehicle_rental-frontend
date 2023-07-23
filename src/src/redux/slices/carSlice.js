import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const BASE_URL = 'http://localhost:3001/api/v1';

export const fetchCars = createAsyncThunk(
  'cars/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars`);
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

export const postVehicle = createAsyncThunk(
  'cars/postVehicle',
  async (vehicleData) => {
    try {
      const response = await fetch(`${BASE_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const deleteVehicle = createAsyncThunk(
  'cars/deleteVehicle',
  async (userId) => {
    try {
      await fetch(`${BASE_URL}/cars/${userId}`, {
        method: 'DELETE',
      });
      return userId;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const reserveVehicle = createAsyncThunk(
  'cars/reserveVehicle',
  async (reservationData) => {
    try {
      const response = await fetch(`${BASE_URL}/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const fetchReservations = createAsyncThunk(
  'cars/fetchReservations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/reservations`);
      return response.data;
    } catch (err) {
      return rejectWithValue(await err.response.data);
    }
  },
);

export const initializeCars = createAsyncThunk(
  'cars/initializeCars',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars`);
      const { data } = response;
      dispatch(fetchCars.fulfilled(data));
    } catch (err) {
      throw new Error(err.message);
    }
  },
);

const initialState = {
  cars: [],
  car: {},
  reservations: [], // New field for reservations
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
      state.car = state.cars.reduce(
        (acc, car) => ({
          ...acc,
          [car.user_id]: {
            car_id: car.id,
            name: car.name,
            description: car.description,
            photo: car.photo,
            price: car.price,
            user: car.user,
            dateAdded: car.date_added,
          },
        }),
        {},
      );
    },
    [postVehicle.fulfilled]: (state, action) => {
      state.cars.push(action.payload);
      const {
        userId, name, description, photo, price, user, dateAdded,
      } = action.payload;
      state.car[userId] = {
        name,
        description,
        photo,
        price,
        user,
        dateAdded,
      };
    },
    [deleteVehicle.fulfilled]: (state, action) => {
      state.cars = state.cars.filter((car) => car.user_id !== action.payload);
      delete state.car[action.payload];
    },
    [fetchReservations.fulfilled]: (state, action) => {
      state.reservations = action.payload;
    },
  },
});

export default carSlice.reducer;