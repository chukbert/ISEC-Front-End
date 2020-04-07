import React from "react";
import Enzyme from 'enzyme';
// import { act } from "react-dom/test-utils";

import ProgramLink from './ProgramLink';
import { act } from "react-dom/test-utils";
import ProgramPage from "../../Containers/ProgramPage/ProgramPage";

describe("ProgramLink component", () => {
    describe("render props well", () => {
        let wrapper = Enzyme.shallow(<ProgramLink name={"test"} 
                                        description={"lorem ipsum dolor"}
                                        status={0}/>);

        it("test desciption props", () =>{
            act(() => {
                wrapper.find('div.program-link').props().onClick();
            })
            // const description = wrapper.find('p');
            expect(wrapper.find('p').exists());
            expect(wrapper.find('p').render().text()).toEqual(" Description : lorem ipsum dolor")
        });

        it("test status props", () => {
            expect(wrapper.find('Button').at(0).exists());
            expect(wrapper.find('Button').render().text()).toEqual("Enroll");
        })

        it("button clicked well", () => {
            act(() => {
                wrapper.find('Button').props().onClick();
            })

            expect(wrapper.contains(<ProgramPage />))
        });
    })

    describe("render with status 1", () => {
        let wrapper = Enzyme.shallow(<ProgramLink name={"test"} 
                                        description={"lorem ipsum dolor"}
                                        status={1}/>);
        act(() => {
            wrapper.find('div.program-link').props().onClick();
        });

        it("render continue button", () => {
            expect(wrapper.find('Button').at(0).exists());
            expect(wrapper.find('Button').render().text()).toEqual("Continue");
        })

        it("button clicked well", () => {
            act(() => {
                wrapper.find('Button').props().onClick();
            })

            expect(wrapper.contains(<ProgramPage />))
        });
    })
})
