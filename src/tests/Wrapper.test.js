import React from 'react';
import Wrapper from '../components/Wrapper';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Wrapper ', () => {

  test('should have correct shapshot', () => {
    const component = renderer.create(
      <Wrapper title="Some Dummy Title" plusClass="some-dditional-class">Testing Wrapper</Wrapper>
    )
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('should show correct title', () => {
    const componentDOM = shallow(
      <Wrapper title="Some Dummy Title" plusClass="some-dditional-class"></Wrapper>
    )
    expect(componentDOM.text()).toEqual('Some Dummy Title');
  });

  test('should correctly render children', () => {
    const componentDOM = shallow(
      <Wrapper title="" plusClass="some-dditional-class">Dummy Children</Wrapper>
    )
    expect(componentDOM.text()).toEqual('Dummy Children');
  });

  test('should have "input-section" in class', () => {
    const componentDOM = shallow(
      <Wrapper title="" />
    )
    expect(componentDOM.hasClass('input-section')).toEqual(true);
  });

  test('should have correct class name passed via plusClass prop', () => {
    const componentDOM = shallow(
      <Wrapper title="" plusClass="some-dditional-class" />
    )
    expect(componentDOM.hasClass('some-dditional-class')).toEqual(true);
  });
})