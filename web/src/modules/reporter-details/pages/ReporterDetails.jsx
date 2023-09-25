import React from 'react';
import { observer } from 'mobx-react';
import { defaultTemplate } from 'common/hoc';
import Table from 'react-bootstrap/Table';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

function ReporterDetails(props) {
    const { reporterDetailsViewStore: { reporters, toggleApproval } } = props;
    return <RBReporterTable items={reporters} toggleApproval={toggleApproval} />
}

const RBReporterTable = observer(function ({ items, toggleApproval }) {
    return (
        <Table className="text-center">
            <thead>
                <tr>
                    <th>E-mail</th>
                    <th>Date created</th>
                    <th>Approve/Disapprove</th>
                </tr>
            </thead>
            <tbody>
                {items != null ? items.map(i => <ReporterRow key={i.id} item={i} toggleApproval={toggleApproval} />) : null}
            </tbody>
        </Table>
    )
});

const ReporterRow = observer(function ({ item, toggleApproval }) {
    return (
        <tr>
            <td>{item.email}</td>
            <td>{new Date(item.creationTime).toLocaleString(navigator.language)}</td>
            <td onClick={() => toggleApproval(item)}>{item.isApproved ? <AiOutlineCheck className="icon" /> : <AiOutlineClose className="icon" />}</td>
        </tr>
    )
})

export default defaultTemplate(ReporterDetails);
