/** @jsx React.DOM */
var Shop = React.createClass({
  render: function () {
    return (
      <div id='shop'>
        <h1>Mr. Porters' Shop</h1>
      </div>
    );
  }
});

React.renderComponent(
  <Shop data={people}/>,
  document.getElementById('app')
);
