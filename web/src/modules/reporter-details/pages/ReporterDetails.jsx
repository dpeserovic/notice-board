import React from 'react';
import { observer } from 'mobx-react';
import { defaultTemplate } from 'common/hoc';
import Table from 'react-bootstrap/Table';

function ReporterDetails(props) {
    const { reporterDetailsViewStore: { reporters } } = props;
    return <RBReporterTable items={reporters} />
}

const RBReporterTable = observer(function ({ items }) {
    return (
        <Table className="text-center">
            <thead>
                <tr>
                    <th>Display name</th>
                    <th>E-mail</th>
                    <th>Date created</th>
                </tr>
            </thead>
            <tbody>
                {items != null ? items.map(i => <ReporterRow key={i.id} item={i} />) : null}
            </tbody>
        </Table>
    )
});

const ReporterRow = observer(function ({ item }) {
    return (
        <tr>
            <td>{item.displayName}</td>
            <td>{item.email}</td>
            <td>{new Date(item.dateCreated).toLocaleString(navigator.language)}</td>
        </tr>
    )
})

export default defaultTemplate(ReporterDetails);
