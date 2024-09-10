import ProductsGrids from "./ProductsGrids"
import SectionTitle from "./SectionTitle"

const FeaturedProducts = () => {
  return (
    <div className="pt-24 " >
      <SectionTitle text="Featured Products" />
      <ProductsGrids />
    </div>
  )
}

export default FeaturedProducts
