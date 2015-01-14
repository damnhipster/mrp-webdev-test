/** @jsx React.DOM */
var Shop = React.createClass({
  render: function () {
    return (
      <div id='shop'>
        <h1 className="page-title">Mr. Porters' Shop</h1>
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
        <li className="product">
          <img src={product.image}/>
          <p>
            <span className="inactive">{product.designer}</span>
            <br/>
            <span className="intro smaller">{product.name}</span>
            <br/>
          </p>
            <span>{product.price}</span>
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

var source = "http://localhost:3000/api/products/?offset=0&limit=60";

React.render(
  <Shop source={source}/>,
  document.getElementById('app')
);
