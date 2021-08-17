import React from 'react'
import { useQuery } from '@apollo/client'

import { ListResidents } from '../graphql/ListResidents'
import { LIST_RESIDENTS } from '../queries'
import { FlatList, Text } from 'react-native'
import Colors from '../../Colors'
import { Table } from 'react-bootstrap'
import { useColorScheme } from 'react-native'

const Residents = () => {
  const { data } = useQuery<ListResidents>(LIST_RESIDENTS)
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Table striped bordered hover className="mt-5" variant={colorScheme}>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Unit #</th>
          <th>Account Number</th>
          <th>Approved</th>
          <th>Admin</th>
          <th>Owner/Resident</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.listResidents.map(resident => (
          <tr key={resident.id}>
            <td>{resident.id}</td>
            <td></td>
            <td>{resident.unit}</td>
            <td></td>
            <td>{resident.approved ? "true" : "false"}</td>
            <td>{resident.admin ? "true" : "false"}</td>
            <td>{resident.owner ? "Owner" : "Resident"}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Residents