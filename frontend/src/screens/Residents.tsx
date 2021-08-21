import React from 'react'
import { useMutation, useQuery } from '@apollo/client'

import { ListResidents } from '../graphql/ListResidents'
import { LIST_RESIDENTS, UPDATE_RESIDENT } from '../queries'
import { Dropdown, Table } from 'react-bootstrap'
import { useColorScheme } from 'react-native'

const Residents = () => {
  const { data } = useQuery<ListResidents>(LIST_RESIDENTS)
  const [updateResident] = useMutation(UPDATE_RESIDENT)
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Table striped bordered hover className="mt-5" variant={colorScheme}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Unit #</th>
          <th>Account Number</th>
          <th>Owner/Resident</th>
          <th>Approved</th>
          <th>Admin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.listResidents.map(resident => (
          <tr key={resident.id}>
            <td>{resident.id}</td>
            <td>{resident.name}</td>
            <td>{resident.unit}</td>
            <td>{resident.accountNumber}</td>
            <td>{resident.owner ? "Owner" : "Resident"}</td>
            <td>{resident.approved ? "true" : "false"}</td>
            <td>{resident.admin ? "true" : "false"}</td>
            <td>
              <Dropdown>
                <Dropdown.Toggle id="action-dropdown" variant="secondary">
                  Actions
                </Dropdown.Toggle>

                <Dropdown.Menu variant={colorScheme}>
                  <Dropdown.Item onClick={() => {
                    updateResident({ variables: { id: resident.id, owner: !resident.owner } })
                  }} >
                    {resident.owner ? "Make Resident" : "Make Owner"}
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => {
                    updateResident({ variables: { id: resident.id, approved: !resident.approved } })
                  }} >
                    {resident.approved ? "Unapprove" : "Approve"}
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => {
                    updateResident({ variables: { id: resident.id, admin: !resident.admin } })
                  }} >
                    {resident.admin ? "Remove Admin" : "Make Admin"}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Residents