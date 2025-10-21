import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import { CartProvider } from "./context/CartProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { ItemProvider } from "./context/ItemProvider";
import RootLayout from "./layout/RootLayout";
import MenusPage from "./pages/MenusPage";
import { CategoryProvider } from "./context/CategoryProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CategoryProvider>
          <ItemProvider>
            <CartProvider>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route path="/" element={<Main />} />
                  <Route path="/menu" element={<MenusPage />} />
                </Route>
              </Routes>
            </CartProvider>
          </ItemProvider>
        </CategoryProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
