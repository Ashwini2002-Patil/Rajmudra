import Container from "../components/common/Container"
import Button from "../components/common/Button"

const NotFound = () => (
  <Container className="section-y flex flex-col items-center py-32 text-center">
    <p className="text-7xl font-bold text-brand-200">404</p>
    <h1 className="mt-4 text-2xl font-bold text-brand-900">Page Not Found</h1>
    <p className="mt-2 text-brand-900/60">The page you're looking for doesn't exist.</p>
    <Button to="/" variant="primary" className="mt-8">
      Back to Home
    </Button>
  </Container>
)

export default NotFound
