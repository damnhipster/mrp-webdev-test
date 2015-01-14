/** @jsx React.DOM */
var Shop = React.createClass({
  render: function () {
    return (
      <div id='shop'>
        <h1>Mr. Porters' Shop</h1>
        <ProductList source={this.props.source}/>
      </div>
    );
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      products: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(products) {
      var firstProduct = products.data[0];
      if (this.isMounted()) {
        this.setState({
          products: [firstProduct]
        });
      }
    }.bind(this));
  },

  render: function () {
    var productNodes = this.state.products.map(function (product) {
      return (
        <li>{product.name}</li>
      );
    });
    return (
      <ul>
        {productNodes}
      </ul>
    );
  }
});

var source = "http://localhost:3000/api/products/?offset=0&limit=60";

React.render(
  <Shop source={source}/>,
  document.getElementById('app')
);
