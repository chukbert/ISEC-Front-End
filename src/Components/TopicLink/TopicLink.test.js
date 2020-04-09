import React from "react";
import Enzyme from 'enzyme';
// import { Button } from 'react-bootstrap';

import TopicLink from './TopicLink';
import EditTopic from "../EditTopic/EditTopic";
import { act } from "react-dom/test-utils";

describe("TopicLink component", () => {
    // let wrapper;

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("login as student", () => {
        let wrapper = Enzyme.shallow(<TopicLink permission={0} />);

        it('do not show modal', () => {
            expect(wrapper.find('Button').exists()).toBe(false);
        });
    });

    describe("login as teacher", () => {
        let wrapper = Enzyme.mount(<TopicLink permission={1} />);
        
        it('show button Edit topic', () => {
            expect(wrapper.find('Button').exists()).toBe(true);
        });

        it('contains edit topic if Button on Click', () => {
            act(() => {
                wrapper.find('Button').props().onClick();
            });
            expect(wrapper.contains(<EditTopic />));
        });

        it('do not show edit topic if Button on Click twice', () => {
            act(() => {
                wrapper.find('Button').props().onClick();
                wrapper.find('Button').props().onClick();
            });
            expect(wrapper.contains(<EditTopic />)).toBe(false);
        });
    });

    describe("login as admin", () => {
        let wrapper = Enzyme.mount(<TopicLink permission={2} />);
        
        it('show button Edit topic', () => {
            expect(wrapper.find('Button').exists()).toBe(true);
        });

        it('contains edit topic if Button on Click', () => {
            act(() => {
                wrapper.find('Button').props().onClick();
            });
            expect(wrapper.contains(<EditTopic />));
        });

        it('do not show edit topic if Button on Click twice', () => {
            act(() => {
                wrapper.find('Button').props().onClick();
                wrapper.find('Button').props().onClick();
            });
            expect(wrapper.contains(<EditTopic />)).toBe(false);
        });
    });
})