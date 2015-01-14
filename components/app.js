/** @jsx React.DOM */
var Shop = React.createClass({
  render: function () {
    return (
      <div id='shop'>
        <h1>Mr. Porters' Shop</h1>
        <ProductList products={this.props.data}/>
      </div>
    );
  }
});

var products = [
  {
    "name": {
      "en": "Roadmaster Waxed-Cotton Jacket"
    },
    "price": {
      "divisor": 100,
      "duty": 0,
      "tax": 9167,
      "gross": 55000,
      "net": 45833,
      "currency": "GBP"
    },
    "onSale": false,
    "brand": {
      "id": 584,
      "name": {
        "en": "Belstaff"
      }
    },
    "id": 540559,
    "categories": [
      {
        "id": 3674,
        "children": [
          {
            "id": 9539,
            "children": [
              {
                "id": 9611
              }
            ]
          }
        ]
      }
    ],
    "colourIds": [
      19
    ],
    "saleableStandardSizes": [
      {
        "id": "00004_S_Clothing",
        "name": "S"
      },
      {
        "id": "00005_M_Clothing",
        "name": "M"
      },
      {
        "id": "00006_L_Clothing",
        "name": "L"
      },
      {
        "id": "00007_XL_Clothing",
        "name": "XL"
      },
      {
        "id": "00008_XXL_Clothing",
        "name": "XXL"
      },
      {
        "id": "00009_XXXL_Clothing",
        "name": "XXXL"
      }
    ],
    "badges": [
      "In_Stock",
      "PP_New_Season"
    ]
  },
]
;

var ProductList = React.createClass({
  render: function () {
    var productNodes = this.props.products.map(function (product) {
      return (
        <li>
          {product.name}
        </li>
      );
    });
    return (
      <ul>
        {productNodes}
      </ul>
    );
  }
});


React.renderComponent(
  <Shop data={products}/>,
  document.getElementById('app')
);
