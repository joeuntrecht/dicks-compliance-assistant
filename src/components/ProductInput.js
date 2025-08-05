import { useState } from 'react';

function ProductInput({ onAnalyze }) {
  const [productData, setProductData] = useState({
    category: '',
    gender: '',
    size: '',
    orderType: '',
    destination: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze(productData);
  };

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="product-input">
      <h2>Product & Order Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Product Category:</label>
            <select name="category" value={productData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="apparel-tops">Apparel - Tops</option>
              <option value="apparel-bottoms">Apparel - Bottoms</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
              <option value="equipment">Equipment</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Gender/Age:</label>
            <select name="gender" value={productData.gender} onChange={handleChange} required>
              <option value="">Select Gender/Age</option>
              <option value="mens">Men's</option>
              <option value="womens">Women's</option>
              <option value="youth">Youth</option>
              <option value="toddler">Toddler</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Size:</label>
            <select name="size" value={productData.size} onChange={handleChange} required>
              <option value="">Select Size</option>
              <option value="xs">XS</option>
              <option value="s">S</option>
              <option value="m">M</option>
              <option value="l">L</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
              <option value="3xl">3XL+</option>
            </select>
          </div>

          <div className="form-group">
            <label>Order Type:</label>
            <select name="orderType" value={productData.orderType} onChange={handleChange} required>
              <option value="">Select Order Type</option>
              <option value="bulk">Bulk</option>
              <option value="single-store">Single Store</option>
              <option value="direct-to-store">Direct to Store</option>
              <option value="ecommerce">E-commerce</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Destination:</label>
          <select name="destination" value={productData.destination} onChange={handleChange} required>
            <option value="">Select Destination</option>
            <option value="dc-plainfield">DC - Plainfield (351)</option>
            <option value="dc-smithton">DC - Smithton (51)</option>
            <option value="dc-eastpoint">DC - East Point (651)</option>
            <option value="dc-goodyear">DC - Goodyear (851)</option>
            <option value="dc-conklin">DC - Conklin (1051)</option>
          </select>
        </div>

        <button type="submit" className="analyze-btn">
          Analyze Compliance Requirements
        </button>
      </form>
    </div>
  );
}

export default ProductInput;