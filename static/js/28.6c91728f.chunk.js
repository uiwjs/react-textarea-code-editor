(this["webpackJsonp@uiw/react-textarea-code-editor"]=this["webpackJsonp@uiw/react-textarea-code-editor"]||[]).push([[28],{615:function(n,t,e){"use strict";e.r(t),t.default="class ProductCategoryRow extends React.Component {\n  render() {\n    const category = this.props.category;\n    return (\n      <tr>\n        <th colSpan=\"2\">\n          {category}\n        </th>\n      </tr>\n    );\n  }\n}\n\nclass ProductRow extends React.Component {\n  render() {\n    const product = this.props.product;\n    const name = product.stocked ?\n      product.name :\n      <span style={{color: 'red'}}>\n        {product.name}\n      </span>;\n\n    return (\n      <tr>\n        <td>{name}</td>\n        <td>{product.price}</td>\n      </tr>\n    );\n  }\n}\n\nclass ProductTable extends React.Component {\n  render() {\n    const rows = [];\n    let lastCategory = null;\n    \n    this.props.products.forEach((product) => {\n      if (product.category !== lastCategory) {\n        rows.push(\n          <ProductCategoryRow\n            category={product.category}\n            key={product.category} />\n        );\n      }\n      rows.push(\n        <ProductRow\n          product={product}\n          key={product.name} />\n      );\n      lastCategory = product.category;\n    });\n\n    return (\n      <table>\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Price</th>\n          </tr>\n        </thead>\n        <tbody>{rows}</tbody>\n      </table>\n    );\n  }\n}\n\nclass SearchBar extends React.Component {\n  render() {\n    return (\n      <form>\n        <input type=\"text\" placeholder=\"Search...\" />\n        <p>\n          <input type=\"checkbox\" />\n          {' '}\n          Only show products in stock\n        </p>\n      </form>\n    );\n  }\n}\n\nclass FilterableProductTable extends React.Component {\n  render() {\n    return (\n      <div>\n        <SearchBar />\n        <ProductTable products={this.props.products} />\n      </div>\n    );\n  }\n}\n\n\nconst PRODUCTS = [\n  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},\n  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},\n  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},\n  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},\n  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},\n  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}\n];\n \nReactDOM.render(\n  <FilterableProductTable products={PRODUCTS} />,\n  document.getElementById('container')\n);"}}]);
//# sourceMappingURL=28.6c91728f.chunk.js.map