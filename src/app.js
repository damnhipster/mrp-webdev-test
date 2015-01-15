/** @jsx React.DOM */
var Shop = React.createClass({
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
      <div id='shop'>
        <h1 className="page-title">Mr. Porters' Shop</h1>
        <ProductList products={this.state.products}/>
      </div>
    );
  }
});

var Product = React.createClass({
  render: function () {
    <li className="product">
      <ProductImage product={product}/>
      <p>
        <span className="inactive">{product.designer}</span>
        <br/>
        <span className="intro smaller">{product.name}</span>
        <br/>
      </p>
        <span>{product.price}</span>
    </li>
  }
});



var ProductList = React.createClass({
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
        <span className="inactive">{product.designer}</span>
        <br/>
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
      <div className="infinite-list-item">
        Loading...
      </div>
    );
  },

  render: function () {
debugger;
    return (
      <ul>
        <Infinite containerHeight={800}
                  elementHeight={395}
                  onInfiniteLoad={this.handleInfiniteLoad}
                  isInfiniteLoading={this.state.isInfiniteLoading}
                  loadingSpinnerDelegate={this.elementInfiniteLoad()}
                  >
          {this.state.productsToDisplay}
        </Infinite>
      </ul>
    );
  }
});

var ProductImage = React.createClass({
  render: function () {
    var image;
    if(window.devicePixelRatio < 1.3) {
      image = this.props.product.image;
    } else {
      image = this.props.product.largeImage;
    }
    return (
      <img src={image}/>
    );
  }
});

var source = "/api/products/";

React.renderComponent(
  <Shop source={source}/>,
  document.getElementById('app')
);
