/** @jsx React.DOM */
var Shop = React.createClass({displayName: "Shop",
  render: function () {
    return (
      React.createElement("div", {id: "shop"}, 
        React.createElement("h1", null, "Mr. Porters' Shop"), 
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
        React.createElement("li", null, product.name)
      );
    });
    return (
      React.createElement("ul", null, 
        productNodes
      )
    );
  }
});

var source = "http://localhost:3000/api/products/?offset=0&limit=60";

React.render(
  React.createElement(Shop, {source: source}),
  document.getElementById('app')
);
