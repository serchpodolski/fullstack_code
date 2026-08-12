const { render } = require('@testing-library/react-native');
const React = require('react');
const { Text, View } = require('react-native');
const element = React.createElement(View, null, React.createElement(Text, null, 'hello'));
const result = render(element);
console.log('render type', typeof render);
console.log('result keys', Object.keys(result));
console.log('result.getByText', typeof result.getByText);
console.log('screen export', require('@testing-library/react-native').screen ? 'exists' : 'missing');
