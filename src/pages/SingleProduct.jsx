import { useLoaderData } from "react-router-dom"
import { formatPrice, customFetch } from "../utils"
import { Link } from "react-router-dom"
import { useState } from "react"
import { generateAmountOptions } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import { addItem } from "../features/cart/cartslice"

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`)

  return { product: response.data.data }
}

const SingleProduct = () => {
  const { product } = useLoaderData()
  const { image, title, price, company, description, colors } =
    product.attributes
  const amount = formatPrice(price)
  // Color is an array and the first item is set to be the default.
  const [productColor, setProductColor] = useState(colors[0])

  const [totalPick, setTotalPick] = useState(1)

  const handleAmount = (e) => {
    // parseInt is converting the text into number
    setTotalPick(parseInt(e.target.value))
  }

  const dispatch = useDispatch()

  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  }

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }))
  }

  return (
    <section>
      {/* BREADCRUMBS */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li className="capitalize">{title}</li>
        </ul>
      </div>

      {/* PRODUCT*/}
      <div className=" mt-6 grid lg:grid-cols-2 lg:gap-x-16  gap-y-8">
        {/* IMAGE*/}
        <div>
          <img
            src={image}
            alt={title}
            className="w-96 h-96 object-cover rounded-lg lg:w-full "
          />
        </div>

        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>

          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{amount}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                )
              })}
            </div>
          </div>

          {/* TOTALPICK*/}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="totalPick">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              id="totalPick"
              className="select select-secondary select-bordered select-md"
              value={totalPick}
              onChange={handleAmount}
            >
              {generateAmountOptions(20)}
            </select>
          </div>

          {/* CART BUTTON */}
          <div className="mt-10 ">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
