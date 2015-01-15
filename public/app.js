/** @jsx React.DOM */
var Shop = React.createClass({displayName: "Shop",
  render: function () {
    return (
      React.createElement("div", {id: "shop"}, 
        React.createElement("h1", {className: "page-title"}, "Mr. Porters' Shop"), 
        React.createElement(ProductList, {source: this.props.source})
      )
    );
  }
});

var ProductList = React.createClass({displayName: "ProductList",
  getInitialState: function() {
    return {
      products: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(products) {
      if (this.isMounted()) {
        this.setState({
          products: products.data
        });
      }
    }.bind(this));
  },

  render: function () {
    var productNodes = this.state.products.map(function (product) {
      return (
        React.createElement("li", {className: "product"}, 
          React.createElement(ProductImage, {product: product}), 
          React.createElement("p", null, 
            React.createElement("span", {className: "inactive"}, product.designer), 
            React.createElement("br", null), 
            React.createElement("span", {className: "intro smaller"}, product.name), 
            React.createElement("br", null)
          ), 
            React.createElement("span", null, product.price)
        )
      );
    });
    return (
      React.createElement("ul", null, 
        productNodes
      )
    );
  }
});

var ProductImage = React.createClass({displayName: "ProductImage",
  render: function () {
    var image;
    if(window.devicePixelRatio < 1.3) {
      image = this.props.product.image;
    } else {
      image = this.props.product.largeImage;
    }
    return (
      React.createElement("img", {src: image})
    );
  }
});

var source = "/api/products/?offset=0&limit=60";
  debugger;

React.render(
  React.createElement(Shop, {source: source}),
  document.getElementById('app')
);
