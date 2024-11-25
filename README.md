# Documentación: Sidebar y productsSlice

## Descripción General

Este proyecto implementa una funcionalidad de ordenamiento, filtrado y búsqueda de productos utilizando React y Redux. La interfaz de usuario está diseñada con un componente llamado `Sidebar`, que interactúa con el estado global gestionado por `productsSlice` en Redux Toolkit. Esta solución permite a los usuarios explorar productos de manera eficiente con opciones dinámicas.

## Archivos Principales

### `Sidebar.jsx`

Este componente proporciona la interfaz para que los usuarios:

- Ordenen los productos por precio.
- Filtren productos por categorías.
- Busquen productos por nombre o descripción.

#### Estructura del Componente

- **Imports:** Se importan componentes necesarios de React, Redux y estilos CSS.
- **Estado Local:** Utiliza un estado local `searchText` para manejar el valor del input de búsqueda.
- **Obtención de Categorías:** Las categorías se derivan dinámicamente del estado global `allProducts` eliminando duplicados.

#### Funcionalidades

1. **Ordenamiento:**

   - Se selecciona un criterio (`asc` o `desc`) y se despacha la acción `sortProducts`.
   - Actualiza la lista de productos ordenados en el estado global.

2. **Filtrado:**

   - Se seleccionan categorías de un menú desplegable, y se despacha la acción `filterByCategory`.
   - Permite filtrar por múltiples categorías acumulativas.

3. **Búsqueda:**

   - Los usuarios ingresan texto en el campo de búsqueda, lo que despacha la acción `searchProducts`.
   - Filtra productos basados en coincidencias de título o descripción.

4. **Reiniciar Filtros:**
   - Un botón permite reiniciar la lista a su estado inicial mediante la acción `updateProductsCopy`.

#### Código Relevante

```javascript
<select onChange={handleSort}>
  <option value="asc">Menor a Mayor</option>
  <option value="desc">Mayor a Menor</option>
</select>
<select onChange={handleFilter}>
  {categories.map((category) => (
    <option key={category} value={category}>{category}</option>
  ))}
</select>
<input
  onChange={handleSearch}
  type="text"
  value={searchText}
  placeholder="Search..."
/>
```

### `productsSlice.js`

Este archivo contiene la lógica de manejo del estado global para productos, implementada con Redux Toolkit.

#### Estado Inicial

```javascript
initialState: {
  allProducts: [],
  productsCopy: [],
},
```

- `allProducts`: Contiene todos los productos.
- `productsCopy`: Contiene los productos visibles en la interfaz (modificables por ordenamiento, filtrado o búsqueda).

#### Reducers y Acciones

1. **`setAllProducts`**

   - Inicializa `allProducts` y `productsCopy` con una lista de productos.

2. **`updateProductsCopy`**

   - Actualiza `productsCopy` directamente con una nueva lista de productos.

3. **`sortProducts`**

   - Ordena `productsCopy` por precio, en orden ascendente (`asc`) o descendente (`desc`).

   ```javascript
   const sortedProducts = [...state.productsCopy].sort((a, b) => {
     return action.payload === "asc" ? a.price - b.price : b.price - a.price;
   });
   state.productsCopy = sortedProducts;
   ```

4. **`filterByCategory`**

   - Filtra los productos basándose en las categorías seleccionadas.

   ```javascript
   const filteredByCategory = state.allProducts.filter((produc) => {
     return action.payload.includes(produc.category);
   });
   state.productsCopy =
     action.payload.length > 0 ? filteredByCategory : state.allProducts;
   ```

5. **`searchProducts`**
   - Filtra productos según coincidencias de texto en el título o descripción.
   ```javascript
   const searchedProducts = state.allProducts.filter((produc) => {
     return (
       produc.title.toLowerCase().includes(action.payload.toLowerCase()) ||
       produc.description.toLowerCase().includes(action.payload.toLowerCase())
     );
   });
   state.productsCopy = searchedProducts ? searchedProducts : state.allProducts;
   ```

#### Exportaciones

Exporta las acciones y el reducer para ser utilizadas en el componente `Sidebar` y en la configuración del store:

```javascript
export const {
  setAllProducts,
  updateProductsCopy,
  sortProducts,
  filterByCategory,
  searchProducts,
} = productsSlice.actions;
export default productsSlice.reducer;
```

## Uso

1. Asegúrate de que el estado de Redux esté configurado correctamente en tu aplicación.
2. Importa y usa el componente `Sidebar` dentro de tu interfaz principal.
3. Pasa los productos iniciales a `setAllProducts` al cargar la aplicación.

## Ejemplo de Integración

```javascript
import { Provider } from "react-redux";
import store from "./redux/store";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );
}

export default App;

Made by Prof. Martin with a lot of 💖 and ☕
```
