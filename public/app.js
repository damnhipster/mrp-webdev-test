/** @jsx React.DOM */
var Shop = React.createClass({displayName: 'Shop',
  render: function () {
    return (
      React.DOM.div({id: "shop"}, 
        React.DOM.h1(null, "Mr. Porters' Shop")
      )
    );
  }
});

React.renderComponent(
  Shop({data: people}),
  document.getElementById('app')
);
