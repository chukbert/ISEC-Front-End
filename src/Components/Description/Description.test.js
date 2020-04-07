import React from "react";
import { shallow } from 'enzyme';
import Description from "./Description";

describe('Desciption Component', () => {
    it("renders without data", () => {
        const container = shallow(<Description />);
        
        const table = container.find('table');
        expect(table).toHaveLength(1);

        const thead = table.find('thead');
        expect(thead).toHaveLength(1);

        const headers = table.find('th');
        expect(headers).toHaveLength(1);
        headers.forEach((th, idx) => {
            expect(th.text()).toEqual("Description");
        });

        const tbody = table.find('tbody');
        expect(tbody).toHaveLength(1);

        const rows = tbody.find('tr');
        expect(rows).toHaveLength(1);

        rows.forEach((tr) => {
            const cells = tr.find('td');
            expect(cells).toHaveLength(1);

            expect(cells.at(0).text()).toEqual(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor dictum malesuada. `);
         });
    });

    it("renders with data", () => {
        const container = shallow(<Description data="testing"/>);
        
        const table = container.find('table');
        expect(table).toHaveLength(1);

        const thead = table.find('thead');
        expect(thead).toHaveLength(1);

        const headers = table.find('th');
        expect(headers).toHaveLength(1);
        headers.forEach((th, idx) => {
            expect(th.text()).toEqual("Description");
        });

        const tbody = table.find('tbody');
        expect(tbody).toHaveLength(1);

        const rows = tbody.find('tr');
        expect(rows).toHaveLength(1);

        rows.forEach((tr) => {
            const cells = tr.find('td');
            expect(cells).toHaveLength(1);

            expect(cells.at(0).text()).toEqual(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor dictum malesuada. testing`);
         });
    });
});