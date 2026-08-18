import AppRoutes from "./routes/AppRoutes"
import ScrollToTop from "./components/common/ScrollToTop"
import CustomCursor from "./components/common/CustomCursor"

const App = () => {
  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <AppRoutes />
    </>
  )
}

export default App
