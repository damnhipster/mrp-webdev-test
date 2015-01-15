/** @jsx React.DOM */
var Shop = React.createClass({displayName: 'Shop',
  getInitialState: function() {
    return {
      products: [],
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(products) {
      if (this.isMounted()) {
debugger;
        this.setState({
          products: products.data
        });
      }
    }.bind(this));
  },

  render: function () {
    return (
      React.DOM.div({id: "shop"}, 
        React.DOM.h1({className: "page-title"}, "Mr. Porters' Shop"), 
        ProductList({products: this.state.products})
      )
    );
  }
});

var Product = React.createClass({displayName: 'Product',
  render: function () {
    React.DOM.li({className: "product"}, 
      ProductImage({product: product}), 
      React.DOM.p(null, 
        React.DOM.span({className: "inactive"}, product.designer), 
        React.DOM.br(null), 
        React.DOM.span({className: "intro smaller"}, product.name), 
        React.DOM.br(null)
      ), 
        React.DOM.span(null, product.price)
    )
  }
});



var ProductList = React.createClass({displayName: 'ProductList',
  getInitialState: function() {
    return {
      hasMore: true,
      productsToDisplay: [{designer:"hello", name:"", price:"", image:"", largeImage:""}]
    };
  },

  nextProducts: function(offset, products) {
    var productsPerPage = 6;
    var newProducts = products.data[offset, offset+productsPerPage];
    return newProducts.map(function (product) {
      return (
        Product({product: product})
      );
    });
  },

  handleInfiniteLoad: function() {
    var that = this;
    this.setState({
      isInfiniteLoading: true
    });
    var productLength = that.state.productsToDisplay.length;
        newProducts = that.nextProducts(productLength, this.props.products);
    that.setState({
        isInfiniteLoading: false,
        productsToDisplay: that.state.productsToDisplay.concat(newProducts)
    });
  },


  elementInfiniteLoad: function() {
    return (
      React.DOM.div({className: "infinite-list-item"}, 
        "Loading..."
      )
    );
  },

  render: function () {
debugger;
    return (
      React.DOM.ul(null, 
        Infinite({containerHeight: 800, 
                  elementHeight: 395, 
                  onInfiniteLoad: this.handleInfiniteLoad, 
                  isInfiniteLoading: this.state.isInfiniteLoading, 
                  loadingSpinnerDelegate: this.elementInfiniteLoad()
                  }, 
          this.state.productsToDisplay
        )
      )
    );
  }
});

var ProductImage = React.createClass({displayName: 'ProductImage',
  render: function () {
    var image;
    if(window.devicePixelRatio < 1.3) {
      image = this.props.product.image;
    } else {
      image = this.props.product.largeImage;
    }
    return (
      React.DOM.img({src: image})
    );
  }
});

var source = "/api/products/";

React.renderComponent(
  Shop({source: source}),
  document.getElementById('app')
);
