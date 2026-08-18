import PageHero from "../components/common/PageHero"
import Container from "../components/common/Container"
import Loader from "../components/common/Loader"
import { useGetAllGalleryItemsQuery } from "../redux/api/galleryApi"

const Gallery = () => {
  const { data, isLoading } = useGetAllGalleryItemsQuery()
  const items = data?.data || []

  return (
    <>
      <PageHero title="Gallery" subtitle="A closer look at our roasted Makhana." />
      <Container className="section-y">
        {isLoading && !items?.length ? (
          <Loader label="Loading gallery..." />
        ) : items.length === 0 ? (
          <p className="py-16 text-center text-brand-900/60">No gallery items yet.</p>
        ) : (
          <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
            {items.map((item) => (
              <div key={item._id} className="overflow-hidden rounded-2xl break-inside-avoid shadow-md shadow-brand-900/5">
                <img src={item.imageUrl} alt={item.title || "Gallery"} className="w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  )
}

export default Gallery
