import { configureStore } from "@reduxjs/toolkit";
import userReduce from "./usersSlice";
import productReduder from "./productsSlice";

const store = configureStore({
  reducer: {
    users: userReduce,
    products: productReduder,
  },
});

export default store;
