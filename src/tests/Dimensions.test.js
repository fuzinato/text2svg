import React from 'react';
import Dimensions from '../components/Dimensions';
import renderer from 'react-test-renderer';

describe('Dimensions ', () => {

  test('should have correct shapshot', () => {
    const handleChange = () => {}
    const component = renderer.create(
      <Dimensions onChange={handleChange} title="Dummy Title" text={51} measures="foobar" />
      
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

});