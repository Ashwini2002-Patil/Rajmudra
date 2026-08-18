import { Routes, Route } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout"
import AdminLayout from "../components/layout/AdminLayout"
import Home from "../pages/Home"
import About from "../pages/About"
import Products from "../pages/Products"
import ProductDetail from "../pages/ProductDetail"
import Gallery from "../pages/Gallery"
import Certifications from "../pages/Certifications"
import Blog from "../pages/Blog"
import BlogDetail from "../pages/BlogDetail"
import Contact from "../pages/Contact"
import OEMInquiry from "../pages/OEMInquiry"
import ExportInquiry from "../pages/ExportInquiry"
import SampleRequest from "../pages/SampleRequest"
import NotFound from "../pages/NotFound"
import AdminLogin from "../pages/admin/AdminLogin"
import AdminRegister from "../pages/admin/AdminRegister"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminProducts from "../pages/admin/AdminProducts"
import AdminBlogs from "../pages/admin/AdminBlogs"
import AdminGallery from "../pages/admin/AdminGallery"
import AdminCertifications from "../pages/admin/AdminCertifications"
import AdminInquiries from "../pages/admin/AdminInquiries"
import AdminProcessSteps from "../pages/admin/AdminProcessSteps"
import AdminShowcaseProducts from "../pages/admin/AdminShowcaseProducts"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="blogs" element={<AdminBlogs />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="certifications" element={<AdminCertifications />} />
        <Route path="process-steps" element={<AdminProcessSteps />} />
        <Route path="showcase-products" element={<AdminShowcaseProducts />} />
        <Route path="inquiries" element={<AdminInquiries />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/oem-inquiry" element={<OEMInquiry />} />
        <Route path="/export-inquiry" element={<ExportInquiry />} />
        <Route path="/sample-request" element={<SampleRequest />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
